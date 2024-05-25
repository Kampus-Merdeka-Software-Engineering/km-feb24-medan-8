// document.addEventListener('DOMContentLoaded', function () {
//     // Total Profit by Country (Bar Chart)
//     let element = document.getElementById('totalprofitbycountry');
//     let chart1 = new Chart(
//         element,
//         {
//           type: 'bar',
//           options: {
//             amimation: false,
//             plugins: {
//               legend: {
//                 display: false
//               },
//               tooltip: {
//                 enabled: false
//               }
//             }
//           },
//           data: {
//             labels: ["Germany", "United Kingdom", "France"],
//             datasets: [
//               {
//                 label: 'Acquisitions by year',
//                 data: [1860214, 1841471, 1676448],
//                 backgroundColor: ['#097169', '#14978C', '#78D3CC']
//               }
//             ]
//           }
//         }
//     );
  
//     // Total Order Percentage by Gender (Pie Chart)
//     let element2 = document.getElementById('totalOrderPercentagebyGender');
//     let chart2 = new Chart(
//         element2,
//         {
//           type: 'pie',
//           options: {
//             animation: false,
//             plugins: {
//               legend: {
//                 display: true
//               },
//               tooltip: {
//                 enabled: true
//               }
//             }
//           },
//           data: {
//             labels: ["Male", "Female"],
//             datasets: [
//               {
//                 label: 'Acquisitions by year',
//                 data: [52.3, 47.7],
//                 backgroundColor: ['#097169', '#44A8A0']
//               }
//             ]
//           }
//         }
//     );
//   });


// contoh

// fetch('data.json')
//  .then(response => response.json())
//  .then(data => {
//     let profitData = {};

//     data.forEach(item => {
//       const country = item.country;
//       const profit = parseFloat(item.profit);

//       if (profitData[country]) {
//         profitData[country] += profit;
//       } else {
//         profitData[country] = profit;
//       }
//     });

//     const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

//     const countries = sortedData.map(entry => entry[0]);
//     const profits = sortedData.map(entry => entry[1]);

//     const ctx = document.getElementById('totalprofitbycountry').getContext('2d');
//     const totalprofitbycountry = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: countries,
//         datasets: [{
//           label: 'Total Profit',
//           data: profits,
//           backgroundColor: 'rgba(0,100,0,0.5)',
//           borderColor: 'rgba(0,100,0,1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         indexAxis: 'y',
//         layout: {
//           padding: {
//             left: 50
//           }
//         },
//         scales: {
//           x: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Total Profit'
//             }
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Countries'
//             }
//           }
//         }
//       }
//     });
//   })
//  .catch(error => console.error('Error fetching the data:', error));




// contoh lagi 

// document.addEventListener('DOMContentLoaded', function () {
//   // Total Profit by Country (Bar Chart)
//   let element = document.getElementById('totalprofitbycountry');
//   let chart1 = new Chart(
//       element,
//       {
//         type: 'bar',
//         options: {
//           amimation: false,
//           plugins: {
//             legend: {
//               display: false
//             },
//             tooltip: {
//               enabled: false
//             }
//           }
//         },
//         data: {
//           labels: ["germany", "united kingdom", "france"],
//           datasets: [
//             {
//               label: 'Acquisitions by year',
//               data: [1860214, 1841471, 1676448],
//               backgroundColor: ['#097169', '#14978C', '#78D3CC']
//             }
//           ]
//         }
//       }
//   );

//   // Fetch data from JSON file
//   fetch('data.json')
//    .then(response => response.json())
//    .then(data => {
//       // Update chart data
//       chart1.data.labels = data.labels;
//       chart1.data.datasets[0].data = data.data;
//       chart1.update();
//     })
//    .catch(error => console.error('Error fetching the data:', error));

//   // Total Order Percentage by Gender (Pie Chart)
//   let element2 = document.getElementById('totalOrderPercentagebyGender');
//   let chart2 = new Chart(
//       element2,
//       {
//         type: 'pie',
//         options: {
//           animation: false,
//           plugins: {
//             legend: {
//               display: true
//             },
//             tooltip: {
//               enabled: true
//             }
//           }
//         },
//         data: {
//           labels: ["male", "female"],
//           datasets: [
//             {
//               label: 'Acquisitions by year',
//               data: [52.3, 47.7],
//               backgroundColor: ['#097169', '#44A8A0']
//             }
//           ]
//         }
//       }
//   );

