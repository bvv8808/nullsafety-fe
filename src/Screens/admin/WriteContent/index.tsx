import React, { useEffect, useRef, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { SERVER_URL } from "../../../lib/constants";
import { getToken } from "../../../lib/cookie";
import {
  writeContent,
  api_getCategoryNames,
  api_addCategory,
  uploadImage,
} from "../../../lib/fetcher";
import { IFetchParamsToWrite } from "../../../lib/interfaces";
import "./index.css";

const WriteContentScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const refContent = useRef<HTMLTextAreaElement>(null);
  const refImage = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
      return;
    }

    setAuthed(true);
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
      if (!r) {
        // 네트워크 에러
        return;
      }
      if (r.code) {
        // 실패
      }
      console.log("#successly posted ", r);
    });
  };

  const onAddCategory = () => {
    const newCategory: HTMLInputElement | null =
      document.querySelector("#iNewCategory");
    if (!newCategory) return;

    const newName = newCategory.value;
    if (!newName.length) {
      alert("새 카테고리의 이름을 입력해 주세요");
      return;
    }

    api_addCategory(newName).then(() => {
      // 추가 후
      setVisibleCategories(false);
      setCategories((c) => [...c, newName]);
      setSelectedCategory(newName);
    });
  };

  const upload = () => {
    if (!refImage.current || !refImage.current.files) return;

    // File Upload
    const img = refImage.current.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || !e.target.result) return;
      const result: string = e.target.result.toString();
      const sep = result.indexOf(",");
      const data = result.substring(sep + 1);

      uploadImage(data).then((path) => {
        if (!refContent.current) return;
        refContent.current.value += `\n\n![](${SERVER_URL + path})`;
      });
    };
    reader.readAsDataURL(img);
  };
  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="write">
      <h1>Write</h1>
      <input type="text" name="title" id="iTitle" placeholder="제목" />
      <div>
        <button
          onClick={() => {
            api_getCategoryNames().then((c) => {
              console.log(c);

              setCategories(c);
              setVisibleCategories(true);
            });
          }}
        >
          {selectedCategory || "카테고리"}
        </button>
        <input
          ref={refImage}
          onChange={upload}
          type="file"
          name="picture"
          id="iFile"
        />
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

      {visibleCategories && (
        <div className="adm-write-category-wrapper">
          select category
          {categories.map((c) => {
            return (
              <div
                key={c}
                onClick={() => {
                  setVisibleCategories(false);
                  setSelectedCategory(c);
                }}
              >
                {c}
              </div>
            );
          })}
          <div>
            <input type="text" id="iNewCategory" />
            <button onClick={onAddCategory}>ADD</button>
          </div>
        </div>
      )}
    </LayoutAdm>
  );
};

export default WriteContentScreen;
