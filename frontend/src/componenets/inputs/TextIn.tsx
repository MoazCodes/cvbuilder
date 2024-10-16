import { TextInProps } from "../../Interfaces/IApplications";

export default function TextIn({ name,onKeyDown }: TextInProps) {
  return (
    <input
      type="text"
      className="form-control py-3 rounded-0"
      name={name}
      onKeyDown={onKeyDown}
    />
  );
}
