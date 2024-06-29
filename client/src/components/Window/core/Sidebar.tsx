import React, { MouseEvent, useContext, useRef, useState } from "react";
import SideFolder from "../../core/SideFolder";
import { generateRandomId } from "../../../utils/id";
import { ArchiveProps } from "../../../interfaces/core";
import { createArchive } from "../../../service/archiveService";
import { useCookies } from "react-cookie";
import { DirectoryContext } from "../../../context/Directory";

interface Props {
  folders: ArchiveProps[];
  setFolders: React.Dispatch<React.SetStateAction<ArchiveProps[]>>;
}

export default function Sidebar({ folders, setFolders }: Props) {
  const [cookies, setCookie] = useCookies(['user'])
  const [directory, setDirectory] = useContext(DirectoryContext)
  const handle_create_folder = async () => {
    let new_folders = [...folders];
    let new_folder: ArchiveProps = {
      name: "new folder",
      // id: generateRandomId(),
      content: "",
      folderId: "source",
      userId: cookies.user,
      type: "folder",
    };

    let { name, folderId, content, type, userId } = new_folder;

    let responseArchive = await createArchive({
      name,
      type,
      content,
      folderId,
      userId,
    }).then((response) => {
      new_folder.id = response.id;
      new_folders.push(new_folder);
      setFolders(new_folders);
    });
  };

  const log_out = () => {
    setCookie('user', '')
    setDirectory([])
  }

  return (
    <div className="bg-zinc-200/80 flex flex-col w-[25%] h-full rounded-l-[8px] backdrop-blur-[10px] filter">
      <div className="p-3 flex flex-col overflow-auto h-[80%]  ">
        {folders.map((folder) => (
          <SideFolder
            folders={folders}
            setFolders={setFolders}
            key={folder.id}
            name={folder.name}
            size={20}
            id={folder.id!}
          />
        ))}
      </div>
      <div
        onClick={handle_create_folder}
        className="mt-auto m-3 text-[12px] text-center cursor-pointer hover:opacity-40 duration-200 font-mono text-green-800 border border-green-800 rounded-[9px]  py-[4px]"
      >
        {"<new folder />"}
      </div>
      <div
        onClick={log_out}
        className="m-3 -mt-2 text-[12px] text-center cursor-pointer hover:opacity-40 duration-200 font-mono text-white border-[2px] border-black bg-black rounded-[9px]  py-[4px]"
      >
        {"<log out />"}
      </div>
    </div>
  );
}
