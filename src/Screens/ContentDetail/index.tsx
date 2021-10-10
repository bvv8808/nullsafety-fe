import React, { useEffect, useMemo } from "react";
import { RouteChildrenProps } from "react-router";

const ContentDetailScreen = ({
  match,
  location,
  history,
}: RouteChildrenProps<{ cid: string }>) => {
  const cid = useMemo(() => {
    if (!match || !match.params || !match.params.cid) return -1;
    const paramCid = Number(match.params.cid);
    return paramCid || -1;
  }, [match]);

  useEffect(() => {
    // console.log("cid: ", cid);
    // console.log("to: ", location.state);
  }, []);
  return <div></div>;
};

export default ContentDetailScreen;
