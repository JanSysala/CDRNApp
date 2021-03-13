export interface GetEtfSymbolsResponse {
    data: [{
        currency: string,
        description: string,
        displaySymbol: string,
        figi: string,
        mic: string,
        symbol: string,
        type: string
    }]
}

export interface EtfSymbols {
    symbols: {
        symbol: string[]
    }
}