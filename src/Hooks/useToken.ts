import { useState, useContext } from "react";
import { useLocalStorageState, useRequest, useCountDown } from "ahooks";
import { STORAGE_TOKEN_KEY } from "@common/contant";
// import { logout as logoutService } from "@service/factory";
import { globalContext } from "@provider/global/context";

const useToken = () => {
  const [token, setToken] = useLocalStorageState<Patient.AccountAPIInfo>(
    STORAGE_TOKEN_KEY,
    { listenStorageChange: true }
  );
  const isLogin = !!(token?.patient_id && token.practice_id);
  return {
    token,
    setToken,
    isLogin,
  };
};

const useLogout = () => {
  const { setToken } = useToken();
  // const { run } = useRequest(logoutService, { manual: true });
  const { accountInfo } = useContext(globalContext);
  const [countDownLeftTime, setCountDownLeftTime] = useState<number>();
  const [countDownEndCallback, setCountDownEndCallback] =
    useState<() => void>();
  const logout = (callback?: () => void) => {
    // run({ account_number: accountInfo?.account_number! });
    setToken();
    setCountDownLeftTime(0);
    callback?.();
  };
  const autoLogoutStartUp = (leftTime: number, callback?: () => void) => {
    setCountDownLeftTime(leftTime);
    setCountDownEndCallback(callback);
  };
  useCountDown({
    leftTime: countDownLeftTime,
    onEnd: () => {
      logout(countDownEndCallback);
    },
  });
  return { logout, autoLogoutStartUp };
};

export { useToken, useLogout };
