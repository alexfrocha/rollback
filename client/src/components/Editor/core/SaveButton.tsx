import { useContext } from "react";
import { TxtArchiveContext } from "../../../context/TxtArchive";
import { updateArchive } from "../../../service/archiveService";
import { updateArrayById } from "../../../utils/array";
import { ArchivesContext } from "../../../context/Archives";

export default function SaveButton({
  content,
  archives,
  setArchives,
}: {
  content: string;
  archives: any;
  setArchives: any;
}) {
  const [txt, setTxt] = useContext(TxtArchiveContext);

  async function saveContent() {
    let new_archives = updateArrayById(archives, txt.id!, { content });
    setTxt({ ...txt, content });
    setArchives(new_archives);

    await updateArchive(txt.id!, {
      content,
      name: txt.name,
    });
  }

  if (content == txt.content) return null;

  return (
    <div
      onClick={saveContent}
      className="py-1 px-4 text-[15px] border bg-white border-zinc-200 right-12 top-0 h-fit font-extrabold font-mono absolute bottom-3  rounded-[7px] cursor-pointer  hover:opacity-30 duration-200"
    >
      save
    </div>
  );
}
