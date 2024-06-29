import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DirectoryContext } from "../../context/Directory";
import SidebarContextMenu from "../Window/core/SidebarContextMenu";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { deleteArchive, updateArchive } from "../../service/archiveService";
import { convertToRouteSlug } from "../../utils/route";

interface Props {
  name?: string;
  size?: number;
  folders: Array<any>;
  setFolders: Dispatch<SetStateAction<any>>;
  id: string | number;
}

export default function SideFolder({
  name,
  size = 24,
  folders,
  setFolders,
  id,
}: Props) {
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [directory, setDirectory] = useContext(DirectoryContext);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const closeContextMenu = () => setContextMenu(initialContextMenu);
  const [folderName, setFolderName] = useState(name || "");
  const [nameInput, setNameInput] = useState(folderName || "new folder");
  const [route, setRoute] = useState("");

  const [dir, setDir] = useContext(DirectoryContext);

  useEffect(() => {
    setRoute(folderName?.split(" ").join("-"));
  }, [folderName]);

  const move_to_route = () => {
    let new_dir = [
      {
        name: convertToRouteSlug(folderName),
        id: String(id),
      },
    ];
    setDir(new_dir);
  };

  const rename_folder = (e: MouseEvent) => {
    e.stopPropagation();
    setFolderName("");
    closeContextMenu();
  };

  useOnClickOutside(nameInputRef, async (e: any) => {
    setFolderName(nameInput.trim());
    await updateArchive(`${id}`, {
      name: nameInput.trim(),
    });
  });

  const exclude_folder = async (e: MouseEvent) => {
    e.stopPropagation(); // Impede a propagação do clique
    let new_folders = folders.filter((folder) => folder.id != id);
    setFolders(new_folders);
    await deleteArchive(`${id}`);
    move_back();
    closeContextMenu();
  };

  const move_back = () => {
    let new_dir = [...directory];
    // if (new_dir.length == 1) return;
    new_dir.pop();
    setDirectory(new_dir);
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenu({
      show: true,
      x: clientX,
      y: clientY,
    });
  };

  const have_this_folder_on_folders = () => {
    return folders.filter((folder) => folder.id == id).length > 0;
  };

  return (
    <div
      onClick={() => {
        if (folderName && have_this_folder_on_folders()) {
          move_to_route();
        }
      }}
      onContextMenu={handleContextMenu}
      className={`flex flex-row gap-1 ${
        directory[0]?.id == id && "bg-zinc-800/10"
      } items-center p-2 py-1 w-full gap-1 hover:cursor-pointer duration-200 hover:bg-white/30 rounded-[9px]`}
    >
      {contextMenu.show && (
        <SidebarContextMenu
          closeContextMenu={closeContextMenu}
          x={contextMenu.x - 270}
          y={contextMenu.y - 150}
          rename_folder={rename_folder}
          excludeFolder={exclude_folder}
        />
      )}

      <img
        alt={`a ${name} folder in rollback-js.com`}
        src={"/image/folder-icon.png"}
        width={size}
        height={size}
      />

      {!folderName ? (
        <input
          spellCheck={false}
          ref={nameInputRef}
          type="text"
          value={nameInput}
          className="text-[12px] font-mono w-[80%] bg-transparent outline-none border-none"
          autoFocus
          onChange={(e) => setNameInput(e.target.value)}
        />
      ) : (
        <span
          spellCheck={false}
          className="text-[12px] font-mono text-nowrap text-ellipsis overflow-hidden w-[80%]"
        >
          {folderName}
        </span>
      )}
    </div>
  );
}
