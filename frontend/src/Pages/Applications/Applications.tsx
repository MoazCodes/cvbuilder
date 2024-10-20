import { faker } from "@faker-js/faker";
import ApplicationsList from "../../componenets/applications/ApplicationsList";
import { AppsObj } from "../../Interfaces/IApplications";
import Styles from "./Applications.module.css";
import { useCallback, useContext, useState } from "react";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import ApplicationsBoard from "../../componenets/applications/ApplicationsBoard";

const categories = [
    "Favorites",
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Hired",
];

export default function Applications() {
    const appsContext: ApplicationsContextType | null =
        useContext(ApplicationsContext);
    const apps = appsContext?.allApps;

    return (
        <div
            className={`text-white p-4 min-vh-100 ${Styles["min-w-fit"]} ${Styles["overflow-x-visible"]}`}
        >
            
            <div className="container py-5">
                <ApplicationsBoard>
                    <div className="row g-3">
                        {categories.map((cat) => (
                            <ApplicationsList
                                key={cat}
                                title={cat}
                                apps={
                                    appsContext?.allApps?.filter(
                                        (app: AppsObj) => app.category === cat
                                    ) || []
                                }
                            />
                        ))}
                    </div>
                </ApplicationsBoard>
            </div>
        </div>
    );
}
