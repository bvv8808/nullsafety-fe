import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getToken } from "../../../lib/cookie";
import {
  api_deleteContent,
  getCategoryNames,
  getContentsByCategory,
} from "../../../lib/fetcher";
import { TContentPreview } from "../../../lib/types";
import "./index.css";

const fetchLimit = 10;
const AdmContentListScreen = ({ history }: RouteChildrenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [authed, setAuthed] = useState(false);
  const [from, setFrom] = useState(0);
  const [list, setList] = useState<TContentPreview[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const refSelect = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
      return;
    }

    getCategoryNames().then((c) => {
      console.log(c);

      setCategories(c);
      setSelectedCategory(c[0]);
    });

    setAuthed(true);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setFrom(0);
    getContentsByCategory({
      category: selectedCategory,
      offset: 0,
      limit: fetchLimit,
    }).then((c) => {
      //
      setList(c);
    });
  }, [selectedCategory]);

  const changeCategory = () => {
    if (!refSelect.current) return;
    const newCategory = refSelect.current.selectedOptions[0].value;
    setSelectedCategory(newCategory);
  };

  const deleteContent = (cid: number, index: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      api_deleteContent(cid).then((result) => {
        if (result)
          setList((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
        else alert("서버 오류로 실패 했습니다");
      });
    }
  };
  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="contents">
      <h1>Adm ContentList Screen</h1>
      <select ref={refSelect} onChange={changeCategory}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />
      {list.map((content, index) => {
        return (
          <div key={content.id} className="adm-list-item-wrapper">
            <div className="adm-list-item-title">{content.title}</div>
            <div>
              <button>수정</button>
              <button onClick={() => deleteContent(content.id, index)}>
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </LayoutAdm>
  );
};

export default AdmContentListScreen;
