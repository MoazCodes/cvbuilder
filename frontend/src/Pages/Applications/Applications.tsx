import { faker } from "@faker-js/faker";
import Styles from "./Applications.module.css";
import ApplicationsList from "../../componenets/applications/ApplicationsList";
import { useState } from "react";
export default function Applications() {
    let add = (type: string[], taskToBeAdded: string) => {
        type.push(taskToBeAdded);
    };
    const [Favorites, setFavorites] = useState<string[]>([]);
    const [Applied, setApplied] = useState<string[]>([]);
    const [Interview, setInterview] = useState<string[]>([]);
    const [Offer, setOffer] = useState<string[]>([]);
    const [Hired, setHired] = useState<string[]>([]);
    const [Rejected, setRejected] = useState<string[]>([]);
    return (
        <div
            className={`text-white p-4 min-vh-100 bg-transparent overflow-auto mt-5`}
        >
            <div className="container">
                <div className="row g-5">
                    <ApplicationsList
                        title="Favorites"
                        apps={Favorites}
                        setApps={setFavorites}
                    />
                    <ApplicationsList
                        title="Applied"
                        apps={Applied}
                        setApps={setApplied}
                    />
                    <ApplicationsList
                        title="Interview"
                        apps={Interview}
                        setApps={setInterview}
                    />
                    <ApplicationsList
                        title="Offer"
                        apps={Offer}
                        setApps={setOffer}
                    />
                    <ApplicationsList
                        title="Rejected"
                        apps={Rejected}
                        setApps={setRejected}
                    />
                    <ApplicationsList
                        title="Hired"
                        apps={Hired}
                        setApps={setHired}
                    />
                </div>
            </div>
        </div>
    );
}