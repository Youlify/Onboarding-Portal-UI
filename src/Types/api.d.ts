declare namespace API {
  interface APIRes<T> {
    success: boolean;
    errorCode?: string;
    errorMessage?: string;
    total?: number;
    data?: T;
  }

  type APINullRes = APIRes<null>;

  interface APIBaseParams {
    practice_id: string;
    patient_id: string;
  }

  type APIBalanceInfo = Patient.BalanceInfo;

  interface APICreatPaymentLinkInfo {
    stripe_id: string;
    stripe_link: string;
  }

  interface APIPaymentDistribution {
    statement_id: string;
    payment_amount: number;
  }

  interface APILoginParams extends Patient.AccountInfo {}

  interface APILogoutParams {
    account_number: string;
  }

  interface APIDownloadReportParams extends APIBaseParams {
    account_number: string;
    tab: string;
    sub_tab: string;
  }

  interface APICreatPaymentLinkParams extends APIBaseParams {
    user_id: string;
    is_full_payment: boolean;
    total_payment_amount: number;
    pay_distribution: APIPaymentDistribution[];
  }

  interface APIPaymentStatusParams extends APIBaseParams {
    stripe_id: string;
  }

  type APILoginRes = APIRes<Patient.AccountAPIInfo>;
  type APIBasicInfoRes = APIRes<Patient.BasicInfo>;
  type APIBalanceInfoRes = APIRes<APIBalanceInfo>;
  type APIDownloadReportRes = APIRes<Patient.ReportDownloadInfo>;
  type APIStatementPayInfoRes = APIRes<Patient.StatementInfoList>;
  type APICreatPaymentLinkRes = APIRes<APICreatPaymentLinkInfo>;
  type APIPaymentStatusRes = APIRes<Patient.PaymentStatus>;
}
