declare namespace Practice {
  interface PracticeCardInfo {
    key: string;
    cardTitle: string;
    cardFillText: string;
  }

  interface PracticeStepInfo {
    bannerTitle: string;
    bannerSubTitle: string;
    formTitle: string;
    formComponent: React.ReactElement;
    initDataApi?: () => Promise;
    patchDataApi?: () => Promise;
  }

  type PracticeKey = `${PracticeKeyEnum}`;

  type PracticeKeys = PracticeKey[];

  type PracticeStatusConfig = {
    [key in PracticeStatusEnum]: {
      icon: string;
      text: string;
      textColor: string;
      bgColor: string;
    };
  };

  type PracticeInfo = PracticeCardInfo & PracticeStepInfo;

  type PracticeConfig = {
    [key in PracticeKey]: PracticeInfo;
  };
}