//   // Fetch data from JSON file
//   fetch('data.json')
//    .then(response => response.json())
//    .then(data => {
//       // Update chart data
//       chart2.data.labels = data.labels;
//       chart2.data.datasets[0].data = data.data;
//       chart2.update();
//     })
//    .catch(error => console.error('Error fetching the data:', error));
// });
// Fetch data from JSON file

// fetch('data.json')
// .then(response => response.json())
// .then(data => {
//     // Extract labels and data from JSON file
//     let labels = data.map(item => item.country);
//     let chartData = data.map(item => item.profit);

//     // Update chart data
//     chart1.data.labels = labels;
//     chart1.data.datasets[0].data = chartData;
//     chart1.update();
//   })
// .catch(error => console.error('Error fetching the data:', error));




// document.addEventListener('DOMContentLoaded', function () {
//   // Create a function to create and update charts
//   function createChart(elementId, type, data) {
//     let element = document.getElementById(elementId);
//     let chart = new Chart(element, {
//       type: type,
//       options: {
//         animation: false,
//         plugins: {
//           legend: {
//             display: type === 'pie' ? true : false
//           },
//           tooltip: {
//             enabled: type === 'pie' ? true : false
//           }
//         }
//       },
//       data: data
//     });
//     return chart;
//   }

//   // Total Profit by Country (Bar Chart)
//   let chart1 = createChart('totalprofitbycountry', 'bar', {
//     labels: ["germany", "united kingdom", "france"],
//     datasets: [
//       {
//         label: 'Acquisitions by year',
//         data: [1860214, 1841471, 1676448],
//         backgroundColor: ['#097169', '#14978C', '#78D3CC']
//       }
//     ]
//   });

//   // Total Order Percentage by Gender (Pie Chart)
//   let chart2 = createChart('totalOrderPercentagebyGender', 'pie', {
//     labels: ["male", "female"],
//     datasets: [
//       {
//         label: 'Acquisitions by year',
//         data: [52.3, 47.7],
//         backgroundColor: ['#097169', '#44A8A0']
//       }
//     ]
//   });

//   // Fetch data from JSON file and update charts
//   fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//       // Process and update profit data
//       let profitData = {};

//       data.forEach(item => {
//         const countries = item.countries;
//         const profit = parseFloat(item.profit);

//         if (profitData[countries]) {
//           profitData[countries] += profit;
//         } else {
//           profitData[countries] = profit;
//         }
//       });

//       const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

//       const countries = sortedData.map(entry => entry[0]);
//       const profits = sortedData.map(entry => entry[1]);

//       // Update chart1 with processed data
//       chart1.data.labels = countries;
//       chart1.data.datasets[0].data = profits;
//       chart1.update();

//       // Update chart2 with data from JSON
//       chart2.data.labels = data.totalOrderPercentageByGender.labels;
//       chart2.data.datasets[0].data = data.totalOrderPercentageByGender.data;
//       chart2.update();
//     })
//     .catch(error => console.error('Error fetching the data:', error));
// });




//  intinya contoh 
// document.addEventListener('DOMContentLoaded', function () {
//   // Create a function to create and update charts
//   function createChart(elementId, type, data) {
//     let element = document.getElementById(elementId);
//     let chart = new Chart(element, {
//       type: type,
//       options: {
//         animation: false,
//         plugins: {
//           legend: {
//             display: type === 'pie' ? true : false
//           },
//           tooltip: {
//             enabled: type === 'pie' ? true : false
//           }
//         }
//       },
//       data: data
//     });
//     return chart;
//   }

//   // Total Profit by Country (Bar Chart)
//   let chart1 = createChart('totalprofitbycountry', 'bar', {
//     labels: [],
//     datasets: [
//       {
//         label: 'Profit by Country',
//         data: [],
//         backgroundColor: ['#097169', '#14978C', '#78D3CC']
//       }
//     ]
//   });

