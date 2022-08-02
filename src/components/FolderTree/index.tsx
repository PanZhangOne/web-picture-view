import { Tree } from "@douyinfe/semi-ui";
import { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { useEffect } from "react";
import { useState } from "react";
import { Folder } from "../../interfaces/Folder";
import { IconFolder } from "@douyinfe/semi-icons";

interface FolderTreeProps {

  /**
   * 文件夹列表
   */
  folders?: Folder[];

  /**
   * 选择某个文件夹后处理方法
   */
  onSelect?: (folder: Folder) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  onSelect,
}) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>();

  const initTreeData = (_folders: Folder[]) => {
    const _treeData: TreeNodeData[] = [];

    const _processFolderData = (folder: Folder): TreeNodeData => {
      const _treeItem: TreeNodeData = {
        label: folder.name,
        value: folder.name,
        children: [],
        key: folder.name,
        icon: <IconFolder />,
      };
      if (folder.children && folder.children.length) {
        folder.children.forEach((i) => {
          _treeItem.children?.push(_processFolderData(i));
        });
      }
      return _treeItem;
    };

    _folders.forEach((item) => {
      _treeData.push(_processFolderData(item));
    });

    setTreeData(_treeData);
  };

  useEffect(() => {
    if (folders) {
      initTreeData(folders);
    }
  }, [folders]);

  const handleChangeFolder = (folderValue: string) => {
    const _findFolderWithName = (folderName: string): Folder | null => {
      let result: Folder | null = null;
      const _finder = (folder: Folder) => {
        if (folder.name === folderName) {
          result = folder;
          return;
        }
        if (folder.children && folder.children) {
          folder.children.forEach(_finder);
        }
      };

      folders?.forEach(_finder);
      return result;
    };

    const currentFolder = _findFolderWithName(folderValue);
    if (currentFolder && onSelect) {
      onSelect(currentFolder);
    }
  };

  return (
    <Tree
      directory
      treeData={treeData}
      expandAll
      onChange={(evt) => handleChangeFolder(evt as string)}
    />
  );
};
