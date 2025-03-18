import Suspenselazy from "@components/Suspenselazy";
import { PracticeStatusEnum, PracticeKeyEnum } from "@/Types/enum";
import {
  getBasicInfo,
  patchBasicInfo,
  getBillingInfo,
  patchBillingInfo,
} from "@service/factory";

const BasicTemplateForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "BasicTemplateForm" */ "@/Pages/Step/component/FormComponents/BasicTemplateForm"
    )
);
const BillingForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "BillingForm" */ "@/Pages/Step/component/FormComponents/BillingForm"
    )
);
const PracticeInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "PracticeInfoForm" */ "@pages/Step/component/FormComponents/PracticeInfoForm"
    )
);

const practiceStatusConfig: Practice.PracticeStatusConfig = {
  [PracticeStatusEnum.NOT_STARTED]: {
    icon: require("@assets/images/status_not_started.png"),
    text: "New",
    textColor: "#2B6FF6",
    bgColor: "#E2EBFF",
  },
  [PracticeStatusEnum.IN_PROGRESS]: {
    icon: require("@assets/images/status_in_progress.png"),
    text: "In Progress",
    textColor: "#7F40C9",
    bgColor: "#FAEAFB",
  },
  [PracticeStatusEnum.COMPLETED]: {
    icon: require("@assets/images/status_completed.png"),
    text: "Completed",
    textColor: "#15803D",
    bgColor: "#EFFCF3",
  },
};

const practiceConfig: Practice.PracticeConfig = {
  practiceInfo: {
    key: PracticeKeyEnum.PRACTICE_INFO,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <PracticeInfoForm />,
    initDataApi: getBasicInfo,
    submitDataApi: patchBasicInfo,
  },
  billing: {
    key: PracticeKeyEnum.BILLING,
    cardTitle: "Billing",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle: "Next up—let’s tackle the billing details on the right.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Billing Tax ID & NPI",
    formComponent: <BillingForm />,
    initDataApi: getBillingInfo,
    submitDataApi: patchBillingInfo,
  },
  w9Form: {
    key: PracticeKeyEnum.W9_FORM,
    cardTitle: "W9-Form",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "Youlify uses a secure digital lockbox to process paper checks, EOBs, and claim denials.\n\nPayers require a signed W-9 to update the payment address.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "W-9 Form",
    formComponent: <BasicTemplateForm />,
  },
  renderingProvider: {
    key: PracticeKeyEnum.RENDERING_PROVIDER,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  facilityInfo: {
    key: PracticeKeyEnum.FACILITY_INFO,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  bankAccounts: {
    key: PracticeKeyEnum.BANK_ACCOUNTS,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  ehrLogin: {
    key: PracticeKeyEnum.EHR_LOGIN,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  accessToYoulify: {
    key: PracticeKeyEnum.ACCESS_TO_YOULIFY,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  clearingHouse: {
    key: PracticeKeyEnum.CLEARING_HOUSE,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  stripe: {
    key: PracticeKeyEnum.STRIPE,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  payerInfo: {
    key: PracticeKeyEnum.PAYER_INFO,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
  additionalBillingInfo: {
    key: PracticeKeyEnum.ADDITIONAL_BILLING_INFO,
    cardTitle: "Template Title",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Template Title",
    formComponent: <BasicTemplateForm />,
  },
};

const practiceKeys = Object.keys(practiceConfig) as Practice.PracticeKeys;

export { practiceStatusConfig, practiceConfig, practiceKeys };
