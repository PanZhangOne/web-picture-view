import { useState } from "react";
import { FolderSelect } from "./components/FolderSelect";

import "./App.css";
import { Folder } from "./model/Folder";
import { AppContent } from "./components/AppContent";

/**
 * 处理逻辑为:
 *
 * 左侧显示目录树, 右侧显示选中目录及其子目录下的所有文件
 */

export type PageState = {
  /**
   * 允许访问的文件夹
   */
  folders: Folder[];

  /**
   * 当前选中的文件夹
   */
  selectedFolder: Folder | undefined;
};

const defaultPageState: PageState = {
  folders: [],
  selectedFolder: undefined,
};

function App() {
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  const handleSelectDir = async (
    dirHandle: Promise<FileSystemDirectoryHandle>
  ) => {
    const _pageState: PageState = {
      folders: [],
      selectedFolder: undefined,
    };

    const rootFolder = new Folder((await dirHandle).name, dirHandle, []);
    for await (const entry of (await dirHandle).values()) {
      if (entry.kind === "directory") {
        // 处理文件夹数据
        rootFolder.children?.push(
          new Folder(entry.name, Promise.resolve(entry))
        );
      }
    }
    _pageState.selectedFolder = rootFolder;
    _pageState.folders = [rootFolder];
    setPageState(_pageState);
  };

  const hasFolders = pageState.folders.length > 0;

  return (
    <>
      {!hasFolders ? (
        <FolderSelect onSelect={handleSelectDir} />
      ) : (
        <AppContent pageState={pageState} setPageState={setPageState} />
      )}
    </>
  );
}

export default App;
