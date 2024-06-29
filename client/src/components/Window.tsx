import React, { useContext, useEffect, useState } from "react";
import Folder from "./core/Archive";
import Content from "./Window/core/Content";
import Sidebar from "./Window/core/Sidebar";
import Navbar from "./Window/core/Navbar";
import { DirectoryContext } from "../context/Directory";
import Editor from "./Editor";
import { ArchiveProps } from "../interfaces/core";
import {
  getAllArchivesByFolderId,
  getSourceFolderByUserId,
} from "../service/archiveService";
import { ArchivesContext } from "../context/Archives";
import { useCookies } from "react-cookie";

interface Props {
  children?: React.ReactNode;
}

export default function Window({ children }: Props) {
  const [archives, setArchives] = useContext(ArchivesContext);
  const [folders, setFolders] = useState<ArchiveProps[]>([]);
  const [directory, setDirectory] = useContext(DirectoryContext)
  const [cookies, setCookie] = useCookies(['user'])
  

  useEffect(() => {
    async function getData() {
      let responseSourceFolders = await getSourceFolderByUserId(cookies.user);
      setFolders(responseSourceFolders);
    }
    getData();
  }, []);


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

  useEffect(() => {
    // console.log(archives);
  }, [archives]);

  return (
    <div className="w-[60%] h-[60%] shadow-md shadow-black/20 flex rounded-[3px]">
      <Sidebar folders={folders} setFolders={setFolders} />
      <div className="bg-white w-[75%] flex flex-col rounded-r-[8px]">
        <Navbar />
        <Content archives={archives} setArchives={setArchives} />
      </div>
    </div>
  );
}
