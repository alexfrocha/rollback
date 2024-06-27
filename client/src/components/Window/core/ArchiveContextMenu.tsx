import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface Props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  rename_archive: (e: any) => void;
  excludeArchives: (e: any) => void;
}

export default function ArchiveContextMenu({
  x,
  y,
  closeContextMenu,
  rename_archive,
  excludeArchives,
}: Props) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);
  return (
    <div
      ref={contextMenuRef}
      onClick={closeContextMenu}
      style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
      className=" z-20 p-1 flex flex-col w-[10%] border border-zinc-200 shadow-sm bg-white rounded-[8px]"
    >
      <button onClick={rename_archive}>
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center">Rename</span>
        </div>
      </button>
      <button onClick={excludeArchives}>
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center text-red-500">Exclude</span>
        </div>
      </button>
    </div>
  );
}
