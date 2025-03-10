import { createContext } from "react";

export interface GlobalContextValueType {
  accountInfo?: Patient.AccountInfo;
  accountAPIInfo?: Patient.AccountAPIInfo;
}

export interface GlobalContextSetType {
  setGlobalValue?: (global: GlobalContextValueType) => void;
}

export type GlobalContextType = GlobalContextValueType & GlobalContextSetType;

const defaultGlobalValueContext = {
  accountInfo: {},
  accountAPIInfo: {},
} as GlobalContextValueType;

const globalContext = createContext<GlobalContextType>(
  defaultGlobalValueContext
);

export { globalContext, defaultGlobalValueContext };
