// Mengambil data dari file JSON
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Menghitung total profit untuk setiap country
    let profitData = {};

    data.forEach((item) => {
      const country = item.Country;
      const profit = parseFloat(item.Profit);

      if (profitData[country]) {
        profitData[country] += profit;
      } else {
        profitData[country] = profit;
      }
    });

    // Mengonversi objek menjadi array untuk diurutkan berdasarkan total profit
    const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

    // Membuat array untuk sumbu X dan Y
    const countries = sortedData.map((entry) => entry[0]);
    const profits = sortedData.map((entry) => entry[1]);

    // Membuat diagram batang
    const ctx = document.getElementById("chart0").getContext("2d");
    const chart0 = new Chart(ctx, {
      type: "bar",
      data: {
        labels: countries,
        datasets: [
          {
            label: "Total Profit",
            data: profits,
            backgroundColor: "rgba(31, 111, 111, 1)",
            borderColor: "rgba(31, 111, 111, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            anchor: "end",
            align: "end",
            color: "black",
            formatter: (value) => {
              // Format angka dengan titik setiap 3 digit
              return (
                "€" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              );
            },
          },
        },
        indexAxis: "x",
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Profit",
            },
          },
          x: {
            title: {
              display: true,
              text: "Countries",
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  })
  .catch((error) => console.error("Error fetching the data:", error));
