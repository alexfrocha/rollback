import React, { createContext, useState, ReactNode } from "react";
import { ArchiveProps } from "../interfaces/core";

interface TxtArchiveProviderProps {
  children: ReactNode;
}

export const TxtArchiveContext = createContext<
  [ArchiveProps, React.Dispatch<React.SetStateAction<ArchiveProps>>]
>([
  {
    name: "",
    content: "",
    folderId: "",
    type: "",
    userId: "",
  },
  () => {},
]);

export default function TxtArchiveProvider({
  children,
}: TxtArchiveProviderProps) {
  const [txt, setTxt] = useState<ArchiveProps>({
    name: "",
    content: "",
    folderId: "",
    type: "",
    userId: "",
  });

  return (
    <TxtArchiveContext.Provider value={[txt, setTxt]}>
      {children}
    </TxtArchiveContext.Provider>
  );
}
