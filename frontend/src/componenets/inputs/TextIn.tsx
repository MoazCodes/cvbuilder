import { TextInProps } from "../../Interfaces/IApplications";
import styles from "./TextIn.module.css";

export default function TextIn({ name, onKeyDown }: TextInProps) {
  return (
      <input
        type="text"
        className={`form-control bg-transparent py-3`}
        name={name}
        onKeyDown={onKeyDown}                                          
      />
  );
}
