import { CgAddR } from "react-icons/cg";
import { ApplicationsListProps } from "../../Interfaces/IApplications";
import ApplicationsCard from "./ApplicationsCard";
import React, { useContext, useState } from "react";
import TextIn from "../inputs/TextIn";
import { faker } from "@faker-js/faker";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { ApplicationsContext } from "../../Context/ApplicationsContext";

export default function ApplicationsList({
  apps,
  title,
}: ApplicationsListProps) {
  const appsContext: ApplicationsContextType | null =
    useContext(ApplicationsContext);
  const [isAddBtn, setIsAddBtn] = useState<boolean>(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
      appsContext?.setAllApps((prev) => {
        const allApps = [
          ...prev,
          {
            category: title,
            id: faker.string.uuid(),
            title: (e.target as HTMLInputElement).value,
          },
        ];
        return allApps;
      });
      setIsAddBtn(false);
    } else if (e.key === "Escape") {
      setIsAddBtn(false);
    }
  };

  return (
    <div className="col-4">
      <div className="row justify-between">
        <h2 className="col">{title}</h2>
        <div className="col text-end">
          <button className="btn btn-primary" onClick={() => setIsAddBtn(true)}>
            <CgAddR />
          </button>
        </div>
      </div>
      <ul className="list-group">
        {isAddBtn && <TextIn name="apps2add" onKeyDown={onKeyDown} />}
        {apps?.map((app) => (
          <ApplicationsCard key={app.id} title={app.title} id={app.id} />
        ))}
      </ul>
    </div>
  );
}
