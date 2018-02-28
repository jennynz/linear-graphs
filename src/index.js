import $ from "jquery";
import "flot";
import "./scss/style.scss";

$(document).ready(() => {

  var data = [[0, 0], [10, 10]];
  
  var dataset = [
    {
      color: "#333",
      data: data,
      shadowSize: 0
    }
  ]
  
  var options = {
    xaxis: {
      min: -10,
      max: 10,
      // tickSize: [1, "month"],
      // tickLength: 0,
      // axisLabel: "2012",
      // axisLabelUseCanvas: true,
      // axisLabelFontSizePixels: 12,
      // axisLabelFontFamily: "Verdana, Arial",
      axisLabelPadding: 10
    },
    yaxis: {
      min: -10,
      max: 10
    },
    grid: {
      borderWidth: 0
    }
  };

  var graph = $.plot("#graph", dataset, options);

  $("#refresh").click(function() {

    var dataset = graph.getData();
    var line = dataset[0].data;
    var x1 = line[0][0];
    var y1 = line[0][1];
    var x2 = line[1][0];
    var y2 = line[1][1];

    dataset[0].data = [
      [x1 + 2, y1 + 2],
      [x2 + 2, y2 + 2]
    ];

    console.log(dataset[0].data);
    graph.setData(dataset);
    graph.draw();
  });

});
