import { AppsObj } from "../../Interfaces/IApplications";
// import { MdDeleteForever } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { useContext, useRef, useState } from "react";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import styles from "../inputs/TextIn.module.css";
import { faker } from "@faker-js/faker";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Interfaces/dndTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ApplicationsCard({ id, ...props }: AppsObj) {
    const appsContext = useContext<ApplicationsContextType | null>(
        ApplicationsContext
    );
    const [editField, setEditField] = useState<boolean>(false);
    const [title, setTitle] = useState(props.title);
    const handleDelete = (id: string | undefined) => {
        appsContext?.setAllApps((prev) => {
            const newApps = prev?.filter((e) => e.id != id);
            return newApps;
        });
    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
            appsContext?.setAllApps((prev) => {
                if (prev) {
                    const allApps = [
                        ...prev,
                        {
                            category: title,
                            id: faker.string.uuid(),
                            title,
                        },
                    ];
                    return allApps;
                }
                return prev;
            });
            setEditField(false);
        } else if (e.key === "Escape") {
            setEditField(false);
        }
    };

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.APPLICATION,
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    const ref = useRef(null);
    drag(ref);
    return (
        <li
            ref={ref}
            style={{
                opacity,
            }}
            className="  border list-unstyled p-4 d-flex justify-content-between text-break"
            onDrag={() => console.log(id)}
        >
            <div className="w-75">
                {editField ? (
                    <input
                        type="text"
                        className={`form-control ${styles["bg-white"]}`}
                        onKeyDown={onKeyDown}
                        value={title}
                        onChange={(e) =>
                            setTitle((e.target as HTMLInputElement).value)
                        }
                    />
                ) : (
                    title
                )}
            </div>
            <div className="d-flex w-25 justify-content-around align-items-center">
                <button
                    className="btn btn-danger px-2"
                    onClick={(e) => handleDelete(id)}
                    style={{ maxHeight: "38px" }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                    className="btn bg-warning px-2 "
                    onClick={() => setEditField(true)}
                    style={{ maxHeight: "38px" }}
                >
                    <FontAwesomeIcon icon={faEdit} className="text-white" />
                </button>
            </div>
        </li>
    );
}
