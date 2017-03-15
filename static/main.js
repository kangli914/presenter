var ctx = document.getElementById("c").getContext("2d");
var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
	}; 
	
var data2 = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      label: 'apples',
      backgroundColor: "rgba(153,255,51,0.4)",
      borderColor: "rgba(153,255,51,1)",
      data: [12, 19, 3, 17, 28, 24, 7]
    }, {
      label: 'oranges',
      backgroundColor: "rgba(255,153,0,0.4)",
      borderColor: "rgba(255,153,0,1)",
      data: [30, 29, 5, 5, 20, 3, 10]
    }]
  }
	

//cht(ctx).Line(data);
//var MyNewChart = new Chart(ctx).Line(data);
//var MyNewChart = new Chart(ctx).Radar(data2);

var MyNewChart = new Chart.Line(ctx, {
	data: data
});
