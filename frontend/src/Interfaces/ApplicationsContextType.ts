import { AppsObj } from "./IApplications";

export type ApplicationsContextType = {
  allApps: AppsObj[] | undefined;
  setAllApps: React.Dispatch<React.SetStateAction<AppsObj[] | []>>;
  changeAppCategory: (id: string, category: string) => void;
};
