import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getCategoryNames, getContentsByCategory } from "../lib/fetcher";
import { TContentPreview } from "../lib/types";
import qs from "querystring";

const fetchLimit = 5;

const ContentListScreen = ({ location }: RouteComponentProps) => {
  const categoryName = useMemo<string>(() => {
    const decoded = qs.decode(location.search.substring(1));
    if (!decoded.category) return "";
    return decoded.category instanceof Array
      ? decoded.category[0]
      : decoded.category;
  }, [location.search]);

  const [contentPreviews, setContentPreviews] = useState<TContentPreview[]>([]);
  const [from, setFrom] = useState(0);
  const [endFetch, setEndFetch] = useState(false);
  useEffect(() => {
    getCategoryNames().then((c) => {
      console.log("#category names: ", c);
    });
  }, []);

  useEffect(() => {
    setFrom(0);
    setEndFetch(false);

    getContentsByCategory({
      category: categoryName,
      offset: from,
      limit: fetchLimit,
    }).then((contents) => {
      setContentPreviews(contents);
    });
  }, [categoryName]);

  return <div>This is ContentList Screen.</div>;
};

export default ContentListScreen;
