import { createContext } from "react";

export interface GlobalContextValueType {
  accountInfo?: Account.AccountInfo;
}

export interface GlobalContextSetType {
  setGlobalValue?: (global: GlobalContextValueType) => void;
}

export type GlobalContextType = GlobalContextValueType & GlobalContextSetType;

const defaultGlobalValueContext = {
  accountInfo: {},
} as GlobalContextValueType;

const globalContext = createContext<GlobalContextType>(
  defaultGlobalValueContext
);

export { globalContext, defaultGlobalValueContext };
