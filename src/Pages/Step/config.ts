import Suspenselazy from "@components/Suspenselazy";

interface Step {
  key: string;
  bannerTitle: string;
  bannerSubTitle: string;
  formTitle: string;
  formComponent: React.ReactElement;
}

interface StepsConfig {
  [key: string]: Step;
}

const stepsConfig: StepsConfig = {
  basicInfo: {
    key: "basicInfo",
    bannerTitle:
      "First things first—let’s start with some basic information about your practice.",
    bannerSubTitle: "All fields are required unless marked as optional.",
    formTitle: "Practice Information",
    formComponent: Suspenselazy(
      () =>
        import(
          /* webpackChunkName: "BasicInfoForm" */ "@pages/Step/component/Forms/BasicInfoForm"
        )
    ),
  },
};

export type { Step, StepsConfig };
export { stepsConfig };
