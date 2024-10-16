export interface AppsObj {
  title: string;
  id?: string;
}

export interface TextInProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ApplicationsListProps {
  title: string;
  apps: AppsObj[];
}
