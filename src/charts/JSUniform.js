import React, { Component } from "react";
import { RandVarGen } from "random-variate-generators";
import { chiSquareGOF } from "random-variate-generators/dist/gof";
import { runsTest } from "random-variate-generators/dist/runs";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  state = {
    gof: false,
    runs: false,
    n: 1000,
  };

  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    const rvg = new RandVarGen();

    let data = [];
    for (var idx = 0; idx < this.state.n; idx++) {
      data.push(Math.random());
    }

    const gofresult = chiSquareGOF(data, 0.95, 10);
    const runsresult = runsTest(data, 0.95);

    this.setState({
      gof: !!gofresult[0],
      runs: !!runsresult[0],
    });

    var maxCols = 10;
    function getHistogramData(source) {
      // Init
      var data = [];
      var min = 0;
      var max = 1;
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
      for (let i = 0; i < source.length; i++) {
        let value = source[i];
        let item = data.find((el) => value >= el.from && value <= el.to);
        item.count++;
      }

      return data;
    }

    // Create chart instance
    var chart = am4core.create("chartdiv_js", am4charts.XYChart);

    // Add data
    chart.data = getHistogramData(data);

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "from";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    chart.yAxes.push(new am4charts.ValueAxis());

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
    const { gof, runs, n } = this.state;
    return (
      <div
        style={{
          margin: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{ fontSize: "25px", fontWeight: "300" }}>
          Random Uniforms via JavaScript's Math.random()
        </h1>
        <div id="chartdiv_js" style={{ width: "100%", height: "500px" }}></div>
        <div
          style={{
            margin: "30px",
            fontWeight: "200",
            letterSpacing: "0.8px",
            width: "650px",
            textAlign: "center",
          }}
        >
          This set of {n} PRNs produced by Math.random()
          {gof ? " passes " : " fails "}
          the Chi Squared Goodness of Fit Test for uniformity and
          {runs ? " passes " : " fails "}
          the Runs Test for independence.
        </div>
      </div>
    );
  }
}

export default App;
