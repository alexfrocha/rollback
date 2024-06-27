import { useContext } from "react";
import { TxtArchiveContext } from "../../../context/TxtArchive";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function Content({ content, setContent }: Props) {
  const [txt, setTxt] = useContext(TxtArchiveContext);
  return (
    <textarea
      spellCheck={false}
      autoFocus
      value={content || ""}
      onChange={(e) => {
        setContent(String(e.target.value));
      }}
      className="h-full resize-none outline-none bg-none m-3"
      name=""
      id=""
    ></textarea>
  );
}
