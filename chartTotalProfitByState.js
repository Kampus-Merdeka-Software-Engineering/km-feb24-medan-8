function loadTotalProfitByState(
  stateFiltersValues,
  countryFiltersValues,
  subCategoryValues,
  dateRangeFilterValues
) {
  // Mengambil data dari file JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredData = processFilter(
        data,
        stateFiltersValues || [],
        countryFiltersValues || [],
        subCategoryValues || [],
        dateRangeFilterValues || []
      );

      // Menghitung total profit untuk setiap state
      let profitData = {};

      filteredData.forEach((item) => {
        const state = item.State;
        const profit = parseFloat(item.Profit);

        if (profitData[state]) {
          profitData[state] += profit;
        } else {
          profitData[state] = profit;
        }
      });

      // Mengonversi objek menjadi array untuk diurutkan berdasarkan total profit
      const sortedData = Object.entries(profitData).sort(
        (firstData, secondData) => secondData[1] - firstData[1]
      );

      // Membuat array untuk sumbu X dan Y
      const states = sortedData.map((entry) => entry[0]);
      const profits = sortedData.map((entry) => entry[1]);
      // reload chart
      let chartId = "chart-total-profit-by-state";
      destroyChart(chartId);

      // Membuat diagram batang horizontal
      const ctx = document.getElementById(chartId).getContext("2d");
      const chartTotalProfitByState = new Chart(ctx, {
        type: "bar",
        data: {
          labels: states,
          datasets: [
            {
              label: "Total Profit",
              data: profits,
              backgroundColor: "#1f6f6f",
              borderColor: "#1f6f6f",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          indexAxis: "y", // Mengatur orientasi sumbu X dan Y
          scales: {
            x: {
              title: {
                display: true,
                text: "Total Profit",
              },
              ticks: {
                stepSize: 600000, // Mengatur skala setiap 600.000 total profit
              },
            },
            y: {
              title: {
                display: true,
                text: "States",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              anchor: "end",
              align: "end",
              clamp: false,
              formatter: (value, context) => {
                return (
                  "€" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                );
              },
              color: "black",
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    })
    .catch((error) => console.error("Error fetching the data:", error));
}

loadTotalProfitByState();
