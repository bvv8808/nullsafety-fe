import React from "react";

interface IProps {
  onClick: () => void;
  cntLike: number;
}

const Thumb = ({ onClick, cntLike }: IProps) => {
  return <span onClick={onClick}>따봉 {cntLike}</span>;
};

export default Thumb;
