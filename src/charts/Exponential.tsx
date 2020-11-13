import React, { useLayoutEffect, useRef } from "react";
import { RandVarGen } from "random-variate-generators";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Exponential() {
  const chart = useRef<am4charts.ColumnSeries | null>(null);
  const rvg = new RandVarGen();
  useLayoutEffect(() => {
    let x = am4core.create("exponentialChart", am4charts.ColumnSeries);
    const chartData: number[] = [];
    for (let i = 0; i < 10; i++) {
      chartData.push(rvg.exponential(0.1));
    }
    // Sreeja, use example here: https://www.amcharts.com/docs/v4/tutorials/a-simple-histogram-chart/
    // to make chartData the correct format
    if (chart.current) {
      //chart.current.data = chartData;
    }
    chart.current = x;
    return () => {
      x.dispose();
    };
  });
  return (
    <div id="exponentialChart" style={{ width: "100%", height: "500px" }} />
  );
}

export default Exponential;
