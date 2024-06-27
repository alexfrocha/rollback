import React, { createContext, useState, ReactNode } from "react";

interface TxtArchiveProviderProps {
  children: ReactNode;
}

export const TxtArchiveContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export default function TxtArchiveProvider({
  children,
}: TxtArchiveProviderProps) {
  const [txt, setTxt] = useState<string>("");

  return (
    <TxtArchiveContext.Provider value={[txt, setTxt]}>
      {children}
    </TxtArchiveContext.Provider>
  );
}
