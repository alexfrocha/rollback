import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface Props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  createArchive: (e?: any) => void;
}

export default function ContentContextMenu({
  x,
  y,
  closeContextMenu,
  createArchive,
}: Props) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);
  return (
    <div
      id="maincontentmenu"
      ref={contextMenuRef}
      onClick={closeContextMenu}
      style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
      className=" z-20 p-1 flex flex-col w-[15%] border border-zinc-200 shadow-sm bg-white rounded-[8px]"
    >
      <button
        onClick={() => {
          createArchive("folder");
        }}
      >
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center">Create a folder</span>
        </div>
      </button>
      <button
        onClick={() => {
          createArchive("txt");
        }}
      >
        <div
          className={`flex flex-row gap-1 items-center pr-10 pl-4 py-1 w-full hover:cursor-pointer duration-200 hover:bg-zinc-100 rounded-[9px]`}
        >
          <span className="text-[14px] text-center ">Create a .txt file</span>
        </div>
      </button>
    </div>
  );
}
