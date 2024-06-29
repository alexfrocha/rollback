import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Window from "./components/Window";
import Editor from "./components/Editor";
import TxtArchiveProvider, { TxtArchiveContext } from "./context/TxtArchive";
import { ArchivesContext } from "./context/Archives";
import { DirectoryContext } from "./context/Directory";
// import { getAllArchives } from "./service/archiveService";
import axios from "axios";
import { getAllArchivesByFolderId } from "./service/archiveService";
import Alert from "./components/Alert";
import { AlertContext } from "./context/Alert";

function App() {
  const [actualTxtFile, setActualTxtFile] = useContext(TxtArchiveContext);
  const [archives, setArchives] = useContext(ArchivesContext);
  const [directory, setDirectory] = useContext(DirectoryContext);
  const [alert, setAlert] = useContext(AlertContext)

  useEffect(() => {
    async function getData() {
      setArchives([]);
      if (directory.length > 0) {
        let responseArchives = await getAllArchivesByFolderId(
          directory[directory.length - 1]?.id
        );
        setArchives(responseArchives);
      }
    }
    getData();
  }, [directory]);

  // useEffect(() => {
  // if (actualTxtFile) console.log(actualTxtFile);
  // }, [actualTxtFile]);

  return (
    <div className="bg-image-background flex justify-center items-center object-cover bg-cover bg-center h-screen">
      <Window />
      {actualTxtFile.id && <Editor />}
      {alert && <Alert />}
    </div>
  );
}

export default App;
