/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddInstrumentInput
// ====================================================

export interface AddInstrumentInput_addInstrument {
  __typename: "Instrument";
  id: string;
  ticker: string;
}

export interface AddInstrumentInput {
  addInstrument: AddInstrumentInput_addInstrument;
}

export interface AddInstrumentInputVariables {
  ticker: string;
}
