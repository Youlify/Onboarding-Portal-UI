const API_URL = {
  ACCESS_CODE: "/practices/onboarding/{practice_id}/access-code/{access_code}",
  GET_PROGRESS_PERCENTAGE:
    "/practices/onboarding/{practice_id}/progress/percentage",
  GET_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  PATCH_BASIC_INFO: "/practices/onboarding/{practice_id}/basic_info",
  GET_BILLING_INFO: "/practices/onboarding/{practice_id}/tax_id_npi",
  PATCH_BILLING_INFO: "/practices/onboarding/{practice_id}/tax_id_npi",
};

export { API_URL };
