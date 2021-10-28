import React, { useEffect, useRef } from "react";
import { SERVER_URL } from "../../lib/constants";
import { TContentPreview } from "../../lib/types";
import "./index.css";
import iconNoThumbnail from "../../assets/images/no-thumbnail.png";

interface IProps {
  content: TContentPreview;
  _click: () => void;
}

const MainContent = ({ content, _click }: IProps) => {
  const refBg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refBg.current || !content.thumbnail) return;
    refBg.current.style.setProperty(
      "background-image",
      `url(${SERVER_URL}${content.thumbnail})`
    );
  }, []);
  return (
    <div className="maincontent-wrapper" onClick={_click}>
      <div className="maincontent-bgimg" ref={refBg}></div>
      {/* <img
        src={
          content.thumbnail
            ? `${SERVER_URL}${content.thumbnail}`
            : iconNoThumbnail
        }
      /> */}
      <div className="maincontent-title">
        {content.title}
        {content.title}
        {content.title}
        {content.title}
        {content.title}
        {content.title}
      </div>
    </div>
  );
};

export default MainContent;
