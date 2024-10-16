import { CgAddR } from "react-icons/cg";
import { ApplicationsListProps } from "../../Interfaces/IApplications";
import ApplicationsCard from "./ApplicationsCard";
import { useState } from "react";
import TextIn from "../inputs/TextIn";

export default function ApplicationsList({
  apps,
  title
}: ApplicationsListProps) {
  const [isAddBtn, setIsAddBtn] = useState<boolean>(false);

  return (
    <div className="col-4">
      <div className="row justify-between">
        <h2 className="col">{title}</h2>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddBtn(prev=>!prev)}
          >
            <CgAddR />
          </button>
        </div>
      </div>
      <ul className="list-group">
        {isAddBtn ? <TextIn name="apps2add" onChange={function () {}} /> : null}
        {apps.map((app) => (
          <ApplicationsCard key={app.id} title={app.title} />
        ))}
      </ul>
    </div>
  );
}
