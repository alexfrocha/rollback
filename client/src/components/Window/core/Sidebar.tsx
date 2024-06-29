import React, { MouseEvent, useRef, useState } from "react";
import SideFolder from "../../core/SideFolder";
import { generateRandomId } from "../../../utils/id";
import { ArchiveProps } from "../../../interfaces/core";
import { createArchive } from "../../../service/archiveService";

interface Props {
  folders: ArchiveProps[];
  setFolders: React.Dispatch<React.SetStateAction<ArchiveProps[]>>;
}

export default function Sidebar({ folders, setFolders }: Props) {
  const handle_create_folder = async () => {
    let new_folders = [...folders];
    let new_folder: ArchiveProps = {
      name: "new folder",
      // id: generateRandomId(),
      content: "",
      folderId: "source",
      userId: "123",
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

  return (
    <div className="bg-zinc-200/80 flex flex-col w-[25%] h-full rounded-l-[8px] backdrop-blur-[10px] filter">
      <div className="p-3 flex flex-col overflow-auto h-[90%] ">
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
        className="mt-auto m-3 text-[12px] text-center cursor-pointer hover:opacity-40 duration-200 font-mono text-green-800 border border-green-800 rounded-[9px]  py-[2px]"
      >
        {"<new folder />"}
      </div>
    </div>
  );
}
