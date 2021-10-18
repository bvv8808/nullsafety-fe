import React from "react";
import "./index.css";

interface IProps {
  title: string;
}

const ContentTitle = ({ title }: IProps) => {
  return <div className="contenttitle">{title}</div>;
};

export default ContentTitle;
