import React, { createContext, useState, ReactNode, useEffect } from "react";
import { generateRandomId } from "../utils/id";
import { ArchiveProps } from "../interfaces/core";
import { getAllArchivesByFolderId } from "../service/archiveService";

interface DirectoryProviderProps {
  children: ReactNode;
}

export const ArchivesContext = createContext<
  [ArchiveProps[], React.Dispatch<React.SetStateAction<ArchiveProps[]>>]
>([[], () => {}]);

export default function ArchivesProvider({ children }: DirectoryProviderProps) {
  const [archives, setArchives] = useState<ArchiveProps[]>([]);
  return (
    <ArchivesContext.Provider value={[archives, setArchives]}>
      {children}
    </ArchivesContext.Provider>
  );
}
