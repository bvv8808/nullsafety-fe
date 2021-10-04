import React, { useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getToken } from "../../../lib/cookie";
import { getFullCategories } from "../../../lib/fetcher";
import { TCategoryDetail } from "../../../lib/types";

const EditCategoryScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  const [origin, setOrigin] = useState<TCategoryDetail[]>([]);
  const [categories, setCategories] = useState<TCategoryDetail[]>([]);
  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
      return;
    }

    getFullCategories().then((c) => {
      setOrigin(c);
      setCategories(c);
    });

    setAuthed(true);
  }, []);

  const edit = () => {
    // #1 origin과 categories 비교해서 같으면 alert후 취소
    // #2 다르면 서버 통신 후 alert
  };

  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="editCategory">
      <div>Edit</div>
      <button onClick={edit}>반영</button>
    </LayoutAdm>
  );
};

export default EditCategoryScreen;
