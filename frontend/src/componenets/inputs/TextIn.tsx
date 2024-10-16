import { TextInProps } from "../../Interfaces/IApplications";
import styles from "./TextIn.module.css";

export default function TextIn({ name, onKeyDown }: TextInProps) {
  return (
      <input
        type="text"
        className={`form-control ${styles["bg-white"]}`}
        name={name}
        onKeyDown={onKeyDown}                                          
      />
  );
}
