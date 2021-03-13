export interface GetEtfSectorResponse {
    data: {
        sectorExposure: [
            {
                exposure: number,
                industry: string
            }
        ],
        symbol: string
    }
}

export interface EtfSectorExposure {
    exposure: number,
    industry: string
}