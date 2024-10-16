import { AppsObj } from "../../Interfaces/IApplications";

export default function ApplicationsCard({ title }: AppsObj) {
  return <li className="list-group-item my-1">{title}</li>;
}
