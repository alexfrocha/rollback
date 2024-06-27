import { MouseEvent, useRef, useState } from "react";
import SideFolder from "../../core/SideFolder";

export default function Sidebar() {
  const initialFolders = [
    {
      name: "desktop",
      size: 20,
      id: 1,
    },
    {
      name: "feedbacks",
      size: 20,
      id: 2,
    },
  ];

  const [folders, setFolders] = useState(initialFolders);

  const handle_create_folder = () => {
    let new_folders = [...folders];
    let new_folder = {
      name: "",
      size: 20,
      id: 3,
    };
    new_folders.push(new_folder);
    setFolders(new_folders);
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
            id={folder.id}
          />
        ))}
      </div>
      <div
        onClick={handle_create_folder}
        className="mt-auto m-3 text-center cursor-pointer hover:opacity-40 duration-200 font-mono text-green-800 border border-green-800 rounded-[9px]  py-[2px]"
      >
        {"<new folder />"}
      </div>
    </div>
  );
}
