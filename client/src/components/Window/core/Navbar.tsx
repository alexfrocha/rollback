import { useContext, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSearch,
  IoIosSettings,
} from "react-icons/io";
import { DirectoryContext } from "../../../context/Directory";
import { ArchivesContext } from "../../../context/Archives";
import { generateRandomId } from "../../utils/id";

export default function Navbar() {
  const [directory, setDirectory] = useContext(DirectoryContext);
  const [last_folder, setLastFolder] = useState<Object | undefined>("");
  const [archives, setArchives] = useContext(ArchivesContext);

  const move_back = () => {
    let new_dir = [...directory];
    if (new_dir.length == 1) return;
    setLastFolder(new_dir.pop());
    setDirectory(new_dir);
  };

  const move_forward = () => {
    let new_dir = [...directory];
    if (last_folder) {
      new_dir.push(last_folder);
    }
    setLastFolder("");
    setDirectory(new_dir);
  };

  const new_archive = (type: string) => {
    let archive = {
      name: "",
      size: 40,
      id: generateRandomId(),
      type,
    };
    setArchives([...archives, archive]);
  };


  return (
    <div className="border-b p-2 border-zinc-300 w-full max-h-[50px]">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center w-[72%] flex-row gap-3">
          <div className="flex flex-row gap-3">
            <div
              onClick={move_back}
              className="cursor-pointer hover:opacity-80 duration-200"
            >
              <IoIosArrowBack color="gray" size={20} />
            </div>
            <div
              onClick={move_forward}
              className="cursor-pointer hover:opacity-80 duration-200"
            >
              <IoIosArrowForward color="gray" size={20} />
            </div>
          </div>
          <span className="font-mono text-[12px] text-nowrap text-ellipsis overflow-hidden max-w-[400px]">
            @rsk/{directory.map((dir: any) => dir.name).join("/")}
          </span>
        </div>
        <div className="flex flex-row gap-1 mr-2">
          <button
            onClick={() => {
              new_archive("folder");
            }}
            className="px-3 py-[2px] cursor-pointer hover:opacity-50 duration-200 rounded-[6px] border border-green-500 text-green-500 text-[11px]"
          >
            new folder
          </button>
          <button
            onClick={() => {
              new_archive("txt");
            }}
            className="px-3 py-[2px] cursor-pointer hover:opacity-50 duration-200 rounded-[6px] border border-green-500 text-green-500 text-[11px]"
          >
            new txt
          </button>
        </div>
      </div>
    </div>
  );
}
