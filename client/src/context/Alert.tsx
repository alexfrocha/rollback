import React, { createContext, useState, ReactNode } from "react";
import { ArchiveProps } from "../interfaces/core";

interface AlertProps {
  children: ReactNode;
}

export const AlertContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>([
  "",
  () => {},
]);

export default function AlertProvider({
  children,
}: AlertProps) {
    const [alert, setAlert] = useState("")
    return (
        <AlertContext.Provider value={[alert, setAlert]}>
            {children}
        </AlertContext.Provider>
    );
}
