import React from "react";
import { Card, Typography } from "@douyinfe/semi-ui";

import "./style.css";

interface FolderSelectProps {
  onSelect?: (directoryHanlde: Promise<FileSystemDirectoryHandle>) => void;
}

export const FolderSelect: React.FC<FolderSelectProps> = ({ onSelect }) => {
  const { Title } = Typography;

  const handleClick = () => {
    const dirHandle = window.showDirectoryPicker();
    if (dirHandle && onSelect) {
      onSelect(dirHandle);
    }
  };

  const handleDragDir = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);
  };

  return (
    <div
      className="folder-select-wrap"
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <Card className="card-wrap">
        <div
          className="folder-select"
          onDrag={handleDragDir}
          onClick={handleClick}
        >
          <Title heading={3} color="secondary">
            点击选择文件夹或拖拽文件夹到此处
          </Title>
        </div>
      </Card>
    </div>
  );
};
