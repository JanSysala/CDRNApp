import * as React from 'react';
import { Button, Dimensions, FlatList, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Text, View } from '../components/Themed';
import { useCallback, useContext, useState } from "react";
import { ADD_INSTRUMENT, DELETE_INSTRUMENT, GET_INSTRUMENTS } from "../graphql/portfolioInstruments";
import { Instruments as InstrumentsData } from "../graphql/__generated__/Instruments";
import { getEtfIndustries } from "../actions/etfIndustriesAction";
import { Store } from "../contexts/Store";
import { Axis, Chart, Coordinate, Interval, Tooltip } from 'bizcharts';
import {
    DeleteInstrumentVariables, DeleteInstrument as DeleteInstrumentData,
} from "../graphql/__generated__/DeleteInstrument";


export default function TabOneScreen() {
    const { dispatch, state } = useContext(Store);
    const [addInstrument] = useMutation(ADD_INSTRUMENT);
    const [item, setItem] = useState('');
    const { data, loading, error, refetch } = useQuery<InstrumentsData>(GET_INSTRUMENTS);

    const chartCols = {
        percent: {
            formatter: (val: any) => {
                val = val * 100 + '%';
                return val;
            },
        },
    };
    const [
        deleteInstrument,
        { loading: deleteInstrumentLoading, error: deleteInstrumentError }
    ] = useMutation<DeleteInstrumentData, DeleteInstrumentVariables>(DELETE_INSTRUMENT);

    const instruments = data ? data.instruments : null;
    const handleSubmit = useCallback(async () => {
        await addInstrument({
            variables: { ticker: item }
        })
        setItem('');
        await refetch();
    }, [addInstrument, item]);

    const handleDeleteInstrument = useCallback(async (id: DeleteInstrumentVariables['id']) => {
        await deleteInstrument({ variables: { id } })
        await refetch();
    }, [deleteInstrument, refetch]);

    return (
        <View style={styles.container}>
            <TextInput
                autoFocus={true}
                style={styles.input}
                onChangeText={setItem}
                value={item}
            />
            <Button
                title="Add"
                onPress={handleSubmit}
            />
            <FlatList
                data={instruments}
                renderItem={({ item }) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => getEtfIndustries(item.ticker, dispatch)}>
                        <View style={styles.row}>
                            <Text style={styles.listItem}>{item.ticker}</Text>
                            <Button
                                onPress={() => handleDeleteInstrument(item.id)}
                                title="x"
                            />
                        </View>
                    </TouchableHighlight>
                )}
            />
            {state?.sectorExposure?.length > 2 ?
                <Chart
                    height={400}
                    scale={chartCols}
                    data={state.sectorExposure}
                    autoFit>
                    <Coordinate type="theta" radius={0.75} />
                    <Tooltip showTitle={false} />
                    <Axis visible={false} />
                    <Interval
                        position="exposure"
                        adjust="stack"
                        color="industry"
                        style={{
                            lineWidth: 1,
                            stroke: '#fff',
                        }}
                    />
                </Chart> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'grey',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
    },
    listItem: {
        paddingRight: 5,
        paddingTop: 7,
        textAlignVertical: "center",
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
