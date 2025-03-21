const API_URL = {
  ACCESS_CODE: "/practices/onboarding/{practice_id}/access-code/{access_code}",
  GET_PROGRESS_PERCENTAGE:
    "/practices/onboarding/{practice_id}/progress/percentage",
  GET_PROGRESS_STATUS: "/practices/onboarding/{practice_id}/progress",
  GET_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  GET_BASIC_INFO_TAXONOMY_CODES:
    "/practices/onboarding/{practice_id}/basic_info/taxonomy_codes",
  PATCH_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  GET_BILLING: "/practices/onboarding/{practice_id}/tax_id_npi",
  PATCH_BILLING: "/practices/onboarding/{practice_id}/tax_id_npi",
  GET_W9_FORM: "/practices/onboarding/{practice_id}/w9",
  SIGN_W9_FORM: "/practices/onboarding/{practice_id}/w9",
  GET_RENDERING_PROVIDER:
    "/practices/onboarding/{practice_id}/rendering_provider",
  PATCH_RENDERING_PROVIDER:
    "/practices/onboarding/{practice_id}/rendering_provider",
  GET_SUPER_ADVANCED_PROVIDER:
    "/practices/onboarding/{practice_id}/super_advanced_provider",
  PATCH_SUPER_ADVANCED_PROVIDER:
    "/practices/onboarding/{practice_id}/super_advanced_provider",
  GET_FACILITIES: "/practices/onboarding/{practice_id}/facilities",
  PATCH_FACILITIES: "/practices/onboarding/{practice_id}/facilities",
  GET_BANK_INFO: "/practices/onboarding/{practice_id}/bank_info",
  PATCH_BANK_INFO: "/practices/onboarding/{practice_id}/bank_info",
  GET_EHR_ACCOUNT: "/practices/onboarding/{practice_id}/ehr_account",
  PATCH_EHR_ACCOUNT: "/practices/onboarding/{practice_id}/ehr_account",
};

export { API_URL };
