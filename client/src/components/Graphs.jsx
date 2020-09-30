import React, { useState } from "react";
import Chart from "react-apexcharts";

function Graphs() {
  const [options, setoptions] = useState({
    chart: {
      id: "line",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <div className="container">
      <div className="row">
        <div className="graph-container">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="area"
              width="800px"
            />
          </div>
          {/* <div className="mixed-chart">
            <Chart options={options} series={series} type="bar" width="80%" />
          </div>
          <div className="mixed-chart">
            <Chart options={options} series={series} type="line" width="80%" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Graphs;
