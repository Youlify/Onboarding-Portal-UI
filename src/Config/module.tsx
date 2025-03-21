import Suspenselazy from "@components/Suspenselazy";
import { ModuleStatusEnum, ModuleKeyEnum } from "@/Types/enum";
import {
  getBasicInfo,
  patchBasicInfo,
  getBilling,
  patchBilling,
  getW9Form,
  signW9Form,
} from "@service/factory";

const PracticeInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "PracticeInfoForm" */ "@pages/Step/component/FormComponents/PracticeInfoForm"
    )
);
const BillingForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "BillingForm" */ "@/Pages/Step/component/FormComponents/BillingForm"
    )
);
const W9Form = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "W9Form" */ "@/Pages/Step/component/FormComponents/W9Form"
    )
);
const RenderingProviderForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "RenderingProviderForm" */ "@/Pages/Step/component/FormComponents/RenderingProviderForm"
    )
);
const SuperAdvancedProviderForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "SuperAdvancedProviderForm" */ "@/Pages/Step/component/FormComponents/SuperAdvancedProviderForm"
    )
);
const FacilityInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "FacilityInfoForm" */ "@/Pages/Step/component/FormComponents/FacilityInfoForm"
    )
);
const BankAccountsForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "BankAccountsForm" */ "@/Pages/Step/component/FormComponents/BankAccountsForm"
    )
);
const EHRLoginForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "EHRLoginForm" */ "@/Pages/Step/component/FormComponents/EHRLoginForm"
    )
);
const AccessToYoulifyForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "AccessToYoulifyForm" */ "@/Pages/Step/component/FormComponents/AccessToYoulifyForm"
    )
);
const ClearingHouseForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "ClearingHouseForm" */ "@/Pages/Step/component/FormComponents/ClearingHouseForm"
    )
);
const StripeForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "StripeForm" */ "@/Pages/Step/component/FormComponents/StripeForm"
    )
);
const PayerInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "PayerInfoForm" */ "@/Pages/Step/component/FormComponents/PayerInfoForm"
    )
);
const AdditionalBillingInfoForm = Suspenselazy(
  () =>
    import(
      /* webpackChunkName: "AdditionalBillingInfoForm" */ "@/Pages/Step/component/FormComponents/AdditionalBillingInfoForm"
    )
);

const moduleStatusConfig: Module.ModuleStatusConfig = {
  [ModuleStatusEnum.NOT_STARTED]: {
    icon: require("@assets/images/status_not_started.png"),
    text: "New",
    textColor: "#2B6FF6",
    bgColor: "#E2EBFF",
  },
  [ModuleStatusEnum.IN_PROGRESS]: {
    icon: require("@assets/images/status_in_progress.png"),
    text: "In Progress",
    textColor: "#7F40C9",
    bgColor: "#FAEAFB",
  },
  [ModuleStatusEnum.COMPLETED]: {
    icon: require("@assets/images/status_completed.png"),
    text: "Completed",
    textColor: "#15803D",
    bgColor: "#EFFCF3",
  },
  [ModuleStatusEnum.NEED_MORE_INFO]: {
    icon: require("@assets/images/status_need_more_info.png"),
    text: "Need More Info",
    textColor: "#B45309",
    bgColor: "#FEF3C7",
  },
  [ModuleStatusEnum.IN_REVIEW]: {
    icon: require("@assets/images/status_in_review.png"),
    text: "In Review",
    textColor: "#6C717C",
    bgColor: "#F6F6F8",
  },
  [ModuleStatusEnum.APPROVED]: {
    icon: require("@assets/images/status_approved.png"),
    text: "Approved",
    textColor: "#6C717C",
    bgColor: "#F6F6F8",
  },
};

