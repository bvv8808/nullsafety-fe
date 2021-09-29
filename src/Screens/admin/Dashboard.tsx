import React, { useEffect, useMemo, useState } from "react";
import { RouteChildrenProps } from "react-router";
import { getToken } from "../../lib/cookie";
import { getDashData } from "../../lib/fetcher";
import { TDashData } from "../../lib/types";

const shuckData: TDashData = {
  cntVisitor: {
    total: 0,
    today: 0,
    months: [],
  },
  cntContents: {
    total: 0,
    perCategory: [],
  },
  cntLike: {
    total: 0,
    perCategory: [],
  },
};

const DashboardScreen = ({ history }: RouteChildrenProps) => {
  const [dashData, setDashData] = useState(shuckData);
  useEffect(() => {
    getDashData().then((data) => {
      if (!data) {
        alert("Permission denied");
        history.goBack();
        return;
      }

      // setState
      console.log("#1", data);
    });
  }, []);
  return <div></div>;
};

export default DashboardScreen;
