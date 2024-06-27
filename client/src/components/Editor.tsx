import { IoIosClose } from "react-icons/io";
import Navbar from "./Editor/core/Navbar";
import Content from "./Editor/core/Content";
import SaveButton from "./Editor/core/SaveButton";

export default function Editor() {
  return (
    <div draggable className="w-[50%] absolute z-10 h-[70%] ">
      <div className="relative border border-zinc-300 flex flex-col h-full bg-white shadow-lg shadow-black/30 rounded-[7px]">
        <Navbar />
        <Content />
        <SaveButton />
      </div>
    </div>
  );
}
