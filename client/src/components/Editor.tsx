import { IoIosClose } from "react-icons/io";
import Navbar from "./Editor/core/Navbar";
import Content from "./Editor/core/Content";
import SaveButton from "./Editor/core/SaveButton";
import { useContext, useState } from "react";
import { TxtArchiveContext } from "../context/TxtArchive";
import { ArchivesContext } from "../context/Archives";

export default function Editor() {
  const [txt, setTxt] = useContext(TxtArchiveContext);
  const [content, setContent] = useState<string>(txt.content);
  const [archives, setArchives] = useContext(ArchivesContext);
  return (
    <div draggable className="w-[50%] absolute z-10 h-[70%] ">
      <div className="relative border border-zinc-300 flex flex-col h-full bg-white shadow-lg shadow-black/30 rounded-[7px]">
        <Navbar content={content} />
        <Content content={content} setContent={setContent} />
        <SaveButton
          content={content}
          archives={archives}
          setArchives={setArchives}
        />
      </div>
    </div>
  );
}
