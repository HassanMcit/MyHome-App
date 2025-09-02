import type { ReactNode } from "react";

export type Inputs = {
  email: string;
  password: string;
};

export type DataResolved = {
  message: string;
  token: string;
};

export type UserDataType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export type TypeChildren = {
  children: ReactNode;
};

export type Root = {
  message: string;
  user: User;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  createdAt: string;
};
