import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { generateRandomId } from "../utils/id";
import { ArchivesContext } from "./Archives";
import { getAllArchivesByFolderId } from "../service/archiveService";
import { ArchiveNameAndIdProps } from "../interfaces/core";
// import { ArchiveProps } from "../interfaces/core";

interface DirectoryProviderProps {
  children: ReactNode;
}

export const DirectoryContext = createContext<
  [
    ArchiveNameAndIdProps[],
    React.Dispatch<React.SetStateAction<ArchiveNameAndIdProps[]>>
  ]
>([[], () => {}]);

export default function DirectoryProvider({
  children,
}: DirectoryProviderProps) {
  const [directory, setDirectory] = useState<ArchiveNameAndIdProps[]>([]);

  return (
    <DirectoryContext.Provider value={[directory, setDirectory]}>
      {children}
    </DirectoryContext.Provider>
  );
}
