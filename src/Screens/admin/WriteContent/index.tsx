import React, { useEffect, useRef, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getToken } from "../../../lib/cookie";
import { writeContent } from "../../../lib/fetcher";
import { IFetchParamsToWrite } from "../../../lib/interfaces";

const WriteContentScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(false);

  const refContent = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
    } else setAuthed(true);
  }, []);

  const post = () => {
    const title: HTMLInputElement | null = document.querySelector("#iTitle");
    if (!title || !refContent.current || !selectedCategory) {
      alert("미입력 항목이 존재합니다");
      return;
    }

    const body: IFetchParamsToWrite = {
      title: title.value,
      content: refContent.current.value,
      category: selectedCategory,
    };
    writeContent(body).then((r) => {
      console.log("#posted ", r);
    });
  };
  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="write">
      <h1>Write</h1>
      <input type="text" name="title" id="iTitle" placeholder="제목" />
      <div>
        <button>{selectedCategory || "카테고리"}</button>
        <input type="file" name="picture" id="iFile" />
      </div>
      <textarea
        ref={refContent}
        name="content"
        id="iContent"
        placeholder="내용"
      />
      <div>
        <button onClick={post}>post</button>
        <button>cancel</button>
      </div>

      {visibleCategories && <div>select category</div>}
    </LayoutAdm>
  );
};

export default WriteContentScreen;
