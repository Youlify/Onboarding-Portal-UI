const API_URL = {
  ACCESS_CODE: "/onboarding/practices/{practice_id}/access_code/{access_code}",
  GET_PROGRESS_PERCENTAGE:
    "/onboarding/practices/{practice_id}/progress/percentage",
  GET_PROGRESS: "/onboarding/practices/{practice_id}/progress",
  GET_BASIC_INFO: "/onboarding/practices/{practice_id}/basic_info",
  GET_BASIC_INFO_TAXONOMY_CODES:
    "/onboarding/practices/{practice_id}/basic_info/taxonomy_codes",
  PATCH_BASIC_INFO: "/onboarding/practices/{practice_id}/basic_info",
  GET_BILLING: "/onboarding/practices/{practice_id}/tax_id_npi",
  PATCH_BILLING: "/onboarding/practices/{practice_id}/tax_id_npi",
  GET_W9_FORM: "/onboarding/practices/{practice_id}/w9",
  SIGN_W9_FORM: "/onboarding/practices/{practice_id}/w9",
  GET_RENDERING_PROVIDER:
    "/onboarding/practices/{practice_id}/rendering_provider",
  PATCH_RENDERING_PROVIDER:
    "/onboarding/practices/{practice_id}/rendering_provider",
  GET_SUPER_ADVANCED_PROVIDER:
    "/onboarding/practices/{practice_id}/super_advanced_provider",
  PATCH_SUPER_ADVANCED_PROVIDER:
    "/onboarding/practices/{practice_id}/super_advanced_provider",
  GET_FACILITIY: "/onboarding/practices/{practice_id}/facility",
  PATCH_FACILITY: "/onboarding/practices/{practice_id}/facility",
  GET_BANK_ACCOUNT_INFO:
    "/onboarding/practices/{practice_id}/bank_account_info",
  PATCH_BANK_ACCOUNT_INFO:
    "/onboarding/practices/{practice_id}/bank_account_info",
  GET_EHR_LOGIN_INFO: "/onboarding/practices/{practice_id}/ehr_login_info",
  PATCH_EHR_LOGIN_INFO: "/onboarding/practices/{practice_id}/ehr_login_info",
  GET_USERS: "/onboarding/practices/{practice_id}/users",
  PATCH_USERS: "/onboarding/practices/{practice_id}/users",
  GET_AUTHORIZATION_FORM:
    "/onboarding/practices/{practice_id}/authorization_form",
  PATCH_AUTHORIZATION_FORM:
    "/onboarding/practices/{practice_id}/authorization_form",
  GET_STRIPE_CHAT: "/onboarding/practices/{practice_id}/stripe_chat",
  PATCH_STRIPE_CHAT: "/onboarding/practices/{practice_id}/stripe_chat",
  GET_PAYERS: "/onboarding/practices/{practice_id}/payers",
  GET_PAYERS_CSV: "/onboarding/practices/{practice_id}/payers/csv",
  PATCH_PAYERS: "/onboarding/practices/{practice_id}/payers",
  GET_ADDITIONAL_BILLING_INFO:
    "/onboarding/practices/{practice_id}/additional_billing_info",
  PATCH_ADDITIONAL_BILLING_INFO:
    "/onboarding/practices/{practice_id}/additional_billing_info",
  SEARCH_PROCEDURE_CODE: "/medical-code/procedure-code-option/search",
  SEARCH_NDC_CODE: "/medical-code/ndc-code-option/search",
  WORKFLOW_COMPLETION: "/onboarding/practices/{practice_id}/completion",
};

export { API_URL };
