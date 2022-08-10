import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { IconClose, IconArrowLeft, IconArrowRight } from "@douyinfe/semi-icons";
import styles from "./style.module.css";

interface PreviewsProps {
  src: string[];
  currentIndex?: number;
  backgroudStyle?: CSSProperties;
  closeOnClickMask?: boolean;
  disableScroll?: boolean;
  onClose?: () => void;
}

export const Previews: React.FC<PreviewsProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(
    props.currentIndex as number
  );

  const changeImage = useCallback(
    (delta: number) => {
      let nextIndex = (currentIndex + delta) % props.src.length;
      if (nextIndex < 0) nextIndex = props.src.length - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!event.target || !props.closeOnClickMask) {
        return;
      }
      const checkId = event.currentTarget.id === "PreviewViewer";
      const checkClass = event.currentTarget.classList.contains(
        "preview-viewer__slide"
      );

      if (checkId || checkClass) {
        event.stopPropagation();
        props.onClose?.();
      }
    },
    [props.onClose]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose?.();
      }
      if (["ArrowLeft", "h"].includes(event.key)) {
        changeImage(-1);
      }
      if (["ArrowRight", "l"].includes(event.key)) {
        changeImage(1);
      }
    },
    [props.onClose, changeImage]
  );

  const handleWheel = useCallback((event: WheelEvent) => {}, [changeImage]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (!props.disableScroll) {
      document.addEventListener("wheel", handleWheel);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (!props.disableScroll) {
        document.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleKeyDown, handleWheel]);

  return (
    <div
      id="PreviewViewer"
      className={`${styles.wrapper} preview-viewer__slide`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={props.backgroudStyle}
    >
      <span
        className={`${styles.close}`}
        onClick={() => props.onClose?.()}
      >
        <IconClose size="extra-large"   />
      </span>

      {props.src.length > 1 && (
        <span
          className={`${styles.navigation} ${styles.prev}`}
          onClick={() => changeImage(-1)}
        >
          <IconArrowLeft size="extra-large" />
        </span>
      )}

      {props.src.length > 1 && (
        <span
          className={`${styles.navigation} ${styles.next}`}
          onClick={() => changeImage(1)}
        >
          <IconArrowRight size="extra-large" />
        </span>
      )}

      <div
        className={`${styles.content}`}
        onClick={handleClick}
      >
        <div className={`${styles.slide}`}>
          <img className={styles.image} src={props.src[currentIndex]} alt="" />
        </div>
      </div>
    </div>
  );
};

Previews.defaultProps = {
  closeOnClickMask: true,
  disableScroll: true,
};
