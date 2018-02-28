import Chart from "chart.js";
import "./scss/style.scss";

var ctx = document.getElementById("myChart");

var data = [{
  x: 0,
  y: 0
}, {
  x: 10,
  y: 10
}];

var options = {
  scales: {
    yAxes: [
      {
        ticks: {
          max: 10,
          min: 0,
          stepSize: 2
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          max: 10,
          min: 0,
          stepSize: 2
        }
      }
    ]
  }
};

var linearGraph = new Chart(ctx, {
  type: "line",
  data: data,
  options: options
});
