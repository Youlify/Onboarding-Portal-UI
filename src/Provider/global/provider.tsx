import { useLocalStorageState } from "ahooks";
import { STORAGE_GLOBAL_VALUE_KEY } from "@common/contant";
import {
  globalContext,
  defaultGlobalValueContext,
  GlobalContextValueType,
} from "./context";

interface GlobalProviderProps {
  children: React.ReactElement;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalValue, setGlobalValue] =
    useLocalStorageState<GlobalContextValueType>(STORAGE_GLOBAL_VALUE_KEY, {
      defaultValue: defaultGlobalValueContext,
    });

  return (
    <globalContext.Provider value={{ ...globalValue, setGlobalValue }}>
      {children}
    </globalContext.Provider>
  );
};

export { GlobalProvider };
