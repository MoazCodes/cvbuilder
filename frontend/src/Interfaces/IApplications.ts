import React, { Dispatch, SetStateAction } from "react";
export interface TextInProps {
    name: string;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export interface ApplicationsListProps {
    title: string;
    apps: string[];
    setApps: Dispatch<SetStateAction<string[]>>;
}