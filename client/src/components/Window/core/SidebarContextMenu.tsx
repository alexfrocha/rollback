import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { IoIosPerson } from "react-icons/io";

interface Props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  rename_folder: (e: any) => void;
  excludeFolder: (e: any) => void;
}

export default function SidebarContextMenu({
  x,
  y,
  closeContextMenu,
  rename_folder,
  excludeFolder,
}: Props) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);
  return (
    <div
      ref={contextMenuRef}
      onClick={closeContextMenu}
      style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
      className=" z-20 p-1 flex flex-col w-[80%] border border-zinc-200 shadow-sm bg-white rounded-[8px]"
    >
      <button onClick={rename_folder}>
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center">Rename</span>
        </div>
      </button>
      <button onClick={excludeFolder}>
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center text-red-500">Exclude</span>
        </div>
      </button>
    </div>
  );
}
