import { ApplicationsListProps } from "../../interfaces";
import ApplicationsCard from "./ApplicationsCard";
import { useState } from "react";
import TextIn from "../inputs/TextIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ApplicationsList({
    apps,
    title,
    setApps,
}: ApplicationsListProps) {
    const [isAddBtn, setIsAddBtn] = useState<boolean>(false);

    return (
        <div className="col-md-4 col-sm-12 min-vh-70   max-vh-70 overflow-hidden">
            <div className="row justify-between ">
                <div className="col position-relative">
                    <h2>{title}</h2>
                </div>
                <div className="col text-end">
                    <button
                        className="btn"
                        style={{ backgroundColor: "var(--main-color)" }}
                        onClick={() => setIsAddBtn(!isAddBtn)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <hr
                    className=" mx-auto "
                    style={{
                        border: "solid 2px var(--main-color) ",
                        opacity: 1,
                        width: "95%",
                    }}
                />
            </div>
            {isAddBtn ? (
                <TextIn
                    name="apps2add"
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            const target = e.target as HTMLInputElement;
                            if (target.value.trim() != "") {
                                setApps((prevApps) => [
                                    target.value,
                                    ...prevApps,
                                ]);
                            }

                            // target.value = ""; // Clear the input if desired
                            setIsAddBtn(!isAddBtn);
                        }
                    }}
                />
            ) : null}
            <div className="group max-vh-70 overflow-auto">
                {apps.length > 0 && (
                    <ul
                        className="list-group border rounded-0"
                        style={{ borderColor: "#fcc7ee45; !important" }}
                    >
                        {apps.map((app, idx) => (
                            <ApplicationsCard
                                key={idx}
                                title={app}
                                id={idx}
                                setApps={setApps}
                                apps={apps}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
