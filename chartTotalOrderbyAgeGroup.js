function loadTotalOrderbyAge(stateFiltersValues, countryFiltersValues, subCategoryValues, dateRangeFilterValues) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {

      let filteredData = processFilter(data,
        stateFiltersValues || [],
        countryFiltersValues || [],
        subCategoryValues || [],
        dateRangeFilterValues || []
      )

      // Menghitung total order untuk setiap ageGroup
      let orderData = {};

      filteredData.forEach(item => {
        const ageGroup = item.Age_Group;
        const order = parseFloat(item.Order_Quantity);

        if (orderData[ageGroup]) {
          orderData[ageGroup] += order;
        } else {
          orderData[ageGroup] = order;
        }
      });

      // Mengonversi objek menjadi array untuk diurutkan berdasarkan total order
      const sortedData = Object.entries(orderData).sort((firstData, secondData) => secondData[1] - firstData[1]);

      // Membuat array untuk sumbu X dan Y
      const ageGroups = sortedData.map(entry => entry[0]);
      const orders = sortedData.map(entry => entry[1]);

      // reload chart
      let chartId = "chart-total-order-by-age-group";
      destroyChart(chartId)

      // Membuat diagram batang
      const ctx = document.getElementById(chartId).getContext('2d');
      const chartTotalOrderbyAgeGroup = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ageGroups,
          datasets: [{
            label: 'Total Order',
            data: orders,
            backgroundColor: 'rgba(31, 111, 111, 1)',
            borderColor: 'rgba(31, 111, 111, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Order'
              },
              ticks: {
                stepSize: 800 // Mengatur skala setiap 800 total order
              }
            },
            y: {
              title: {
                display: true,
                text: 'Age Groups'
              }
            }
          },
          plugins: {
            legend: {
              display: false // Menyembunyikan legenda
            },
            datalabels: {
              anchor: 'end',
              align: 'end',
              formatter: (value, context) => {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menampilkan nilai dengan titik setiap 3 digit
              },
              color: 'black'
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    })
    .catch(error => console.error('Error fetching the data:', error));
};

loadTotalOrderbyAge()