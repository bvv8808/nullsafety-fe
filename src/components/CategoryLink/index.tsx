import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";

interface IProps {
  name: string;
}

const CategoryLink = ({ name }: IProps) => {
  const refGlass = useRef<HTMLDivElement>(null);
  const activeClass = "categorylink-glass-active";

  const _mouseOver = () => {
    if (!refGlass.current) return;
    refGlass.current.classList.add(activeClass);
  };
  const _mouseLeave = () => {
    if (!refGlass.current) return;
    refGlass.current.classList.remove(activeClass);
  };
  return (
    <Link
      onMouseOver={_mouseOver}
      onMouseLeave={_mouseLeave}
      className="categorylink-container"
      to={`/contents?category=${name}`}
    >
      <div className="categorylink-glass-container" ref={refGlass}>
        <div className="categorylink-glass"></div>
      </div>
      {name}
    </Link>
  );
};

export default CategoryLink;
