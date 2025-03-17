import Suspenselazy from "@components/Suspenselazy";
import { PracticeStatusEnum, PracticeKeyEnum } from "@/Types/enum";
import { getBasicInfo } from "@service/factory";

const PracticeInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "PracticeInfoForm" */ "@pages/Step/component/FormComponents/PracticeInfoForm"
    )
);
const BasicInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "BasicInfoForm" */ "@/Pages/Step/component/FormComponents/BasicInfoForm"
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
  },
  billing: {
    key: PracticeKeyEnum.BILLING,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  w9Form: {
    key: PracticeKeyEnum.W9_FORM,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  renderingProvider: {
    key: PracticeKeyEnum.RENDERING_PROVIDER,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  facilityInfo: {
    key: PracticeKeyEnum.FACILITY_INFO,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  bankAccounts: {
    key: PracticeKeyEnum.BANK_ACCOUNTS,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  ehrLogin: {
    key: PracticeKeyEnum.EHR_LOGIN,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  accessToYoulify: {
    key: PracticeKeyEnum.ACCESS_TO_YOULIFY,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  clearingHouse: {
    key: PracticeKeyEnum.CLEARING_HOUSE,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  stripe: {
    key: PracticeKeyEnum.STRIPE,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  payerInfo: {
    key: PracticeKeyEnum.PAYER_INFO,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
  additionalBillingInfo: {
    key: PracticeKeyEnum.ADDITIONAL_BILLING_INFO,
    cardTitle: "Practice Information",
    cardFillText: "5 Fields  |  Avg 5-10mins",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <BasicInfoForm />,
  },
};

const practiceKeys = Object.keys(practiceConfig) as Practice.PracticeKeys;

export { practiceStatusConfig, practiceConfig, practiceKeys };
