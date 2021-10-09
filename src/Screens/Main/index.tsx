import { useEffect, useState } from "react";
import { api_getCategoryNames, getMainData } from "../../lib/fetcher";
import { TMainData } from "../../lib/types";

const shuckMainData = {
  cntToday: 0,
  cntTotal: 0,
  contentPreviewsByHit: [],
  contentPreviewsByLike: [],
};

const MainScreen = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [mainData, setMainData] = useState<TMainData>(shuckMainData);
  useEffect(() => {
    getMainData().then((r) => {
      r && setMainData(r);
      console.log(r);
    });
    api_getCategoryNames().then((c) => {
      setCategories(c);
    });
  }, []);
  return <div className="nav-wrapper">This is Main Screen.</div>;
};

export default MainScreen;
