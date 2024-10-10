import { faker } from "@faker-js/faker";
import ApplicationsList from "../../componenets/applications/ApplicationsList";
import { AppsObj } from "../../interfaces";
import Styles from "./Applications.module.css";

function ApplicationCreator(): AppsObj {
  return {
    title: faker.lorem.words(),
    id: faker.string.uuid(),
  };
}

const Favorites: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);
const Applied: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);
const Interview: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);
const Offer: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);
const Rejected: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);
const Hired: AppsObj[] = Array.from({ length: 3 }, ApplicationCreator);

export default function Applications() {
  return (
    <div
      className={`text-white p-4 min-vh-100 ${Styles["min-w-fit"]} overflow-auto`}
    >
      <h1 id="applications" className="fs-3 fw-bold mt-5">
        Applications
      </h1>
      <div className="container py-5">
        <div className="row flex-nowrap">
          <ApplicationsList title="Favorites" apps={Favorites} />
          <ApplicationsList title="Applied" apps={Applied} />
          <ApplicationsList title="Interview" apps={Interview} />
          <ApplicationsList title="Offer" apps={Offer} />
          <ApplicationsList title="Rejected" apps={Rejected} />
          <ApplicationsList title="Hired" apps={Hired} />
        </div>
      </div>
    </div>
  );
}
