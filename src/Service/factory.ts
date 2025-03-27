import { API_URL } from "@common/api";
import { replaceTmpUrlByParams } from "@utils/url";
import { get, patch, post } from "./http";

export const accessCode = (params: API.APIAccessCodeParams) =>
  get<API.APIAccessCodeRes>(replaceTmpUrlByParams(API_URL.ACCESS_CODE, params));
export const getProgressPercentage = () =>
  get<API.APIProgressPercentageRes>(API_URL.GET_PROGRESS_PERCENTAGE);
export const getProgress = () => get<API.APIProgressRes>(API_URL.GET_PROGRESS);
export const getBasicInfo = () =>
  get<API.APIBasicInfoRes>(API_URL.GET_BASIC_INFO);
export const patchBasicInfo = (data: API.APIBaseInfoParams) =>
  patch<API.APINullRes>(API_URL.PATCH_BASIC_INFO, { data });
export const getBilling = () => get<API.APIBillingInfoRes>(API_URL.GET_BILLING);
export const patchBilling = (data: API.APIBillingInfoParams) =>
  patch<API.APINullRes>(API_URL.PATCH_BILLING, { data });
export const getW9Form = () => get<API.APIW9FormRes>(API_URL.GET_W9_FORM);
export const signW9Form = (data: API.APISignW9FormParams) =>
  patch<API.APINullRes>(API_URL.SIGN_W9_FORM, { data });
export const getRenderingProvider = () =>
  get<API.APIRenderingProviderRes>(API_URL.GET_RENDERING_PROVIDER);
export const patchRenderingProvider = (data: API.APIRenderingProviderParams) =>
  patch<API.APINullRes>(API_URL.PATCH_RENDERING_PROVIDER, { data });
export const getSuperAdvancedProvider = () =>
  get<API.APIRenderingProviderRes>(API_URL.GET_SUPER_ADVANCED_PROVIDER);
export const patchSuperAdvancedProvider = (
  data: API.APISuperAdvancedProviderParams
) => patch<API.APINullRes>(API_URL.PATCH_SUPER_ADVANCED_PROVIDER, { data });
export const getFacility = () =>
  get<API.APIFacilityList>(API_URL.GET_FACILITIY);
export const patchFacility = (data: API.APIFacilityParams) =>
  patch<API.APINullRes>(API_URL.PATCH_FACILITY, { data });
export const getBankAccountInfo = () =>
  get<API.APIBankAccountInfo>(API_URL.GET_BANK_ACCOUNT_INFO);
export const patchBankAccountInfo = (data: API.APIBankAccountInfoParams) =>
  patch<API.APINullRes>(API_URL.PATCH_BANK_ACCOUNT_INFO, { data });
export const getEHRLoginInfo = () =>
  get<API.APIEHRLoginInfo>(API_URL.GET_EHR_LOGIN_INFO);
export const patchEHRLoginInfo = (data: API.APIEHRLoginInfoParams) =>
  patch<API.APINullRes>(API_URL.PATCH_EHR_LOGIN_INFO, { data });
export const getUsers = () => get<API.APIUserList>(API_URL.GET_USERS);
export const patchUsers = (data: API.APIUserParams) =>
  post<API.APINullRes>(API_URL.PATCH_USERS, { data });
export const getAuthorizationForm = () =>
  get<API.APIAuthorizationForm>(API_URL.GET_AUTHORIZATION_FORM);
export const patchAuthorizationForm = (data: API.APIAuthorizationFormParams) =>
  patch<API.APINullRes>(API_URL.PATCH_AUTHORIZATION_FORM, { data });
export const getStripeChat = () =>
  get<API.APIStripeChat>(API_URL.GET_STRIPE_CHAT);
export const patchStripeChat = (data: API.APIStripeChatParams) =>
  patch<API.APINullRes>(API_URL.PATCH_STRIPE_CHAT, { data });
export const getPayers = () => get<API.APIPayerList>(API_URL.GET_PAYERS);
export const getPayersCSV = () =>
  get<API.APIPayerCSVRes>(API_URL.GET_PAYERS_CSV);
export const patchPayers = (data: API.APIPayerParams) =>
  post<API.APINullRes>(API_URL.PATCH_PAYERS, { data });
export const getAdditionalBillingInfo = () =>
  get<API.APIAdditionalBillingInfo>(API_URL.GET_ADDITIONAL_BILLING_INFO);
export const patchAdditionalBillingInfo = (
  data: API.APIAdditionalBillingInfoParams
) => patch<API.APINullRes>(API_URL.PATCH_ADDITIONAL_BILLING_INFO, { data });
export const searchProcedureCode = (params: API.APISearchProcedureCodeParams) =>
  get<API.APISearchProcedureCodeRes>(API_URL.SEARCH_PROCEDURE_CODE, { params });
export const searchNDCCode = (params: API.APISearchNDCCodeParams) =>
  get<API.APISearchNDCCodeRes>(API_URL.SEARCH_NDC_CODE, { params });
export const workflowCompletion = () =>
  post<API.APINullRes>(API_URL.WORKFLOW_COMPLETION);
