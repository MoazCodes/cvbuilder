import React from "react";

export interface AppsObj {
  title: string;
  id?: string;
  category?: string;
}

export interface TextInProps {
  name: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface ApplicationsListProps {
  title: string;
  apps: AppsObj[] | [];
}
