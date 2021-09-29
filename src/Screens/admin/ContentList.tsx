import React, { useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { getToken } from "../../lib/cookie";
import { getContentsByCategory } from "../../lib/fetcher";
import { TContentPreview } from "../../lib/types";

const fetchLimit = 10;
const AdmContentListScreen = ({ history }: RouteChildrenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [authed, setAuthed] = useState(false);
  const [from, setFrom] = useState(0);
  const [list, setList] = useState<TContentPreview[]>([]);

  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
      return;
    }
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
    });
  }, [selectedCategory]);
  return !authed ? (
    <div></div>
  ) : (
    <div>
      <h1>Adm ContentList Screen</h1>
    </div>
  );
};

export default AdmContentListScreen;
