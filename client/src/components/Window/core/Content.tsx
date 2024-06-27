import React, { MouseEvent, useContext, useState } from "react";
import Archive from "../../core/Archive";
import ContentContextMenu from "./ContentContextMenu";
import { ArchivesContext } from "../../../context/Archives";
import { generateRandomId } from "../../utils/id";

const Content: React.FC = () => {
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
  };

  const [archives, setArchives] = useContext(ArchivesContext);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const closeContextMenu = () => setContextMenu(initialContextMenu);

  const createArchive = (type: string) => {
    const newArchive = {
      name: "",
      size: 40,
      id: generateRandomId(),
      type,
    };
    setArchives([...archives, newArchive]);
    closeContextMenu(); // Fechar o menu após criar o arquivo
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenu({
      show: true,
      x: clientX,
      y: clientY,
    });
  };

  return (
    <div className="py-5 px-10 flex flex-row items-start overflow-auto flex-wrap gap-[60px]">
      {archives.map((archive: any) => {
        // console.log(archive.id);
        return (
          <Archive
            key={archive.id}
            id={archive.id}
            type={archive.type}
            name={archive.name}
            size={archive.size}
            setArchives={setArchives}
            archives={archives}
          />
        );
      })}

      {contextMenu.show && (
        <ContentContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          createArchive={createArchive}
          closeContextMenu={closeContextMenu}
        />
      )}
    </div>
  );
};

export default Content;
