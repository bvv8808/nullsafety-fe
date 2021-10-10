import React, { useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getDashData } from "../../../lib/fetcher";
import { TDashData } from "../../../lib/types";

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
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    getDashData().then((data) => {
      if (!data) {
        alert("Permission denied");
        history.goBack();
        return;
      }
      setAuthed(true);

      // setState
      console.log("#1", data);
    });
  }, []);
  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="dashboard">Dashboard Screen</LayoutAdm>
  );
};

export default DashboardScreen;
