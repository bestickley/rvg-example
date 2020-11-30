import React from "react";
import Grid from "@material-ui/core/Grid";
import RVGUniform from "./RVGUniform";
import JSUniform from "./JSUniform.js"
import Normal from "./Normal"

// examples from https://www.amcharts.com/docs/v4/tutorials/a-simple-histogram-chart/

function Charts() {
  return (
    <Grid>
      <Grid item xs={12}>
        <div style={{borderBottom: "1px solid rgb(103, 183, 220)", marginBottom: "60px"}}>
        <RVGUniform />
        </div>
        <div style={{borderBottom: "1px solid rgb(103, 183, 220)", marginBottom: "60px"}}>
        <JSUniform />
        </div>
        <Normal/>
      </Grid>
    </Grid>
  );
}

export default Charts;
