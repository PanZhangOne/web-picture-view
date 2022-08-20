import React from "react";
import { Card, Typography, Toast } from "@douyinfe/semi-ui";

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

  const stopDrafEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrag = async (e: React.DragEvent<HTMLDivElement>) => {
    stopDrafEvent(e);

    let dirHandleList: Promise<FileSystemDirectoryHandle>[] = [];

    for (const item of e.dataTransfer.items) {
      if (
        item.getAsFileSystemHandle() !== null &&
        item.webkitGetAsEntry()?.isDirectory
      ) {
        dirHandleList.push(
          item.getAsFileSystemHandle() as Promise<FileSystemDirectoryHandle>
        );
      }
    }

    if (dirHandleList.length === 0) {
      Toast.warning({ content: "未选择文件夹" });
      return;
    }
    if (dirHandleList.length > 1) {
      Toast.warning({ content: "当前只允许查看一个根目录下的所有图片" });
      return;
    }

    if (onSelect) {
      onSelect(dirHandleList[0]);
    }
  };

  return (
    <div
      className="folder-select-wrap"
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <Card className="card-wrap" shadows="hover">
        <div
          draggable
          className="folder-select"
          onDrop={handleDrag}
          onDragEnter={stopDrafEvent}
          onDragOver={stopDrafEvent}
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
