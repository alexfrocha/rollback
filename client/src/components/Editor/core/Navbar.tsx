import { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import { TxtArchiveContext } from "../../../context/TxtArchive";

export default function Navbar() {
  const [txt, setTxt] = useContext(TxtArchiveContext);
  return (
    <div className="h-10 border-b px-2 border-zinc-300 w-full flex flex-row items-center justify-between">
      <div className="font-mono  justify-center w-full flex flex-row items-center gap-2">
        <span>star.txt</span>
        <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
      </div>
      <div
        onClick={() => setTxt("")}
        className="justify-self-end text-gray-400 cursor-pointer duration-200 hover:text-red-500"
      >
        <IoIosClose size={30} />
      </div>
    </div>
  );
}
