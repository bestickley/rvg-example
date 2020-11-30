import React, { Component } from "react";
import { RandVarGen } from "random-variate-generators";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  state = {
    n: 1000,
  };

  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    const seed = Math.floor(Math.random() * 10000);
    const rvg = new RandVarGen({ lcgSeed: seed });

    let data = [];
    for (var idx = 0; idx < this.state.n; idx++) {
      data.push(rvg.normal(0, 0.15));
    }

    var maxCols = 10;
    function getHistogramData(source) {
      // Init
      var data = [];
      var min = Math.min(data) - 1;
      var max = Math.max(data) + 1;
      var range = max - min;
      var step = range / maxCols;

      // Create items
      for (var i = 0; i < maxCols; i++) {
        var from = min + i * step;
        var to = min + (i + 1) * step;
        data.push({
          from: from,
          to: to,
          count: 0,
        });
      }

      // Calculate range of the values
      for (var i = 0; i < source.length; i++) {
        var value = source[i];
        var item = data.find(function (el) {
          return value >= el.from && value <= el.to;
        });
        if (item) item.count++;
      }

      return data;
    }

    // Create chart instance
    var chart = am4core.create("chartdiv_normal", am4charts.XYChart);

    // Add data
    chart.data = getHistogramData(data);

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "from";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "from";
    series.columns.template.tooltipText =
      "{from} - {to}\n[bold]Count: {count}[/]";
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div
        style={{
          margin: "30px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "300",
            textAlign: "center",
            width: "750px",
          }}
        >
          Random Normal Variates via Inverse Transform Theorem - Using Uniform
          PRNs by the RVG Linear Congruential Generator
        </h1>
        <div
          id="chartdiv_normal"
          style={{ width: "100%", height: "500px" }}
        ></div>
      </div>
    );
  }
}

export default App;
