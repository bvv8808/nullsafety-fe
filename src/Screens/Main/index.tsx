import { useCallback, useEffect, useRef, useState } from "react";
import { Link, RouteChildrenProps } from "react-router-dom";
import CategoryLink from "../../components/CategoryLink";
import MainContent from "../../components/MainContent";
import TitleLink from "../../components/TitleLink";
import { MAIN_DESCRIPTION } from "../../lib/constants";
import { api_getCategoryNames, getMainData } from "../../lib/fetcher";
import { TMainData } from "../../lib/types";
import "./index.css";

const shuckMainData = {
  cntToday: 0,
  cntTotal: 0,
  contentPreviewsByHit: [],
  contentPreviewsByLike: [],
};

// 컨텐츠 목록 스크롤을 위한 변수
// (1) wrapper mousedown 시 startX 할당
// (2) wrapper mouseup 시 e.screenX와 startX를 비교하여 스크롤 여부 판단
// (3) 스크롤 이후라면 dismissClick = true;
// (4) container의 onClick 핸들러에서 dismissClick===true라면 false로 재할당 후 핸들러 종료
let dismissClick = false;
let startX = 0;
let scrollLeft = 0;
let isMouseDown = false;

const MainScreen = ({ history }: RouteChildrenProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [mainData, setMainData] = useState<TMainData>(shuckMainData);
  const [selectedFilter, setSelectedFilter] = useState<"hit" | "like">("hit");

  const refTabHit = useRef<HTMLDivElement>(null);
  const refTabLike = useRef<HTMLDivElement>(null);
  const refContentsWrapper = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!refTabHit.current || !refTabLike.current) return;

    const targetClass = "main-tab-active";
    if (selectedFilter === "hit") {
      refTabHit.current.classList.add(targetClass);
      refTabLike.current.classList.remove(targetClass);
    } else {
      refTabHit.current.classList.remove(targetClass);
      refTabLike.current.classList.add(targetClass);
    }
  }, [selectedFilter]);

  const switchToHit = useCallback(() => {
    setSelectedFilter("hit");
  }, []);

  const switchToLike = useCallback(() => {
    setSelectedFilter("like");
  }, []);

  const _onMouseDown = useCallback((e) => {
    if (!refContentsWrapper.current) return;

    isMouseDown = true;
    scrollLeft = refContentsWrapper.current.scrollLeft;
    startX = e.pageX;
  }, []);

  const _onMouseMove = useCallback((e) => {
    if (!isMouseDown || !refContentsWrapper.current) return;
    const d = startX - e.pageX;

    refContentsWrapper.current.scrollTo(scrollLeft + d, 0);
  }, []);

  const _onMouseUp = useCallback((e) => {
    if (e.pageX === startX) dismissClick = false;
    else dismissClick = true;

    isMouseDown = false;
  }, []);

  return (
    <div className="main-wrapper">
      <TitleLink clickable={false} />
      <p className="main-introduce">{MAIN_DESCRIPTION}</p>

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
          &nbsp;&nbsp;&nbsp;
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
        <div ref={refTabHit} className="main-tab" onClick={switchToHit}>
          조회순
        </div>
        <div ref={refTabLike} className="main-tab" onClick={switchToLike}>
          좋아요순
        </div>
      </div>

      <div
        ref={refContentsWrapper}
        className="main-contents-wrapper"
        onMouseDown={_onMouseDown}
        onMouseMove={_onMouseMove}
        onMouseUp={_onMouseUp}
      >
        {mainData[
          selectedFilter === "hit"
            ? "contentPreviewsByHit"
            : "contentPreviewsByLike"
        ].map((c) => {
          console.log(c);
          return (
            <MainContent
              content={c}
              key={c.id}
              _click={() => {
                if (dismissClick) {
                  dismissClick = false;
                  return;
                }

                // do something
                console.log(c);

                history.push(`/content/${c.id}`, { category: c.category });
              }}
            />
          );
        })}
      </div>

      <div className="main-text-container">
        <span className="main-text-hot">카테고리</span>
      </div>

      <div className="main-category-wrapper">
        {/* Grid Layout */}
        {categories.map((c) => (
          <CategoryLink name={c} key={c} />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
