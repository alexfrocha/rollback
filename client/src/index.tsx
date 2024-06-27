import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DirectoryProvider from "./context/Directory";
import TxtArchiveProvider from "./context/TxtArchive";
import ArchivesProvider from "./context/Archives";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <DirectoryProvider>
    <TxtArchiveProvider>
      <ArchivesProvider>
        <App />
      </ArchivesProvider>
    </TxtArchiveProvider>
  </DirectoryProvider>
  // </React.StrictMode>,
);
