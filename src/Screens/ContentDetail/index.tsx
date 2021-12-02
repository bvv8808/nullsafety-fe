import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutList from "../../base/LayoutList";
import { api_getFullContent, api_like } from "../../lib/fetcher";
import { TContent, TContentPreview } from "../../lib/types";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import "./index.css";
import Thumb from "../../components/Thumb";
import ContentTitle from "../../components/ContentTitle";

const fakeContent: TContent = {
  id: -1,
  title: ".",
  content: ".",
  category: ".",
  createdAt: ".",
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
        <ContentTitle title={content.title} />
        <div className="flex-row">
          <Thumb onClick={like} cntLike={liked} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{content.createdAt}</span>
        </div>
        <div className="detail-content-container">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
        <Thumb onClick={like} cntLike={liked} />

        <div className="detail-next-link-wrapper">
          <div
            className={`detail-next-link-container ${
              prevContent ? "detail-next-link-exist" : ""
            }`}
          >
            {prevContent && (
              <Link to={`/content/${prevContent.id}`}>
                <div className="detail-next-link-arrow-container">{"<"}</div>
                <div className="detail-next-link-info-container">
                  <p>이전 글</p>
                  <h4>
                    {prevContent.title}
                    {prevContent.title}
                  </h4>
                </div>
              </Link>
            )}
          </div>
          <div
            className={`detail-next-link-container ${
              nextContent ? "detail-next-link-exist" : ""
            }`}
          >
            {nextContent && (
              <Link to={`/content/${nextContent.id}`}>
                <div className="detail-next-link-info-container">
                  <p className="detail-next-link-next">다음 글</p>
                  <h4 className="detail-next-link-next">{nextContent.title}</h4>
                </div>
                <div className="detail-next-link-arrow-container">{">"}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </LayoutList>
  );
};

export default ContentDetailScreen;
