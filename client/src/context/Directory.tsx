import React, { createContext, useState, ReactNode } from "react";
import { generateRandomId } from "../components/utils/id";

interface DirectoryProviderProps {
  children: ReactNode;
}

export const DirectoryContext = createContext<
  [Object[], React.Dispatch<React.SetStateAction<Object[]>>]
>([[], () => {}]);

export default function DirectoryProvider({
  children,
}: DirectoryProviderProps) {
  const [directory, setDirectory] = useState<Object[]>([
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
    <DirectoryContext.Provider value={[directory, setDirectory]}>
      {children}
    </DirectoryContext.Provider>
  );
}
