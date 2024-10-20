import React, { createContext, useCallback, useState } from "react";
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
    const changeAppCategory = useCallback(
        (id: string, category: string) => {
            const app = allApps?.find((app: AppsObj) => app.id === id);
            if (!app) {
                console.error(`App with id ${id} not found`);
                return;
            }

            const updatedApp = { ...app, category };
            const newApps =
                allApps?.map((app: AppsObj) =>
                    app.id === id ? updatedApp : app
                ) || [];

            setAllApps(newApps);
        },
        [allApps] // Include appsContext as a dependency
    );

    return (
        <ApplicationsContext.Provider
            value={{ allApps, setAllApps, changeAppCategory }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
};

export default ApplicationProvider;
