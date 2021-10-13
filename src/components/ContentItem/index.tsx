import React, { useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../lib/constants";
import { TContentPreview } from "../../lib/types";
import iconExit from "../../assets/images/icon_exit.png";
import "./index.css";

interface IProps {
  content: TContentPreview;
}

const ContentItem = ({ content }: IProps) => {
  const refBorderBoxInner = useRef<HTMLDivElement>(null);

  const mouseoverClass = useMemo(
    () => "contentlist-item-borderbox-inner-active",
    [refBorderBoxInner]
  );
  const _onMouseOver = useCallback(() => {
    console.log("#1", !!refBorderBoxInner.current);

    if (!refBorderBoxInner.current) return;
    refBorderBoxInner.current.classList.add(mouseoverClass);
  }, [refBorderBoxInner]);
  const _onMouseLeave = useCallback(() => {
    console.log("#2", !!refBorderBoxInner.current);
    if (!refBorderBoxInner.current) return;
    refBorderBoxInner.current.classList.remove(mouseoverClass);
  }, [refBorderBoxInner]);
  return (
    <Link
      key={content.category + content.id}
      to={{
        pathname: `content/${content.id}`,
        state: { category: content.category },
      }}
      className="contentlist-item-link"
      onMouseOver={_onMouseOver}
      onMouseLeave={_onMouseLeave}
    >
      <div className="contentlist-item-container">
        <div className="flex-row flex-center">
          <img
            className="contentlist-item-pic"
            src={
              content.thumbnail ? `${SERVER_URL}${content.thumbnail}` : iconExit
            }
            alt=""
          />
          <span className="contentlist-item-title">{content.title}</span>
        </div>
        <span className="contentlist-item-time">{content.createdAt}</span>
      </div>
      <div className="contentlist-item-borderbox">
        <div
          ref={refBorderBoxInner}
          className="contentlist-item-borderbox-inner"
        ></div>
      </div>
    </Link>
  );
};

export default ContentItem;
