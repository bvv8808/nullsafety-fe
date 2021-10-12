import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutList from "../../base/LayoutList";
import { api_getFullContent, api_like } from "../../lib/fetcher";
import { TContent, TContentPreview } from "../../lib/types";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const fakeContent: TContent = {
  id: -1,
  title: "",
  content: "",
  category: "",
  createdAt: "",
  liked: -1,
};

const ContentDetailScreen = ({
  match,
  location,
  history,
}: RouteChildrenProps<{ cid: string }, { category: string }>) => {
  const cid = useMemo(() => {
    if (!match || !match.params || !match.params.cid) return -1;
    const paramCid = Number(match.params.cid);
    return paramCid || -1;
  }, [match]);

  const [content, setContent] = useState<TContent>(fakeContent);
  const [prevContent, setPrevContent] = useState<TContentPreview | null>(null);
  const [nextContent, setNextContent] = useState<TContentPreview | null>(null);
  const [liked, setLiked] = useState(0);

  useEffect(() => {
    // console.log("cid: ", cid);
    api_getFullContent(cid).then((c) => {
      if (!c) return;

      console.log(c);

      setContent(c.contentData);
      setLiked(c.contentData.liked);
      setPrevContent(c.prevContentPreview);
      setNextContent(c.nextContentPreview);
    });
  }, [cid]);

  const like = useCallback(() => {
    api_like(content.id).then((res) => {
      console.log(res);
      if (!res) {
        // 통신 오류
        return;
      }

      switch (res) {
        case "Success":
          // 따봉 성공
          setLiked((l) => l + 1);
          break;
        case "Already liked":
          // 이미 따봉
          alert("이미 따봉을 날려주셨습니다");
          break;
        default:
      }
    });
  }, [content]);
  return (
    <LayoutList categoryName={content.category}>
      <div className="detail-wrapper">
        <h3>{content.title}</h3>
        <div className="flex-row">
          <span onClick={like}>따봉 {liked}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{content.createdAt}</span>
        </div>
        <div className="detail-content-container">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
        <span onClick={like}>따봉 {liked}</span>

        <div className="flex-row">
          <div className="detail-next-link-container">
            {prevContent && (
              <Link
                to={`/content/${prevContent.id}`}
                className="detail-next-link"
              >
                {prevContent.id}
              </Link>
            )}
          </div>
          <div className="detail-next-link-container">
            {nextContent && (
              <Link
                to={`/content/${nextContent.id}`}
                className="detail-next-link"
              >
                {nextContent.id}
              </Link>
            )}
          </div>
        </div>
      </div>
    </LayoutList>
  );
};

export default ContentDetailScreen;
