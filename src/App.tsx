import { useState } from "react";
import { FolderSelect } from "./components/FolderSelect";
import { FolderTree } from "./components/FolderTree";
import { PictureWall } from "./components/PictureWall";

import "./App.css";

type PageState = {
  /**
   * 当前选择的文件夹
   */
  dirctoryHandle: Promise<FileSystemDirectoryHandle> | null;
  /**
   * 当前选择的文件夹下面的子文件夹
   */
  childDirectoryHanldes: FileSystemDirectoryHandle[];

  /**
   * 当前选择文件夹下的文件
   */
  fileHandles: File[];
};

const defaultPageState: PageState = {
  dirctoryHandle: null,
  childDirectoryHanldes: [],
  fileHandles: [],
};

function App() {
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  const handleSelectDir = async (
    dirHandle: Promise<FileSystemDirectoryHandle>
  ) => {
    const _pageState: PageState = {
      dirctoryHandle: dirHandle,
      fileHandles: [],
      childDirectoryHanldes: [],
    };

    for await (const entry of (await dirHandle).values()) {
      if (entry.kind === "directory") {
        _pageState.childDirectoryHanldes.push(entry);
      } else if (entry.kind === "file") {
        const file = await entry.getFile();
        if (file.type.startsWith("image")) {
          _pageState.fileHandles.push(file);
        }
      }
    }

    setPageState(_pageState);
  };

  return (
    <>
      {!pageState.dirctoryHandle ? (
        <FolderSelect onSelect={handleSelectDir} />
      ) : (
        <div className="picture-view-wrap">
          <div className="tree-wrap">
            <FolderTree folders={pageState.childDirectoryHanldes} />
          </div>
          <div className="content-wrap">
          <PictureWall pictureList={pageState.fileHandles} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
