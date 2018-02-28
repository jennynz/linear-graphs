import $ from "jquery";
import "flot";
import "./js/jquery.flot.originaxis";
import "./scss/style.scss";

const x_min = -10;
const x_max = 10;
const y_min = -10;
const y_max = 10;

let m = 1;
let c = 0;

let x1 = x_min;
let y1 = m * x1 + c;
let x2 = x_max;
let y2 = m * x2 + c;

let data = [ [x1, y1], [x2, y2] ];

let dataset = [
  {
    color: "#333",
    data: data,
    shadowSize: 0
  }
];

const options = {
  crossOrigin: true,
  xaxis: {
    min: x_min,
    max: x_max,
    axisLabel: "x",
    tickSize: 2
  },
  yaxis: {
    min: y_min,
    max: y_max,
    axisLabel: "y",
    tickSize: 2
  },
  grid: {
    borderWidth: 0
  }
};

let graph = $.plot("#graph", dataset, options);

function newDataset(graph) {
  m = $("#m_slider").val();
  c = $("#c_slider").val();

  if (m == 0) {
    x1 = x_min;
    x2 = x_max;
    y1 = c
    y2 = c
  } else {
    y1 = y_min;
    y2 = y_max;
    x1 = (y1 - c) / m;
    x2 = (y2 - c) / m;
  }

  const dataset = graph.getData();
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

