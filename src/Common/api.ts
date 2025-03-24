const API_URL = {
  ACCESS_CODE: "/practices/{practice_id}/access_code/{access_code}",
  GET_PROGRESS_PERCENTAGE: "/practices/{practice_id}/progress/percentage",
  GET_PROGRESS: "/practices/{practice_id}/progress",
  GET_BASIC_INFO: "/practices/{practice_id}/basic_info",
  GET_BASIC_INFO_TAXONOMY_CODES:
    "/practices/{practice_id}/basic_info/taxonomy_codes",
  PATCH_BASIC_INFO: "/practices/{practice_id}/basic_info",
  GET_BILLING: "/practices/{practice_id}/tax_id_npi",
  PATCH_BILLING: "/practices/{practice_id}/tax_id_npi",
  GET_W9_FORM: "/practices/{practice_id}/w9",
  SIGN_W9_FORM: "/practices/{practice_id}/w9",
  GET_RENDERING_PROVIDER: "/practices/{practice_id}/rendering_provider",
  PATCH_RENDERING_PROVIDER: "/practices/{practice_id}/rendering_provider",
  GET_SUPER_ADVANCED_PROVIDER:
    "/practices/{practice_id}/super_advanced_provider",
  PATCH_SUPER_ADVANCED_PROVIDER:
    "/practices/{practice_id}/super_advanced_provider",
  GET_FACILITIY: "/practices/{practice_id}/facility",
  PATCH_FACILITY: "/practices/{practice_id}/facility",
  GET_BANK_ACCOUNT_INFO: "/practices/{practice_id}/bank_account_info",
  PATCH_BANK_ACCOUNT_INFO: "/practices/{practice_id}/bank_account_info",
  GET_EHR_LOGIN_INFO: "/practices/{practice_id}/ehr_login_info",
  PATCH_EHR_LOGIN_INFO: "/practices/{practice_id}/ehr_login_info",
  GET_USERS: "/practices/{practice_id}/users",
  PATCH_USERS: "/practices/{practice_id}/users",
  GET_AUTHORIZATION_FORM: "/practices/{practice_id}/authorization_form",
  PATCH_AUTHORIZATION_FORM: "/practices/{practice_id}/authorization_form",
  GET_STRIPE_CHAT: "/practices/{practice_id}/stripe_chat",
  PATCH_STRIPE_CHAT: "/practices/{practice_id}/stripe_chat",
  GET_PAYERS: "/practices/{practice_id}/payers",
  PATCH_PAYERS: "/practices/{practice_id}/payers",
  GET_ADDITIONAL_BILLING_INFO:
    "/practices/{practice_id}/additional_billing_info",
  PATCH_ADDITIONAL_BILLING_INFO:
    "/practices/{practice_id}/additional_billing_info",
  SEARCH_PROCEDURE_CODE: "/medical-code/procedure-code-option/search",
  SEARCH_NDC_CODE: "/medical-code/ndc-code-option/search",
};

export { API_URL };
