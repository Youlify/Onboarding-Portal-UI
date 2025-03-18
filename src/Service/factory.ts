import { API_URL } from "@common/api";
import { replaceTmpUrlByParams } from "@utils/url";
import { get, patch } from "./http";

const accessCode = (params: API.APIAccessCodeParams) =>
  get<API.APIAccessCodeRes>(replaceTmpUrlByParams(API_URL.ACCESS_CODE, params));
const getProgressPercentage = () =>
  get<API.APIProgressPercentageRes>(API_URL.GET_PROGRESS_PERCENTAGE);
const getBasicInfo = () => get<API.APIBasicInfoRes>(API_URL.GET_BASIC_INFO);
const patchBasicInfo = () => patch<API.APINullRes>(API_URL.PATCH_BASIC_INFO);
const getBillingInfo = () =>
  get<API.APIBillingInfoRes>(API_URL.GET_BILLING_INFO);
const patchBillingInfo = () =>
  patch<API.APINullRes>(API_URL.PATCH_BILLING_INFO);

export {
  accessCode,
  getProgressPercentage,
  getBasicInfo,
  patchBasicInfo,
  getBillingInfo,
  patchBillingInfo,
};
