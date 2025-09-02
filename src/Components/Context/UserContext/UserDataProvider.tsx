import { createContext, useState, type ReactNode } from "react";
import type { TypeChildren, UserDataType } from "../../../Type";

export const UserDataShared = createContext<UserDataType | null>(null);

export default function UserDataProvider({ children }: TypeChildren) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState<true | false>(true);
  return (
    <UserDataShared.Provider value={{ token, setToken, loading, setLoading }}>
      {children}
    </UserDataShared.Provider>
  );
}
