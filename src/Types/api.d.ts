declare namespace API {
  interface APIRes<T> {
    success: boolean;
    errorCode?: string;
    errorMessage?: string;
    total?: number;
    data?: T;
  }

  type APINullRes = APIRes<null>;

  interface APIAccessCodeParams {
    access_code: string;
  }

  interface APIBasicInfo {
    practice_legal_name: string;
    logo_name: string;
    display_name: string;
    business_contact_number: string;
    no_logo: boolean;
    address: {
      physical_address: string;
      city: string;
      state: string;
      zip: string;
    };
    taxonomy_codes: string[];
  }

  interface APIBillingInfo {
    tax_id: string;
    npi: string;
    tax_classification: string;
    additional_info: string;
  }

  type APIAccessCodeRes = APIRes<boolean>;
  type APIProgressPercentageRes = APIRes<number>;
  type APIBasicInfoRes = APIRes<APIBasicInfo>;
  type APIBillingInfoRes = APIRes<APIBillingInfo>;
}
