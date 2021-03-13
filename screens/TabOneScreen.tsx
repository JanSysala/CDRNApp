import * as React from 'react';
import {Button, FlatList, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import {useMutation, useQuery} from "@apollo/react-hooks";
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {useCallback, useContext, useState} from "react";
import {ADD_INSTRUMENT, GET_INSTRUMENTS} from "../graphql/portfolioInstruments";import {Instruments as InstrumentsData} from "../graphql/__generated__/Instruments";
import {getEtfIndustries} from "../actions/etfIndustriesAction";
import {Store} from "../contexts/Store";



export default function TabOneScreen() {
    const {dispatch} = useContext(Store);
    const [addInstrument] = useMutation(ADD_INSTRUMENT);
    const [item, setItem] = useState('');
    const {data, loading, error, refetch} = useQuery<InstrumentsData>(GET_INSTRUMENTS);

    const instruments = data ? data.instruments : null;
    const handleSubmit = useCallback(async () => {
        await addInstrument({
            variables: {ticker: item}
        })
        setItem('');
        await refetch();
    }, [addInstrument, item]);

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
                onPress={handleSubmit}>
            </Button>
            <FlatList
                data={instruments}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => getEtfIndustries(item.ticker, dispatch)}>
                        <View style={{ backgroundColor: 'white' }}>
                            <Text>{item.ticker}</Text>
                        </View>
                    </TouchableHighlight>
                )}

                // renderItem={({item}) => <Text style={styles.item}>{item.ticker}</Text>}                keyExtractor={instrumentItem => instrumentItem?.id}
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <EditScreenInfo path="/screens/TabOneScreen.tsx"/>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
