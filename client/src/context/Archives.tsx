import React, { createContext, useState, ReactNode } from "react";
import { generateRandomId } from "../components/utils/id";

interface DirectoryProviderProps {
  children: ReactNode;
}

export const ArchivesContext = createContext<
  [Object[], React.Dispatch<React.SetStateAction<Object[]>>]
>([[], () => {}]);

export default function ArchivesProvider({ children }: DirectoryProviderProps) {
  const [archives, setArchives] = useState<Object[]>([
    {
      name: "projects",
      size: 40,
      id: generateRandomId(),
      type: "folder",
    },
    {
      name: "about",
      size: 40,
      id: generateRandomId(),
      type: "txt",
    },
  ]);

  return (
    <ArchivesContext.Provider value={[archives, setArchives]}>
      {children}
    </ArchivesContext.Provider>
  );
}
