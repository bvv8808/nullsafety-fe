import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { api_getContentsByCategory } from "../../lib/fetcher";
import { TContentPreview } from "../../lib/types";
import qs from "querystring";
import "./index.css";
import LayoutList from "../../base/LayoutList";
import ContentItem from "../../components/ContentItem";

const fetchLimit = 3;
let endFetch = false;
let from = 0;
let fetching = false;

const ContentListScreen = ({ location }: RouteComponentProps) => {
  const categoryName = useMemo<string>(() => {
    const decoded = qs.decode(location.search.substring(1));
    if (!decoded.category) return "";
    return decoded.category instanceof Array
      ? decoded.category[0]
      : decoded.category;
  }, [location.search]);

  const [contentPreviews, setContentPreviews] = useState<TContentPreview[]>([]);

  useEffect(() => {
    endFetch = false;
    from = 0;
    setContentPreviews([]);

    const moreBox: Element | null = document.querySelector("#contentlist-more");

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]) return;

      const shown = entries[0].isIntersecting;
      if (!shown) return;

      if (fetching || endFetch) return;
      fetching = true;
      api_getContentsByCategory({
        category: categoryName,
        offset: from,
        limit: fetchLimit,
      }).then((contents) => {
        console.log(contents);

        fetching = false;
        if (contents.length === fetchLimit) from += fetchLimit;
        else endFetch = true;

        setContentPreviews((c) => [...c, ...contents]);
      });
    });
    if (moreBox) observer.observe(moreBox);

    return () => {
      if (moreBox) observer.unobserve(moreBox);
    };
  }, [categoryName]);

  return (
    <LayoutList categoryName={categoryName}>
      <div className="contentlist-list">
        {contentPreviews.map((c) => (
          <ContentItem content={c} />
        ))}
        <div id="contentlist-more"></div>
      </div>
    </LayoutList>
  );
};

export default ContentListScreen;
