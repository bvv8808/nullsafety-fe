import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api_getCategoryNames, getMainData } from "../../lib/fetcher";
import { TMainData } from "../../lib/types";
import "./index.css";

const shuckMainData = {
  cntToday: 0,
  cntTotal: 0,
  contentPreviewsByHit: [],
  contentPreviewsByLike: [],
};

const MainScreen = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [mainData, setMainData] = useState<TMainData>(shuckMainData);
  const [selectedFilter, setSelectedFilter] = useState<"hit" | "like">("hit");

  useEffect(() => {
    getMainData().then((r) => {
      r && setMainData(r);
    });
    api_getCategoryNames().then((c) => {
      setCategories(c);
    });

    const radioHit: HTMLInputElement | null =
      document.querySelector("#radioHit");
    if (!radioHit) return;
    radioHit.checked = true;
  }, []);

  const switchToHit = useCallback(() => {
    setSelectedFilter("hit");
  }, []);

  const switchToLike = useCallback(() => {
    setSelectedFilter("like");
  }, []);

  return (
    <div className="main-wrapper">
      <span className="main-logo-container">LOGO</span>
      <p className="main-introduce">한 줄 소개</p>

      <div className="main-text-container">
        <span className="main-text-hot">HOT 컨텐츠</span>

        {/* @@ 768px 초과일 때 렌더링 */}
        <div className="main-radio-wrapper">
          <input
            type="radio"
            name="mainRadio"
            id="radioHit"
            className="main-radio"
            // checked
            onChange={switchToHit}
          />
          <label htmlFor="radioHit" className="main-label-hot">
            조회순
          </label>

          <input
            type="radio"
            name="mainRadio"
            id="radioLike"
            className="main-radio"
            onChange={switchToLike}
          />
          <label htmlFor="radioLike" className="main-label-hot">
            좋아요순
          </label>
        </div>
      </div>

      {/* @@ 768px 이하일 때 렌더링 */}
      <div className="main-tab-container">
        <div className="main-tab" onClick={switchToHit}>
          조회순
        </div>
        <div className="main-tab" onClick={switchToLike}>
          좋아요순
        </div>
      </div>

      <div className="main-contents-wrapper">
        {mainData[
          selectedFilter === "hit"
            ? "contentPreviewsByHit"
            : "contentPreviewsByLike"
        ].map((c) => {
          return <div key={c.id}>{c.id}</div>;
        })}
      </div>

      <span className="main-text-hot">카테고리</span>

      <div className="main-category-wrapper">
        {/* Grid Layout */}
        {categories.map((c) => (
          <div className="main-category" key={c}>
            <Link className="main-category-link" to={`/contents?category=${c}`}>
              {c}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
