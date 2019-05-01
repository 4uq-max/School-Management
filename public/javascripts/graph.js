window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

var barChartData1 = {
  labels: [
    "agust-september",
    "october-november",
    "december-january",
    "february-march",
    "april-may",
    "june-july"
  ],
  datasets: [
    {
      label: "Spanish 1",
      backgroundColor: color(window.chartColors.red).rgbString(),
      data: [8.7, 8.6, 9, 8.6, 8.8, 8.9]
    },
    {
      label: "Maths 1",
      backgroundColor: color(window.chartColors.blue).rgbString(),
      data: [8.7, 8.5, 8.9, 8.7, 8.9, 8.8]
    },
    {
      label: "History",
      backgroundColor: color(window.chartColors.green).rgbString(),
      data: [8.5, 8.6, 9.1, 8.8, 8.9, 9.1]
    },
    {
      label: "Biology",
      backgroundColor: color(window.chartColors.yellow).rgbString(),
      data: [9, 8.6, 8.7, 8.9, 9, 9.1]
    },
    {
      label: "Technology 1",
      backgroundColor: color(window.chartColors.purple).rgbString(),
      data: [8.6, 8.7, 9.1, 8.6, 8.8, 8.9]
    },
    {
      label: "Arts 1",
      backgroundColor: color(window.chartColors.grey).rgbString(),
      data: [8.7, 8.7, 9.1, 8.8, 8.9, 9.1]
    },
    {
      label: "English 1",
      backgroundColor: color(window.chartColors.orange).rgbString(),
      data: [8.9, 8.9, 9, 8.7, 8.9, 9]
    }
  ]
};

var barChart1 = document.getElementById("barChart1");
if (barChart1) {
  new Chart(barChart1, {
    type: "bar",
    data: barChartData1,
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      }
    }
  });
}

var barChartData2 = {
  labels: [
    "agust-september",
    "october-november",
    "december-january",
    "february-march",
    "april-may",
    "june-july"
  ],
  datasets: [
    {
      label: "Spanish 2",
      backgroundColor: color(window.chartColors.red).rgbString(),
      data: [8.7, 8.8, 9, 8.8, 9.1, 9.1]
    },
    {
      label: "Maths 2",
      backgroundColor: color(window.chartColors.blue).rgbString(),
      data: [8.6, 8.6, 8.9, 8.6, 8.9, 8.9]
    },
    {
      label: "Geography",
      backgroundColor: color(window.chartColors.green).rgbString(),
      data: [8.6, 8.5, 8.9, 8.9, 8.7, 8.9]
    },
    {
      label: "Phisics",
      backgroundColor: color(window.chartColors.yellow).rgbString(),
      data: [8.4, 8.6, 9, 8.8, 8.9, 8.9]
    },
    {
      label: "Technology 2",
      backgroundColor: color(window.chartColors.purple).rgbString(),
      data: [8.7, 9, 9.1, 8.8, 9, 8.8]
    },
    {
      label: "Arts 2",
      backgroundColor: color(window.chartColors.grey).rgbString(),
      data: [8.5, 8.9, 9, 8.9, 9, 9]
    },
    {
      label: "English 2",
      backgroundColor: color(window.chartColors.orange).rgbString(),
      data: [8.6, 8.4, 9, 8.8, 9, 8.9]
    }
  ]
};

var barChart2 = document.getElementById("barChart2");
if (barChart2) {
  new Chart(barChart2, {
    type: "bar",
    data: barChartData2,
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      }
    }
  });
}

var barChartData3 = {
  labels: [
    "agust-september",
    "october-november",
    "december-january",
    "february-march",
    "april-may",
    "june-july"
  ],
  datasets: [
    {
      label: "Spanish 3",
      backgroundColor: color(window.chartColors.red).rgbString(),
      data: [8.9, 8.5, 9, 8.5, 8.9, 8.9]
    },
    {
      label: "Maths 3",
      backgroundColor: color(window.chartColors.blue).rgbString(),
      data: [8.5, 8.8, 9.1, 8.5, 9, 9.1]
    },
    {
      label: "Philosophy",
      backgroundColor: color(window.chartColors.green).rgbString(),
      data: [8.8, 8.9, 9.2, 8.9, 8.9, 9.1]
    },
    {
      label: "Chemistry",
      backgroundColor: color(window.chartColors.yellow).rgbString(),
      data: [8.7, 8.9, 9.1, 8.7, 9.1, 9.1]
    },
    {
      label: "Technology 3",
      backgroundColor: color(window.chartColors.purple).rgbString(),
      data: [8.7, 8.5, 8.9, 8.7, 8.9, 8.8]
    },
    {
      label: "Arts 3",
      backgroundColor: color(window.chartColors.grey).rgbString(),
      data: [8.5, 8.6, 9.1, 8.8, 8.9, 9.1]
    },
    {
      label: "English 3",
      backgroundColor: color(window.chartColors.orange).rgbString(),
      data: [8.7, 8.7, 9.1, 8.8, 8.9, 9.1]
    }
  ]
};

var barChart3 = document.getElementById("barChart3");
if (barChart3) {
  new Chart(barChart3, {
    type: "bar",
    data: barChartData3,
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      }
    }
  });
}
