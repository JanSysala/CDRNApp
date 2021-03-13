import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {ApolloProvider} from "@apollo/react-hooks";
import {ApolloClient, InMemoryCache} from '@apollo/client';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const client = new ApolloClient({
        uri: "http://localhost:9000/api",
        cache: new InMemoryCache()
    });

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <ApolloProvider client={client}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </ApolloProvider>

        );
    }
}
