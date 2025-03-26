import { differenceBy } from "lodash";

export interface DataParseFormatConfigType {
  [key: string]: {
    format: Module.ModuleStepInfo["format"];
  };
}

export const DataParseFormatConfig: DataParseFormatConfigType = {
  accessToYoulify: {
    format(formData, initData) {
      const newUsers = differenceBy(formData.users, initData.users);
      const deletedUsers = differenceBy(
        initData.users,
        formData.users,
        "email"
      );
      return {
        new_users: newUsers,
        deleted_users: deletedUsers,
      };
    },
  },
  payerInfo: {
    format(formData, initData) {
      const newPayers = differenceBy(formData.payers, initData.payers);
      const deletedPayers = differenceBy(
        initData.payers,
        formData.payers,
        "id"
      ) as Record<string, any>[];
      const deletedPayersStructure = deletedPayers.map((deletedPayer) => ({
        id: deletedPayer.id,
        is_deleted: true,
      }));
      const payers = [...deletedPayersStructure, ...newPayers];
      return { payers };
    },
  },
};
