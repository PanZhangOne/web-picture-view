import { Tree } from "@douyinfe/semi-ui";
import { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { useEffect } from "react";
import { useState } from "react";

interface FolderTreeProps {
  folders?: FileSystemDirectoryHandle[];
}

class CustomFolder {
  name: string;
  handle: FileSystemDirectoryHandle;

  constructor(name: string, handle: FileSystemDirectoryHandle) {
    this.name = name;
    this.handle = handle;
  }
}

export const FolderTree: React.FC<FolderTreeProps> = ({ folders }) => {
  const [folderTree, setFolderTree] = useState<CustomFolder[]>([]);
  const [treeData, setTreeData] = useState<TreeNodeData[]>();

  const initFolders = () => {
    const rootFolders: CustomFolder[] = [];
    folders?.forEach((folder) => {
      const customFolder = new CustomFolder(folder.name, folder);
      rootFolders.push(customFolder);
    });

    return rootFolders;
  };

  const initTreeData = (_folders: CustomFolder[]) => {
    const _treeData: TreeNodeData[] = [];
    _folders.forEach((item) => {
      _treeData.push({ label: item.name, value: item.name, key: item.name });
    });

    setTreeData(_treeData);
  };

  useEffect(() => {
    const rootFolders = initFolders();
    setFolderTree(rootFolders);
    initTreeData(rootFolders);
  }, [folders]);

  return <Tree directory treeData={treeData} />;
};