const moduleConfig: Module.ModuleConfig = {
  practiceInfo: {
    key: ModuleKeyEnum.PRACTICE_INFO,
    cardTitle: "Practice Information",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "First things first—let's start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: <PracticeInfoForm />,
    initDataApi: getBasicInfo,
    submitDataApi: patchBasicInfo,
  },
  billing: {
    key: ModuleKeyEnum.BILLING,
    cardTitle: "Billing Tax ID & NPI",
    cardFillText: "Avg 5-10mins",
    bannerTitle: "Next up—let's tackle the billing details on the right.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Billing Tax ID & NPI",
    formComponent: <BillingForm />,
    initDataApi: getBilling,
    submitDataApi: patchBilling,
  },
  w9Form: {
    key: ModuleKeyEnum.W9_FORM,
    cardTitle: "W9-Form",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Youlify uses a secure digital lockbox to process paper checks, EOBs, and claim denials.\n\nPayers require a signed W-9 to update the payment address.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "W-9 Form",
    formComponent: <W9Form />,
    initDataApi: getW9Form,
    submitDataApi: signW9Form,
  },
  renderingProvider: {
    key: ModuleKeyEnum.RENDERING_PROVIDER,
    cardTitle: "Rendering Provider",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Who's who in your practice?\n\nPlease list all your rendering providers.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Rendering Provider",
    formComponent: <RenderingProviderForm />,
  },
  superAdvancedProvider: {
    key: ModuleKeyEnum.SUPER_ADVANCED_PROVIDER,
    cardTitle: "Supervising Provider & Advanced Provider",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Let's pair things up—tell us about the supervising provider and advanced provider pairs.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Supervising Provider & Advanced Provider",
    formComponent: <SuperAdvancedProviderForm />,
  },
  facilityInfo: {
    key: ModuleKeyEnum.FACILITY_INFO,
    cardTitle: "Facility Information",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Where do you practice?\n\nPlease list all facilities where your team provides services.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Facility Information",
    formComponent: <FacilityInfoForm />,
  },
  bankAccounts: {
    key: ModuleKeyEnum.BANK_ACCOUNTS,
    cardTitle: "Bank Accounts",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Let's talk banking—which accounts should we use for Youlify payments and payer deposits? (They can be the same!)",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Bank Account to Pay Youlify Invoice",
    formComponent: <BankAccountsForm />,
  },
  ehrLogin: {
    key: ModuleKeyEnum.EHR_LOGIN,
    cardTitle: "EHR Login In",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "You're more than halfway there! \n\nTo connect with your EHR, please create a new account for us with office manager (preferred) or biller access.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "EHR Login In",
    formComponent: <EHRLoginForm />,
  },
  accessToYoulify: {
    key: ModuleKeyEnum.ACCESS_TO_YOULIFY,
    cardTitle: "Access to Youlify",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Now it's fun part—how many people from your practice need access to Youlify?\n\nThis usually includes front office staff handling co-pays, the office manager, and providers reviewing claim payments.",
    bannerSubTitle:
      "You can add, remove, or modify accounts at any time during your contract period by contacting Youlify support.",
    formTitle: "Access to Youlify",
    formComponent: <AccessToYoulifyForm />,
  },
  clearingHouse: {
    key: ModuleKeyEnum.CLEARING_HOUSE,
    cardTitle: "Clearing House Authorization Form",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Almost done—we just need the clearinghouse authorization form on your company letterhead.",
    bannerSubTitle: "",
    formTitle: "Clearing House Authorization Form",
    formComponent: <ClearingHouseForm />,
  },
  stripe: {
    key: ModuleKeyEnum.STRIPE,
    cardTitle: "Stripe",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Youlify partners with Stripe to process credit card payments. We have pre-configured to accept FSA and HSA cards.\n\nPlease do not sign up with Stripe directly. Instead, please schedule a quick chat where we can go through the Stripe onboarding together.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Stripe Standard Connect Account Chat",
    formComponent: <StripeForm />,
  },
  payerInfo: {
    key: ModuleKeyEnum.PAYER_INFO,
    cardTitle: "Payer Information",
    cardFillText: "Avg 5-10mins",
    bannerTitle:
      "Let’s lock in your payer details.\n\nDon’t forget to list all the payers.",
    bannerSubTitle: "",
    formTitle: "Payer Information",
    formComponent: <PayerInfoForm />,
  },
  additionalBillingInfo: {
    key: ModuleKeyEnum.ADDITIONAL_BILLING_INFO,
    cardTitle: "Additional Billing Information",
    cardFillText: "Avg 5-10mins",
    bannerTitle: "And finally—a few extra questions to wrap things up.",
    bannerSubTitle: "",
    formTitle: "Additional Billing Information",
    formComponent: <AdditionalBillingInfoForm />,
  },
};

const moduleKeys = Object.keys(moduleConfig) as Module.ModuleKeys;

export { moduleStatusConfig, moduleConfig, moduleKeys };
