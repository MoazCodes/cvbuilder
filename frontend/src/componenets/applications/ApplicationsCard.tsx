import { AppsObj } from "../../Interfaces/IApplications";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { ApplicationsContextType } from "../../Interfaces/ApplicationsContextType";
import { useContext, useState } from "react";
import { ApplicationsContext } from "../../Context/ApplicationsContext";
import styles from "../inputs/TextIn.module.css";
import { faker } from "@faker-js/faker";

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
    <li className="my-1 row justify-content-between w-full bg-white text-black p-2 rounded-3 align-items-center">
      <div className="col-7">
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
      <div className="col-5 row gap-2">
        <button
          className="btn btn-danger col"
          onClick={(e) => handleDelete(id)}
        >
          <MdDeleteForever aria-label="Delete" />
        </button>
        <button
          className="btn bg-warning col"
          onClick={() => setEditField(true)}
        >
          <FaRegEdit aria-label="Edit" />
        </button>
      </div>
    </li>
  );
}
