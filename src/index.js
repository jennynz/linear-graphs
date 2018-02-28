import $ from "jquery";
import "flot";
import "./scss/style.scss";

const x_min = 0;
const x_max = 10;
const y_min = 0;
const y_max = 10;

let m = 1;
let c = 0;

let data = [
  [x_min, c],
  [x_max, m*x_max + c]
];

let dataset = [
  {
    color: "#333",
    data: data,
    shadowSize: 0
  }
];

const options = {
  xaxis: {
    min: x_min,
    max: x_max,
    axisLabel: "x",
    tickSize: 1
  },
  yaxis: {
    min: y_min,
    max: y_max,
    axisLabel: "y",
    tickSize: 1
  },
  grid: {
    borderWidth: 0
  }
};

let graph = $.plot("#graph", dataset, options);

function newDataset(graph) {
  const dataset = graph.getData();

  const m = $("#m_slider").val();
  const c = $("#c_slider").val();

  const x1 = x_min;
  const y1 = c;

  const y2 = y_max;
  const x2 = (y2 - c) / m;

  dataset[0].data = [[x1, y1], [x2, y2]];
  return(dataset);
};

function updateEquation() {
  $("#m").html($("#m_slider").val());
  $("#c").html($("#c_slider").val());
}



$(document).ready(function() {

  // Initialise values
  $("#m_slider").val(m);
  $("#c_slider").val(c);
  $("#m").html(m);
  $("#c").html(c);

});

$("#m_slider").on("input", function() {
  updateEquation();
  graph.setData(newDataset(graph));
  graph.draw();
});

$("#c_slider").on("input", function() {
  updateEquation();
  graph.setData(newDataset(graph));
  graph.draw();
});