import { useEffect, useMemo, useRef, useState } from "react";
import { api_getCategoryNames } from "../../lib/fetcher";
import "./index.css";
import { Link } from "react-router-dom";
import icoExit from "../../assets/images/icon_exit.png";

interface IProps {
  categoryName: string;
  children: any;
}

const LayoutList = ({ categoryName, children }: IProps) => {
  const mouseOverClassName = useMemo(
    () => "l-list-category-borderbox-inner-active",
    []
  );
  const [categories, setCategories] = useState<string[]>([]);

  const refCategoryWrapper = useRef<HTMLDivElement>(null);
  const refArrBorderBox = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    api_getCategoryNames().then((c) => {
      setCategories(c);
    });
  }, []);

  const toggleMenu = () => {
    if (!refCategoryWrapper.current) return;

    const toggledClass = "l-list-category-wrapper-open";
    const alreadyOpen =
      refCategoryWrapper.current.classList.contains(toggledClass);
    if (alreadyOpen) refCategoryWrapper.current.classList.remove(toggledClass);
    else refCategoryWrapper.current.classList.add(toggledClass);
  };

  const _closeMenu = () => {
    if (!refCategoryWrapper.current) return;

    const toggledClass = "l-list-category-wrapper-open";
    refCategoryWrapper.current.classList.remove(toggledClass);
  };

  const _onCategoryMouseOver = (idx: number) => {
    if (!refArrBorderBox.current.length) return;
    refArrBorderBox.current[idx].classList.add(mouseOverClassName);
  };
  const _onCategoryMouseLeave = (idx: number) => {
    if (!refArrBorderBox.current.length) return;
    refArrBorderBox.current[idx].classList.remove(mouseOverClassName);
  };

  return (
    <div className="l-list-wrapper">
      <div className="flex-row l-list-title-container">
        <span
          onClick={() => {
            window.location.href = "/";
          }}
        >
          LOGO
        </span>
        NullSafety; 너의 새 이쁜 티
      </div>
      <span className="l-list-menu" onClick={toggleMenu}>
        MENU
      </span>
      <div className="l-list-inner-wrapper">
        <div className="l-list-category-wrapper" ref={refCategoryWrapper}>
          <div className="l-list-category-close" onClick={toggleMenu}>
            <img src={icoExit} alt="exit" className="l-list-img-exit" />
          </div>
          <p>전체 카테고리</p>
          {categories.map((c, i) => (
            <div className="">
              <Link
                key={c}
                onClick={_closeMenu}
                to={`/contents?category=${c}`}
                className={`l-list-category-container ${
                  categoryName === c ? "l-list-category-active" : ""
                }`}
                onMouseOver={() => _onCategoryMouseOver(i)}
                onMouseLeave={() => _onCategoryMouseLeave(i)}
              >
                {c}
              </Link>
              <div className="l-list-category-borderbox">
                <div
                  ref={(r) => {
                    if (
                      !r ||
                      refArrBorderBox.current.length === categories.length
                    )
                      return;
                    refArrBorderBox.current.push(r);
                  }}
                  className="l-list-category-borderbox-inner"
                ></div>
              </div>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutList;
