import { useEffect, useRef, useState } from "react";
import { api_getCategoryNames } from "../../lib/fetcher";
import "./index.css";
import { Link } from "react-router-dom";

interface IProps {
  categoryName: string;
  children: any;
}

const LayoutList = ({ categoryName, children }: IProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  const refCategoryWrapper = useRef<HTMLDivElement>(null);

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

  const closeMenu = () => {
    if (!refCategoryWrapper.current) return;

    const toggledClass = "l-list-category-wrapper-open";
    refCategoryWrapper.current.classList.remove(toggledClass);
  };

  return (
    <div className="l-list-wrapper">
      <h1>ContentList</h1>
      <span>LOGO</span>
      <span className="l-list-menu" onClick={toggleMenu}>
        MENU
      </span>
      <div className="l-list-inner-wrapper">
        <div className="l-list-category-wrapper" ref={refCategoryWrapper}>
          <div className="l-list-category-close" onClick={toggleMenu}>
            X
          </div>
          {categories.map((c) => (
            <Link
              key={c}
              onClick={closeMenu}
              to={`/contents?category=${c}`}
              className={`l-list-category-container ${
                categoryName === c ? "l-list-category-active" : ""
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default LayoutList;
