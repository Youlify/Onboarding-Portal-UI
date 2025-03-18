declare namespace Practice {
  interface PracticeCardInfo {
    key: Practice.PracticeKey;
    cardTitle: string;
    cardFillText: string;
  }

  interface PracticeStepInfo {
    bannerTitle: string;
    bannerSubTitle: string;
    formTitle: string;
    formComponent: React.ReactElement;
    initDataApi?: (params?: Record<string, any>) => Promise<any>;
    submitDataApi?: (data?: Record<string, any>) => Promise<any>;
    extraDataApis?: ((params?: Record<string, any>) => Promise<any>)[];
    format?: (formData: Record<string, any>) => Record<string, any>;
    parse?: (apiData: Record<string, any>) => Record<string, any>;
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
