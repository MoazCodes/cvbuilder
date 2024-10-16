import React, { createContext } from "react";
import { AppsObj } from "../Interfaces/IApplications";
import { faker } from "@faker-js/faker";

function ApplicationCreator(): AppsObj {
    const categories = ["Favorites", "Applied", "Interview", "Offer", "Rejected", "Hired"];
    return {
        title: faker.lorem.words(),
        id: faker.string.uuid(),
        category: categories[Math.floor(Math.random() * categories.length)] // Use Math.floor to get a valid index
    };
}

const allApps: AppsObj[] = Array.from({ length: 15 }, ApplicationCreator);

export const ApplicationsContext = createContext<{ allApps: AppsObj[] } | null>(null);

const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ApplicationsContext.Provider value={{ allApps }}>
            {children}
        </ApplicationsContext.Provider>
    );
};

export default ApplicationProvider;
