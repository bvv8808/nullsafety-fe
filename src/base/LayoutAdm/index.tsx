import React from "react";
import "./index.css";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";

interface IProps {
  section: "dashboard" | "write" | "contents" | "editCategory";
  children: [JSX.Element | string] | JSX.Element | string;
}
const LayoutAdm = ({ section, children }: IProps) => {
  return (
    <div className="l-adm-wrapper">
      <div className="l-adm-nav-wrapper">
        <div className="l-adm-nav-header">
          <img src={logo} className="l-adm-logo" />
          NullSafety
        </div>
        <div className="l-adm-nav-body">
          <Link
            to="/adm/dash"
            className={`l-adm-nav-link ${
              section === "dashboard"
                ? "l-adm-nav-link-inactive"
                : "l-adm-nav-link-active"
            }`}
          >
            대시보드
          </Link>
          <Link
            to="/adm/write"
            className={`l-adm-nav-link ${
              section === "write"
                ? "l-adm-nav-link-inactive"
                : "l-adm-nav-link-active"
            }`}
          >
            컨텐츠 작성
          </Link>
          <Link
            to="/adm/contents"
            className={`l-adm-nav-link ${
              section === "contents"
                ? "l-adm-nav-link-inactive"
                : "l-adm-nav-link-active"
            }`}
          >
            컨텐츠 관리
          </Link>
          <Link
            to="/adm/editCategoy"
            className={`l-adm-nav-link ${
              section === "editCategory"
                ? "l-adm-nav-link-inactive"
                : "l-adm-nav-link-active"
            }`}
          >
            카테고리 편집
          </Link>
        </div>
      </div>
      <div className="l-adm-children-wrapper">{children}</div>
    </div>
  );
};

export default LayoutAdm;
