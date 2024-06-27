import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { DirectoryContext } from "../../context/Directory";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import ArchiveContextMenu from "../Window/core/ArchiveContextMenu";
import { TxtArchiveContext } from "../../context/TxtArchive";
import { generateRandomId } from "../../utils/id";
import { deleteArchive, updateArchive } from "../../service/archiveService";
import { ArchiveProps } from "../../interfaces/core";
import { updateArrayById } from "../../utils/array";

interface Props {
  name?: string;
  size?: number;
  archives: any;
  setArchives: any;
  id: string;
  type: string;
}

export default function Archive({
  name,
  size = 96,
  archives,
  setArchives,
  id,
  type,
}: Props) {
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [txt, setTxt] = useContext(TxtArchiveContext);
  const [dir, setDir] = useContext(DirectoryContext);
  const [route, setRoute] = useState("");
  const [archiveName, setArchiveName] = useState(name || "");
  const [nameInput, setNameInput] = useState(
    archiveName || (type == "folder" ? "new folder" : "new text")
  );
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const closeContextMenu = () => setContextMenu(initialContextMenu);

  useEffect(() => {
    setRoute(archiveName?.split(" ").join("-"));
  }, [archiveName]);

  const move_to_route = () => {
    let new_dir = [...dir];
    if (route)
      new_dir.push({
        name: archiveName,
        id,
      });
    setDir(new_dir);
  };

  const rename_archive = (e: MouseEvent) => {
    e.stopPropagation();
    setArchiveName("");
    closeContextMenu();
  };

  const open_txt_editor = (e?: MouseEvent) => {
    e?.stopPropagation();
    setTxt(archives.filter((archive: ArchiveProps) => archive.id == id)[0]);
    closeContextMenu();
  };

  useOnClickOutside(nameInputRef, async (e: any) => {
    setArchiveName(nameInput);
    let new_archives = updateArrayById(archives, id, { name: nameInput });
    let archiveIndex = archives.findIndex(
      (item: ArchiveProps) => item.id == id
    );
    setArchives(new_archives);
    await updateArchive(`${id}`, {
      name: nameInput.trim(),
      content: archives[archiveIndex]["content"],
    });
  });

  const exclude_archive = async (e: MouseEvent) => {
    e.stopPropagation(); // Impede a propagação do clique
    let new_archives = archives.filter((archive: any) => archive.id != id);
    setArchives(new_archives);
    await deleteArchive(`${id}`);
    closeContextMenu();
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({
      show: true,
      x: pageX,
      y: pageY,
    });
    document.getElementById("maincontentmenu")?.classList.add("hidden");
  };

  const have_this_archive_on_archives = () => {
    return archives.filter((archive: any) => archive.id == id).length > 0;
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{ maxWidth: size, height: size * 1.5 }}
      className={`flex flex-col items-center justify-center  w-fit hover:cursor-pointer duration-200 hover:opacity-80`}
    >
      {contextMenu.show && (
        <ArchiveContextMenu
          closeContextMenu={closeContextMenu}
          x={contextMenu.x + 10}
          y={contextMenu.y + 10}
          rename_archive={rename_archive}
          excludeArchives={exclude_archive}
        />
      )}

      {type == "folder" && (
        <>
          <img
            alt={`a ${name} folder in rollback-js.com`}
            src={"/image/folder.png"}
            onClick={() => {
              if (type == "folder") move_to_route();
            }}
            width={size}
            height={size}
          />
          {!archiveName ? (
            <input
              spellCheck={false}
              ref={nameInputRef}
              type="text"
              value={nameInput}
              className="text-[14px] font-mono w-[200%] text-center bg-transparent outline-none border-none"
              autoFocus
              onChange={(e) => setNameInput(e.target.value)}
            />
          ) : (
            <span
              spellCheck={false}
              style={{ maxWidth: size * 2 }}
              className="text-[15px] font-mono text-ellipsis overflow-hidden text-center text-nowrap -mt-1 font-thin"
            >
              {archiveName}
            </span>
          )}
        </>
      )}

      {type == "txt" && (
        <>
          <img
            alt={`a ${name} folder in rollback-js.com`}
            src={"/image/txt.png"}
            width={size}
            height={size}
            onClick={() => {
              if (type == "txt") {
                if (!txt.id) open_txt_editor();
              }
            }}
          />
          {!archiveName ? (
            <input
              spellCheck={false}
              ref={nameInputRef}
              type="text"
              value={nameInput}
              className="text-[14px] font-mono w-[200%] text-center bg-transparent outline-none border-none"
              autoFocus
              onChange={(e) => setNameInput(e.target.value)}
            />
          ) : (
            <span
              spellCheck={false}
              style={{ maxWidth: size * 2 }}
              className="text-[15px] font-mono text-ellipsis overflow-hidden text-center text-nowrap -mt-1 font-thin"
            >
              {archiveName}.txt
            </span>
          )}
        </>
      )}
    </div>
  );
}
