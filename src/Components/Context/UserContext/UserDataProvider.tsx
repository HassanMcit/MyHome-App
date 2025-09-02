import { createContext, useState, type ReactNode } from "react";

type UserDataType = {
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserDataShared = createContext<UserDataType | null>(null);

export default function UserDataProvider({children}:{children: ReactNode}) {

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));


  return <UserDataShared.Provider value={{ token, setToken }}>
    {children}
  </UserDataShared.Provider>;
}
