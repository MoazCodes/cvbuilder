import { AppsObj } from "../../Interfaces/IApplications";
// import { MdDeleteForever } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { useContext, useState } from "react";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import styles from "../inputs/TextIn.module.css";
import { faker } from "@faker-js/faker";
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
      const newApps = prev.filter((e) => e.id != id);
      return newApps;
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
      appsContext?.setAllApps((prev) => {
        const allApps = [
          ...prev,
          {
            category: title,
            id: faker.string.uuid(),
            title,
          },
        ];
        return allApps;
      });
      setEditField(false);
    } else if (e.key === "Escape") {
      setEditField(false);
    }
  };
  return (
    <li className="  border list-unstyled p-4 d-flex justify-content-between text-break">
      <div className="w-75">
        {editField ? (
          <input
            type="text"
            className={`form-control ${styles["bg-white"]}`}
            onKeyDown={onKeyDown}
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
          />
        ) : (
          title
        )}
      </div>
      <div className="d-flex w-25 justify-content-around align-items-center">
        <button
          className="btn btn-danger  w-fitContent "
          onClick={(e) => handleDelete(id)}
          style={{maxHeight:"38px"}}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </button>
        <button
          className="btn bg-warning  w-fitContent"
          onClick={() => setEditField(true)}
          style={{maxHeight:"38px"}}
        >
          <FontAwesomeIcon icon={faEdit} className="text-white"/>
        </button>
      </div>
    </li>
  );
}
