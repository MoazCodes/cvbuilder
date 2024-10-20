import { ApplicationsListProps, AppsObj } from "../../Interfaces/IApplications";
import ApplicationsCard from "./ApplicationsCard";
import React, { useContext, useRef, useState } from "react";

import TextIn from "../inputs/TextIn";
import { faker } from "@faker-js/faker";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import { ItemTypes } from "../../Interfaces/dndTypes";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function ApplicationsList({
    apps,
    title,
}: ApplicationsListProps) {
    const appsContext: ApplicationsContextType | null =
        useContext(ApplicationsContext);
    const [isAddBtn, setIsAddBtn] = useState<boolean>(false);
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.APPLICATION,
        drop: (app: AppsObj) => {
            if (app && app?.id) {
                appsContext?.changeAppCategory(app.id, title);
            }
        },
    });

    drop(ref);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
            appsContext?.setAllApps((prev) => {
                if (prev) {
                    const allApps = [
                        ...prev,
                        {
                            category: title,
                            id: faker.string.uuid(),
                            title: (e.target as HTMLInputElement).value,
                        },
                    ];
                    return allApps;
                }
                return prev;
            });
            setIsAddBtn(false);
        } else if (e.key === "Escape") {
            setIsAddBtn(false);
        }
    };

    return (
        <>
            <div className="col-md-4 col-sm-12 min-vh-50" ref={ref}>
                <div>
                    <div className="row justify-between">
                        <h2 className="col">{title}</h2>
                        <div className="col text-end">
                            <button
                                className="btn"
                                onClick={() => setIsAddBtn(true)}
                                style={{ background: "var(--main-color)" }}
                            >
                                <FontAwesomeIcon icon={faAdd} color="white" />
                            </button>
                        </div>
                    </div>

                    <ul className="list-group border ">
                        {isAddBtn && (
                            <TextIn name="apps2add" onKeyDown={onKeyDown} />
                        )}
                        {apps?.map((app) => (
                            <ApplicationsCard
                                key={app.id}
                                title={app.title}
                                id={app.id}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
