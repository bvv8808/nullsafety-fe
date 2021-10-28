import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

interface IProps {
  clickable?: boolean;
}
const TitleLink = ({ clickable = true }: IProps) => {
  return clickable ? (
    <Link to="/" className="flex-row titlelink-container">
      NullSafety; 너의 새 이쁜 티
    </Link>
  ) : (
    <div className="flex-row titlelink-container">
      NullSafety; 너의 새 이쁜 티
    </div>
  );
};

export default TitleLink;
