declare namespace Module {
  interface ModuleCardInfo {
    key: Module.ModuleKey;
    apiKey?: string;
    cardTitle: string;
    cardFillText: string;
  }

  interface ModuleStepInfo {
    bannerTitle: string;
    bannerSubTitle: string;
    formTitle: string;
    formComponent: React.ReactElement;
    initDataApi?: (params?: any) => Promise<any>;
    submitDataApi?: (data?: any) => Promise<any>;
    extraDataApis?: ((params?: any) => Promise<any>)[];
    format?: (formData: any, initData?: any) => any;
    parse?: (apiData: any) => Record<string, any>;
    needRefresh?: boolean;
    onlyNext?: boolean;
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

  type ModuleInfoWithProgress = ModuleInfo & {
    progress: API.APIProgressModule;
  };

  type ModuleConfig = {
    [key in ModuleKey]: ModuleInfo;
  };
}
