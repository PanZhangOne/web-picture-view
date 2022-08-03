import { PageState } from "../../App";
import { FolderTree } from "../FolderTree";
import { PictureWall } from "../PictureWall";

import "./style.css";

interface AppContentProps {
  pageState: PageState;

  setPageState: (pageState: PageState) => void;
}

export const AppContent: React.FC<AppContentProps> = ({
  pageState,
  setPageState,
}) => {
  return (
    <div className="picture-view-wrap">
      <div className="tree-wrap">
        <FolderTree
          folders={pageState.folders}
          onSelect={(folder) => {
            setPageState({ ...pageState, selectedFolder: folder });
          }}
        />
      </div>
      <div className="content-wrap">
        <PictureWall folder={pageState.selectedFolder} />
      </div>
    </div>
  );
};
