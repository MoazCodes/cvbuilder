import React, { createContext, useState } from "react";
import { AppsObj } from "../Interfaces/IApplications";
import { faker } from "@faker-js/faker";
import { ApplicationsContextType } from "../Interfaces/ApplicationsContextType";

function ApplicationCreator(): AppsObj {
  const categories = [
    "Favorites",
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Hired",
  ];
  return {
    title: faker.lorem.words(),
    id: faker.string.uuid(),
    category: categories[Math.floor(Math.random() * categories.length)], // Use Math.floor to get a valid index
  };
}

const intialApps: AppsObj[] = Array.from({ length: 10 }, ApplicationCreator);

export const ApplicationsContext =
  createContext<ApplicationsContextType | null>(null);

const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [allApps, setAllApps] = useState(intialApps);
  return (
    <ApplicationsContext.Provider value={{ allApps, setAllApps }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationProvider;
