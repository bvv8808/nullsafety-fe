import React, { useEffect, useRef, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getDashData } from "../../../lib/fetcher";
import { TDashData } from "../../../lib/types";
import "./index.css";
import { Bar, Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

const shuckChart = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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

  const [visitorChart, setVisitorChart] = useState<any>(null);
  const [contentsChart, setContentsChart] = useState<any>(null);
  const [likeChart, setLikeChart] = useState<any>(null);

  const getChartData = (originData: [string, number][]) => {
    let labels = [];
    let data = [];
    for (let o of originData) {
      labels.push(o[0]);
      data.push(o[1]);
    }

    const result: ChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return result;
  };

  useEffect(() => {
    getDashData().then((data) => {
      if (!data) {
        alert("Permission denied");
        history.goBack();
        return;
      }
      setAuthed(true);
      setDashData(data);

      // setState
      console.log("#1", data);
    });
  }, []);

  useEffect(() => {
    setVisitorChart(getChartData(dashData.cntVisitor.months));
    setContentsChart(getChartData(dashData.cntContents.perCategory));

    let likeData = getChartData(dashData.cntLike.perCategory);
    likeData.datasets[0].label = "따봉";
    likeData.datasets.push({
      label: "따봉지수",
      data: likeData.datasets[0].data.map(
        (d: any, i) => d / dashData.cntContents.perCategory[i][1]
      ),
    });
    setLikeChart(likeData);
  }, [dashData]);

  return !authed ? (
    <div></div>
  ) : (
    <LayoutAdm section="dashboard">
      <div className="dash-wrapper">
        <div className="dash-visitor-wrapper">
          <h4>방문자</h4>
          <div className="flex-row">
            <span>total {dashData.cntVisitor.total}</span> &nbsp;&nbsp;&nbsp;
            <span>today {dashData.cntVisitor.today}</span>
          </div>
          <p>월별 집계</p>
          <Line
            data={visitorChart}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
        <div className="dash-contents-wrapper">
          <h4>컨텐츠</h4>
          <span>total {dashData.cntContents.total}</span>
          <p>카테고리별 집계</p>
          <Bar
            data={contentsChart}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
        <div className="dash-like-wrapper">
          <h4>따봉 | 따봉지수</h4>
          <span>total {dashData.cntLike.total}</span>
          <p>카테고리별 집계</p>
          <Bar
            data={likeChart}
            options={{ plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </LayoutAdm>
  );
};

export default DashboardScreen;
