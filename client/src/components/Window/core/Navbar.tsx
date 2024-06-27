import { useContext, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSearch,
  IoIosSettings,
} from "react-icons/io";
import { DirectoryContext } from "../../../context/Directory";
import { ArchivesContext } from "../../../context/Archives";
import { generateRandomId } from "../../../utils/id";
import { ArchiveNameAndIdProps, ArchiveProps } from "../../../interfaces/core";
import { createArchive } from "../../../service/archiveService";
import { convertToRouteSlug } from "../../../utils/route";

export default function Navbar() {
  const [directory, setDirectory] = useContext(DirectoryContext);
  const [last_folder, setLastFolder] = useState<ArchiveNameAndIdProps | null>();
  const [archives, setArchives] = useContext(ArchivesContext);

  const move_back = () => {
    let new_dir = [...directory];
    // if (new_dir.length == 1) return;
    setLastFolder(new_dir.pop());
    setDirectory(new_dir);
  };

  const move_forward = () => {
    let new_dir = [...directory];
    if (last_folder) {
      new_dir.push(last_folder);
    }
    setLastFolder(null);
    setDirectory(new_dir);
  };

  const new_archive = async (typeraw: string) => {
    let archive: ArchiveProps = {
      name: "",
      type: typeraw,
      content: "",
      folderId: directory[directory.length - 1]?.id,
      userId: "123",
    };
    let { name, type, content, folderId, userId } = archive;
    let responseArchive = await createArchive({
      name,
      type,
      content,
      folderId,
      userId,
    }).then((response) => {
      archive.id = response.id;
      setArchives([...archives, archive]);
    });
  };

  return (
    <div className="border-b p-2 border-zinc-300 w-full">
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
            @rsk/
            {directory
              .map((dir: any) => convertToRouteSlug(dir.name))
              .join("/")}
          </span>
        </div>
        {directory.length > 0 && (
          <div className="flex flex-row md:w-[36%] justify-end gap-1 mr-2">
            <button
              onClick={() => {
                new_archive("folder");
              }}
              className="px-3 xl:py-[2px] cursor-pointer hover:opacity-50 duration-200 rounded-[6px] border border-green-500 text-green-500 text-[11px]"
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
        )}
      </div>
    </div>
  );
}
