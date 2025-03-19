const API_URL = {
  ACCESS_CODE: "/practices/onboarding/{practice_id}/access-code/{access_code}",
  GET_PROGRESS_PERCENTAGE:
    "/practices/onboarding/{practice_id}/progress/percentage",
  GET_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  PATCH_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  GET_BILLING: "/practices/onboarding/{practice_id}/tax_id_npi",
  PATCH_BILLING: "/practices/onboarding/{practice_id}/tax_id_npi",
  GET_W9_FORM: "/practices/onboarding/{practice_id}/w9",
  SIGN_W9_FORM: "/practices/onboarding/{practice_id}/w9",
};

export { API_URL };
