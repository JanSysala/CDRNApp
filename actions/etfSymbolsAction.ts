import axios from 'axios'
import {GET_ETFSYMBOLS} from "./actionTypes";
import React from "react";
import {GetEtfSymbolsResponse} from "../models/etfSymbols";

type Action = {
    type: typeof GET_ETFSYMBOLS,
    payload: GetEtfSymbolsResponse
}

export const getEtfSymbols = async (dispatch: React.Dispatch<Action>) => {
    const res = await axios.get(`http://localhost:9001/api/v1/stock/symbol?exchange=US&securityType=ETP&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`);
    return dispatch({
        type: GET_ETFSYMBOLS,
        payload: res.data
    })
}
