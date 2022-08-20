import { PageState } from "../../App";
import { FolderTree } from "../FolderTree";
import { PictureWall } from "../PictureWall";
import styles from "./style.module.css";

interface AppContentProps {
  pageState: PageState;

  setPageState: (pageState: PageState) => void;

  onSelect?: (dirHandle: Promise<FileSystemDirectoryHandle>) => void;
}

export const AppContent: React.FC<AppContentProps> = ({
  pageState,
  setPageState,
}) => {
  return (
    <div className={`${styles.pictureViewWrap}`}>
      <div className={`${styles.treeWrap}`}>
        <FolderTree
          folders={pageState.folders}
          onSelect={(folder) => {
            setPageState({ ...pageState, selectedFolder: folder });
          }}
        />
      </div>
      <div className={`${styles.contentWrap}`}>
        <PictureWall folder={pageState.selectedFolder} />
      </div>
    </div>
  );
};
