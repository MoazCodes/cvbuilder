import { TextInProps } from "../../interfaces";

export default function TextIn({ name, onChange }: TextInProps) {
  return (
    <input
      type="text"
      className="form-control"
      name={name}
      onChange={onChange}
    />
  );
}
