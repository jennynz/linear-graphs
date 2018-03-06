import $ from 'jquery';
import 'flot';
import './js/jquery.flot.originaxis';
import './scss/style.scss';

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

let xInt = -c / m;

let data = [[x1, y1], [x2, y2]];

let dataset = [
  {
    color: '#333',
    data: data,
    shadowSize: 0,
  },
];

const options = {
  crossOrigin: true,
  xaxis: {
    min: x_min,
    max: x_max,
    axisLabel: 'x',
    tickSize: 2,
  },
  yaxis: {
    min: y_min,
    max: y_max,
    axisLabel: 'y',
    tickSize: 2,
  },
  grid: {
    borderWidth: 0,
  },
};

let graph = $.plot('#graph', dataset, options);

function updateValues() {
  m = $('#m_slider').val();
  c = $('#c_slider').val();
  xInt = -c / m;
}

function updateEquations() {
  $('.m').html(m);
  $('.c').html(c);
  $('.xInt').html(xInt);
}

function newDataset(graph) {
  if (m == 0) {
    x1 = x_min;
    x2 = x_max;
    y1 = c;
    y2 = c;
  } else {
    y1 = y_min;
    y2 = y_max;
    x1 = (y1 - c) / m;
    x2 = (y2 - c) / m;
  }

  const dataset = graph.getData();
  dataset[0].data = [[x1, y1], [x2, y2]];
  return dataset;
}

function update() {
  updateValues();
  updateEquations();
}

$('#m_slider, #c_slider').on('input', function() {
  update();
  graph.setData(newDataset(graph));
  graph.draw();
});

function updateSliders() {
  $('#m_slider')[0].value = m;
  $('#c_slider')[0].value = c;
}

$(document).ready(function() {
  updateSliders();
  updateEquations();
});
