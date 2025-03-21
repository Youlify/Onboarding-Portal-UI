import { API_URL } from "@common/api";
import { replaceTmpUrlByParams } from "@utils/url";
import { get, patch } from "./http";

export const accessCode = (params: API.APIAccessCodeParams) =>
  get<API.APIAccessCodeRes>(replaceTmpUrlByParams(API_URL.ACCESS_CODE, params));
export const getProgressPercentage = () =>
  get<API.APIProgressPercentageRes>(API_URL.GET_PROGRESS_PERCENTAGE);
export const getProgressStatus = () =>
  get<API.APIProgressStatusRes>(API_URL.GET_PROGRESS_STATUS);
export const getBasicInfo = () =>
  get<API.APIBasicInfoRes>(API_URL.GET_BASIC_INFO);
export const patchBasicInfo = () =>
  patch<API.APINullRes>(API_URL.PATCH_BASIC_INFO);
export const getBilling = () => get<API.APIBillingInfoRes>(API_URL.GET_BILLING);
export const patchBilling = () => patch<API.APINullRes>(API_URL.PATCH_BILLING);
export const getW9Form = () => get<API.APIW9FormRes>(API_URL.GET_W9_FORM);
export const signW9Form = () => patch<API.APINullRes>(API_URL.SIGN_W9_FORM);
