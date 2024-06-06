function loadChart2(stateFiltersValues, countryFiltersValues, subCategoryValues, dateRangeFilterValues) {
  // Mengambil data dari file JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {

      let filteredData = processFilter(data,
        stateFiltersValues || [],
        countryFiltersValues || [],
        subCategoryValues || [],
        dateRangeFilterValues || []
      )

      // Menghitung total profit untuk setiap subCategory
      let profitData = {};

      filteredData.forEach(item => {
        const subCategory = item.Sub_Category;
        const profit = parseFloat(item.Profit);

        if (profitData[subCategory]) {
          profitData[subCategory] += profit;
        } else {
          profitData[subCategory] = profit;
        }
      });

      // Menghitung total profit keseluruhan
      const totalProfit = Object.values(profitData).reduce((sum, profit) => sum + profit, 0);

      // Mengonversi objek menjadi array untuk diurutkan berdasarkan total profit
      const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

      // Membuat array untuk labels (subCategories) dan data (profits)
      const subCategories = sortedData.map(entry => entry[0]);
      const percentages = sortedData.map(entry => ((entry[1] / totalProfit) * 100).toFixed(2));

      // Definisi warna
      const colors = ['#1f6f6f', '#54a1a1', '#9fc8c8'];

      // Membuat array warna yang sesuai dengan jumlah data
      const backgroundColors = percentages.map((_, index) => colors[index % colors.length]);

      // reload chart
      let chartId = 'chart2';
      destroyChart(chartId)

      // Membuat diagram doughnut
      const ctx = document.getElementById(chartId).getContext('2d');
      const chart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: subCategories,
          datasets: [{
            label: 'Profit Percentage',
            data: percentages,
            backgroundColor: backgroundColors,
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'right', // Atur posisi legenda di sebelah kanan
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.label + ': ' + context.raw + '%';
                }
              }
            },
            datalabels: {
              formatter: (value, context) => {
                return value + '%'; // Menampilkan nilai dengan persentase
              },
              color: 'white',
              borderRadius: 3,
              font: {
                weight: 'normal'
              },
              anchor: 'center',
              align: 'center'
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    })
    .catch(error => console.error('Error fetching the data:', error));
};

loadChart2()