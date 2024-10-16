import { ApplicationsListProps } from "../../Interfaces/IApplications";
import ApplicationsCard from "./ApplicationsCard";
import React, { useContext, useState } from "react";

import TextIn from "../inputs/TextIn";
import { faker } from "@faker-js/faker";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

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
    <div className="col-md-4 col-sm-12 "  style={{minHeight:"80vh"}}>
      <div className=" d-flex justify-content-between my-2" style={{color:"var(--main-color) !important"}}>
        <h2 >{title}</h2>
        
          <button className="btn "style={{background:"var(--main-color)"}} onClick={() => setIsAddBtn(true)}>
            <FontAwesomeIcon icon={faAdd} color="white"/>
          </button>
          
      </div>
        
      
      <ul className="list-group border ">
        {isAddBtn && <TextIn name="apps2add" onKeyDown={onKeyDown} />}
        {apps?.map((app) => (
          <ApplicationsCard key={app.id} title={app.title} id={app.id} />
        ))}
      </ul>
    </div>
  );
}
