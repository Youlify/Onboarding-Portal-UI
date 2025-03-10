declare namespace Patient {
  interface AccountInfo {
    account_number: string;
    dob: string;
  }
  interface AccountAPIInfo {
    practice_id: string;
    patient_id: string;
  }
  interface PatientInfo {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  }
  interface PracticeInfo {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  }
  interface BasicInfo {
    account_number: string;
    patient: PatientInfo;
    practice: PracticeInfo;
  }
  interface StatementInfo {
    statement_id: string;
    dos: string;
    description: string;
    fee: string;
    insurance_paid: string;
    patient_paid: string;
    patient_balance: string;
    reason: string;
    status: string;
  }
  interface PaymentInfo {
    payment_id: string;
    payment_date: string;
    amount: number;
    method: string;
    channel: string;
    receipt_link: string;
  }
  type StatementInfoList = StatementInfo[];
  type PaymentInfoList = PaymentInfo[];
  interface BalanceInfo {
    balance: number;
    statements: StatementInfoList;
    payments: PaymentInfoList;
  }
  interface ReportDownloadInfo {
    report_link: string;
  }
  interface PaymentStatus {
    payment_status: "success" | "pending";
  }
}
