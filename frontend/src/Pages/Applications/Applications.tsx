import { faker } from "@faker-js/faker";
import ApplicationsList from "../../componenets/applications/ApplicationsList";
import { AppsObj } from "../../Interfaces/IApplications";
import Styles from "./Applications.module.css";
import { useContext } from "react";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";

export default function Applications() {
  const appsContext: ApplicationsContextType | null =
    useContext(ApplicationsContext);
  // Check if allApps is available
  if (!appsContext?.allApps) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <div
      className={`text-white p-4 min-vh-100 ${Styles["min-w-fit"]} ${Styles["overflow-x-visible"]}`}
    >
      <h1 id="applications" className="fs-3 fw-bold mt-5">
        Applications
      </h1>
      <div className="container py-5">
        <div className="row g-3">
          <ApplicationsList
            title="Favorites"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Favorites"
            )}
          />
          <ApplicationsList
            title="Applied"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Applied"
            )}
          />
          <ApplicationsList
            title="Interview"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Interview"
            )}
          />
          <ApplicationsList
            title="Offer"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Offer"
            )}
          />
          <ApplicationsList
            title="Rejected"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Rejected"
            )}
          />
          <ApplicationsList
            title="Hired"
            apps={appsContext?.allApps.filter(
              (app: AppsObj) => app.category === "Hired"
            )}
          />
        </div>
      </div>
    </div>
  );
}