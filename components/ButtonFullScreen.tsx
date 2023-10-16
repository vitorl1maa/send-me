import { CornersOut } from "@phosphor-icons/react";
import React, { useState } from "react";

export const ButtonFullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (isFullscreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const enterFullScreen = () => {
    const element = document.documentElement as any;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    const doc = document.documentElement as HTMLElement;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  return (
    <>
      <span className="cursor-pointer" onClick={toggleFullScreen}>
        <CornersOut size={25} />
      </span>
    </>
  );
};
