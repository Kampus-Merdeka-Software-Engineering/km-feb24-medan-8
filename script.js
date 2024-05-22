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
document.addEventListener('DOMContentLoaded', function () {
  // Total Profit by Country (Bar Chart)
  let element = document.getElementById('totalprofitbycountry');
  let chart1 = new Chart(
      element,
      {
        type: 'bar',
        options: {
          amimation: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        data: {
          labels: ["Germany", "United Kingdom", "France"],
          datasets: [
            {
              label: 'Acquisitions by year',
              data: [1860214, 1841471, 1676448],
              backgroundColor: ['#097169', '#14978C', '#78D3CC']
            }
          ]
        }
      }
  );

  // Total Order Percentage by Gender (Pie Chart)
  let element2 = document.getElementById('totalOrderPercentagebyGender');
  let chart2 = new Chart(
      element2,
      {
        type: 'pie',
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: ["Male", "Female"],
          datasets: [
            {
              label: 'Acquisitions by year',
              data: [52.3, 47.7],
              backgroundColor: ['#097169', '#44A8A0']
            }
          ]
        }
      }
  );
});