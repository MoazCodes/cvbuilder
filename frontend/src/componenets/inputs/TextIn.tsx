import { TextInProps } from "../../interfaces";

export default function TextIn({ name, onKeyDown }: TextInProps) {
    return (
        <input
            type="text"
            className="form-control my-2 py-3"
            name={name}
            onKeyDown={onKeyDown}
        />
    );
}
