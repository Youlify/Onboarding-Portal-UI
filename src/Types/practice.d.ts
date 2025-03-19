declare namespace Module {
  interface ModuleCardInfo {
    key: Module.ModuleKey;
    cardTitle: string;
    cardFillText: string;
  }

  interface ModuleStepInfo {
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

  type ModuleKey = `${ModuleKeyEnum}`;

  type ModuleKeys = ModuleKey[];

  type ModuleStatusConfig = {
    [key in ModuleStatusEnum]: {
      icon: string;
      text: string;
      textColor: string;
      bgColor: string;
    };
  };

  type ModuleInfo = ModuleCardInfo & ModuleStepInfo;

  type ModuleConfig = {
    [key in ModuleKey]: ModuleInfo;
  };
}
