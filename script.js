// let element=document.getElementById('totalprofitbycountry')
// let chart1 = new Chart(
//     element,
//     {
//       type: 'bar',
//       options: {
//         animation: false,
//         plugins: {
//           legend: {
//             display: false
//           },
//           tooltip: {
//             enabled: false
//           }
//         }
//       },
//       data: {
//         labels: ["january", "february",],
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: [150,300]
//           }
//         ]
//       }
//     }
//   )

//   let element2=document.getElementById('totalOrderPercentagebyGender')
// let chart2 = new Chart(
//     element2,
//     {
//       type: 'bar',
//       options: {
//         animation: false,
//         plugins: {
//           legend: {
//             display: false
//           },
//           tooltip: {
//             enabled: false
//           }
//         }
//       },
//       data: {
//         labels: ["january","february"],
//         datasets: [
//           {
//             label: 'Acquisitions by year',
//             data: [100,200]
//           }
//         ]
//       }
//     }
//   );
// kedua
document.addEventListener("DOMContentLoaded", function () {
  // Total Profit by Country (Bar Chart)
  let element = document.getElementById("totalprofitbycountry");
  let chart1 = new Chart(element, {
    type: "bar",
    options: {
      amimation: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
    data: {
      labels: ["Germany", "United Kingdom", "France"],
      datasets: [
        {
          label: "Acquisitions by year",
          data: [1860214, 1841471, 1676448],
          backgroundColor: ["#097169", "#14978C", "#78D3CC"],
        },
      ],
    },
  });

  // Total Order Percentage by Gender (Pie Chart)
  let element2 = document.getElementById("totalOrderPercentagebyGender");
  let chart2 = new Chart(element2, {
    type: "pie",
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Acquisitions by year",
          data: [52.3, 47.7],
          backgroundColor: ["#097169", "#44A8A0"],
        },
      ],
    },
  });
});

// Total Profit Percentage by Sub-Category Product (Doughnut Chart)
let element3 = document.getElementById("totalProfitPercentageBySubCategory");
let chart3 = new Chart(element3, {
  type: "doughnut",
  options: {
    animation: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  },
  data: {
    labels: ["Road Bike", "Mountain Bike", "Touring Bike"],
    datasets: [
      {
        label: "Total Profit Percentage by Sub-Category",
        data: [45.8, 40.1, 14.1],
        backgroundColor: ["#0072f0", "#00c6d8", "#f000a0"],
      },
    ],
  },
});

// Customer Total Order by Color Product (Bar Chart)
let element4 = document.getElementById("customerTotalOrderByColorProduct");
let chart4 = new Chart(element4, {
  type: "bar",
  options: {
    animation: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  },
  data: {
    labels: ["Black", "Yellow", "Silver", "Red", "Blue"],
    datasets: [
      {
        label: "Male",
        data: [1126, 912, 695, 671, 325],
        backgroundColor: "#1f6f6f",
      },
      {
        label: "Female",
        data: [1225, 765, 811, 518, 373],
        backgroundColor: "#44A8A0",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  },
});
