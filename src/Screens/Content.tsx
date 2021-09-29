import React, { useMemo } from "react";
import { RouteChildrenProps } from "react-router";

const ContentDetailScreen = ({
  match,
  history,
}: RouteChildrenProps<{ cid: string }>) => {
  const cid = useMemo(() => {
    if (!match || !match.params || !match.params.cid) return -1;
    const paramCid = Number(match.params.cid);
    return paramCid || -1;
  }, [match]);
  return <div></div>;
};

export default ContentDetailScreen;
