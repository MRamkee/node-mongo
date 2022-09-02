import React from "react";

import CanvasJSReact from "../canvasjs.react";

export const Graph = ({ options }) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};
