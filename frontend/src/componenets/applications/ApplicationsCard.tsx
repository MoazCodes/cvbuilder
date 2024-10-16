import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ApplicationCard.css";
import { Dispatch, SetStateAction } from "react";
interface ApplicationsCardProps {
    title: string;
    id: number;
    setApps: Dispatch<SetStateAction<string[]>>;
    apps: string[];
}
export default function ApplicationsCard({
    title,
    id,
    setApps,
    apps,
}: ApplicationsCardProps) {
    return (
        <li className="applicationCard bg-transparent text-white text-break list-group-item overflow-hidden ">
            <p className="p-2 m-0">{title}</p>
            <button
                className="btn text-white rounded-0 position-absolute top-0 end-0"
                style={{ marginRight: "-50px" }}
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => setApps(apps.filter((item, i) => i !== id))}
                />
            </button>
        </li>
    );
}