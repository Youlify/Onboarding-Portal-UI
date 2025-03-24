const getBaseUrl = () => {
  const hostname = window.location.hostname;
  let baseUrl = "";
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    baseUrl = "https://api.sandbox.youlify.ai/api/onboarding";
  } else if (hostname.includes("172.203.240.97")) {
    baseUrl = "http://172.178.80.128:8080/api/onboarding";
  } else if (hostname.includes("staging")) {
    baseUrl = "https://api-staging.youlify.ai/api/onboarding";
  } else {
    baseUrl = "https://api.youlify.ai/api/onboarding";
  }
  return baseUrl;
};

export const BASE_URL = getBaseUrl();
export const SYSTEM_ERROR_MESSAGE = "System error";
export const STORAGE_TOKEN_KEY = "_onboarding_token";
export const STORAGE_GLOBAL_VALUE_KEY = "_onboarding_global";
export const AUTO_LOGOUT_LEFT_TIME = 15 * 60 * 1000;
