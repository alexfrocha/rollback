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
import { useCookies } from "react-cookie";
import Account from "./components/Account";
import { getUserById } from "./service/userService";

function App() {
  const [actualTxtFile, setActualTxtFile] = useContext(TxtArchiveContext);
  const [archives, setArchives] = useContext(ArchivesContext);
  const [directory, setDirectory] = useContext(DirectoryContext);
  const [alert, setAlert] = useContext(AlertContext)
  const [isRealAuth, setIsRealAuth] = useState<boolean>(false)
  const [cookies, setCookie] = useCookies(['user'])

  useEffect(() => {
    async function getData() {
      let possibleUser = await getUserById({id: cookies.user}) || {}
      if(possibleUser?.password) return setIsRealAuth(true)
      return setIsRealAuth(false)
    }
    getData()
  }, [cookies.user])

  return (
    <div className="bg-image-background flex justify-center items-center object-cover bg-cover bg-center h-screen">
      {isRealAuth && (
        <>
          <Window />
          {actualTxtFile.id && <Editor />}
        </>
      )}
      {!isRealAuth && (
        <Account />
      )}
      {alert && <Alert />}
    </div>
  );
}

export default App;
