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
    practice_id: string;
    access_code: string;
  }

  interface APIProgressPercentageInfo {
    percentage: number;
  }

  interface APIProgressModule {
    status: ModuleStatusEnum;
    editable: boolean;
    ready: boolean;
  }

  interface APIProgress {
    [key: string]: APIProgressModule;
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

  interface APIW9FormInfo {
    file_name: string;
  }

  type APITaxonomyCode = string;

  interface APIRenderingProvider {
    fisrt_name: string;
    last_name: string;
    suffix: string;
    rendering_npi: string;
    texonomy_codes: APITaxonomyCode[];
  }

  type APIRenderingProviderList = APIRenderingProvider[];

  interface APIProviderPair {
    advanced_provider: string;
    supervising_provider: string;
  }

  type APIProviderPairList = APIProviderPair[];

  interface APISuperAdvancedProvider {
    has_super_advanced_providers: string;
    always_paired: boolean;
    provider_pairs: APIProviderPairList;
  }

  interface APIFacility {
    name: string;
    edi_name: string;
    facility_type: string;
    address_line_one: string;
    address_line_two: string;
    city: string;
    state: string;
    zip: string;
    npi: string;
  }

  type APIFacilityList = APIFacility[];

  interface APIBankAccount {
    name: string;
    account_type: string;
    account_number: string;
    routing_number: string;
    bank_letter: string;
  }

  interface APIBankAccountInfo {
    pay_bank_info: APIBankAccount;
    receive_bank_info: APIBankAccount;
    is_same: boolean;
    signed_name: string;
  }

  interface APIEHRLoginInfo {
    user_name: string;
    password: string;
  }

  interface APIAuthorizationForm {
    file_name: string;
  }

  interface APIStripeChat {
    scheduled_chat: string;
  }

  interface APIPayer {
    id: string;
    payer_name: string;
    login_name: string;
    login_password: string;
  }

  type APIPayerList = APIPayer[];

  interface APIPayerCSV {
    csv_line: string;
  }

  interface APIUser {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  }

  type APIUserList = APIUser[];

  interface APIMedicationCodePair {
    procedure_code: string;
    ndc_code: string;
  }

  type APIMedicationCodePairList = APIMedicationCodePair[];

  interface APIAdditionalBillingInfo {
    need_cash_based_service: boolean;
    payments_info: string;
    has_medication: boolean;
    medication_code_pairs: APIMedicationCodePairList;
  }

  interface APISearchProcedureCodeParams {
    query: string;
  }

  interface APISearchNDCCodeParams {
    query: string;
    limit: number;
  }

  interface APIProcedureCode {
    code: string;
    description: string;
  }

  type APIProcedureCodeList = APIProcedureCode[];

  interface APINDCCode {
    code: string;
    description: string;
  }

  type APINDCCodeList = APINDCCode[];

  type APIBaseInfoParams = APIBasicInfo;
  type APIBillingInfoParams = APIBillingInfo;
  interface APISignW9FormParams {
    unsigned_w9: string;
    full_name: string;
  }
  type APIRenderingProviderParams = APIRenderingProviderList;
  type APISuperAdvancedProviderParams = APISuperAdvancedProvider;
  type APIFacilityParams = APIFacilityList;
  type APIBankAccountInfoParams = APIBankAccountInfo;
  type APIEHRLoginInfoParams = APIEHRLoginInfo;
  type APIAuthorizationFormParams = APIAuthorizationForm;
  type APIStripeChatParams = APIStripeChat;
  type APIPayerParams = APIPayerList;
  type APIUserParams = APIUserList;
  type APIAdditionalBillingInfoParams = APIAdditionalBillingInfo;

  type APIAccessCodeRes = APIRes<boolean>;
  type APIProgressPercentageRes = APIRes<APIProgressPercentageInfo>;
  type APIProgressRes = APIRes<APIProgress>;
  type APIBasicInfoRes = APIRes<APIBasicInfo>;
  type APIBillingInfoRes = APIRes<APIBillingInfo>;
  type APIW9FormRes = APIRes<APIW9FormInfo>;
  type APIRenderingProviderRes = APIRes<APIRenderingProviderList>;
  type APISuperAdvancedProviderRes = APIRes<APISuperAdvancedProvider>;
  type APIFacilityRes = APIRes<APIFacilityList>;
  type APIBankAccountInfoRes = APIRes<APIBankAccountInfo>;
  type APIEHRLoginInfoRes = APIRes<APIEHRLoginInfo>;
  type APIAuthorizationFormRes = APIRes<APIAuthorizationForm>;
  type APIStripeChatRes = APIRes<APIStripeChat>;
  type APIPayerRes = APIRes<APIPayerList>;
  type APIPayerCSVRes = APIRes<APIPayerCSV>;
  type APIUserRes = APIRes<APIUserList>;
  type APIAdditionalBillingInfoRes = APIRes<APIAdditionalBillingInfo>;
  type APISearchProcedureCodeRes = APIRes<APIProcedureCodeList>;
  type APISearchNDCCodeRes = APIRes<APINDCCodeList>;
}
