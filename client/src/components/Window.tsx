import React, { useContext, useEffect } from "react";
import Folder from "./core/Archive";
import Content from "./Window/core/Content";
import Sidebar from "./Window/core/Sidebar";
import Navbar from "./Window/core/Navbar";
import { DirectoryContext } from "../context/Directory";
import Editor from "./Editor";

interface Props {
  children?: React.ReactNode;
}

export default function Window({ children }: Props) {
  return (
    <div className="w-[60%] h-[60%] shadow-md shadow-black/20 flex rounded-[3px]">
      <Sidebar />
      <div className="bg-white w-[75%] flex flex-col rounded-r-[8px]">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}