//   // Total Order Percentage by Gender (Pie Chart)
//   let chart2 = createChart('totalOrderPercentagebyGender', 'pie', {
//     labels: ["male", "female"],
//     datasets: [
//       {
//         label: 'Order Percentage by Gender',
//         data: [52.3, 47.7],
//         backgroundColor: ['#097169', '#44A8A0']
//       }
//     ]
//   });

//   // Fetch data from JSON file and update charts
//   fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//       console.log('Fetched data:', data);

//       // Process and update profit data
//       let profitData = {};

//       data.forEach(item => {
//         const country = item.Country;
//         const profit = parseFloat(item.Profit);

//         if (profitData[country]) {
//           profitData[country] += profit;
//         } else {
//           profitData[country] = profit;
//         }
//       });

//       console.log('Processed profit data:', profitData);

//       const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

//       const countries = sortedData.map(entry => entry[0]);
//       const profits = sortedData.map(entry => entry[1]);

//       console.log('Sorted countries:', countries);
//       console.log('Sorted profits:', profits);

//       // Update chart1 with processed data
//       chart1.data.labels = countries;
//       chart1.data.datasets[0].data = profits;
//       chart1.update();

//       // Assuming the JSON file contains this data structure
//       // Here you would adjust based on the actual structure you have
//       if (data.totalOrderPercentageByGender) {
//         chart2.data.labels = data.totalOrderPercentageByGender.labels;
//         chart2.data.datasets[0].data = data.totalOrderPercentageByGender.data;
//         chart2.update();
//       }
//     })
//     .catch(error => console.error('Error fetching the data:', error));
// });


// contoh yang hampir 
document.addEventListener('DOMContentLoaded', function () {
  // Create a function to create and update charts
  function createChart(elementId, type, data) {
    let element = document.getElementById(elementId);
    let chart = new Chart(element, {
      type: type,
      options: {
        animation: false,
        plugins: {
          legend: {
            display: type === 'pie' ? true : false
          },
          tooltip: {
            enabled: type === 'pie' ? true : false
          }
        }
      },
      data: data
    });
    return chart;
  }

  // Total Profit by Country (Bar Chart)
  let chart1 = createChart('totalprofitbycountry', 'bar', {
    labels: [],
    datasets: [
      {
        label: 'Profit by Country',
        data: [],
        backgroundColor: ['#097169', '#14978C', '#78D3CC']
      }
    ]
  });

  // Total Order Percentage by Gender (Pie Chart)
  let chart2 = createChart('totalOrderPercentagebyGender', 'pie', {
    labels: ["male", "female"],
    datasets: [
      {
        label: 'Order Percentage by Gender',
        data: [52.3, 47.7],
        backgroundColor: ['#097169', '#44A8A0']
      }
    ]
  });

  // Fetch data from JSON file and update charts
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);

      // Process and update profit data
      let profitData = {};

      data.forEach(item => {
        const country = item.Country;
        const profit = parseFloat(item.Profit);

        if (profitData[country]) {
          profitData[country] += profit;
        } else {
          profitData[country] = profit;
        }
      });

      console.log('Processed profit data:', profitData);

      const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

      const countries = sortedData.map(entry => entry[0]);
      const profits = sortedData.map(entry => entry[1]);

      console.log('Sorted countries:', countries);
      console.log('Sorted profits:', profits);

      // Update chart1 with processed data
      chart1.data.labels = countries;
      chart1.data.datasets[0].data = profits;
      console.log('Chart1 data labels:', chart1.data.labels);
      console.log('Chart1 data dataset:', chart1.data.datasets[0].data);
      chart1.update();

      // Assuming the JSON file contains this data structure
      // Here you would adjust based on the actual structure you have
      if (data.totalOrderPercentageByGender) {
        chart2.data.labels = data.totalOrderPercentageByGender.labels;
        chart2.data.datasets[0].data = data.totalOrderPercentageByGender.data;
        console.log('Chart2 data labels:', chart2.data.labels);
        console.log('Chart2 data dataset:', chart2.data.datasets[0].data);
        chart2.update();
      }
    })
    .catch(error => console.error('Error fetching the data:', error));
});








// contoh kak irfai
