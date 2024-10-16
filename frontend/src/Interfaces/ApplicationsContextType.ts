import { AppsObj } from "./IApplications";

export type ApplicationsContextType = {
  allApps: AppsObj[] | null;
  setAllApps: React.Dispatch<React.SetStateAction<AppsObj[]>>;
};

