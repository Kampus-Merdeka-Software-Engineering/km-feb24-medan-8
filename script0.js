// Mengambil data dari file JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Menghitung total profit untuk setiap country
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

        // Mengonversi objek menjadi array untuk diurutkan berdasarkan total profit
        const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

        // Membuat array untuk sumbu X dan Y
        const countries = sortedData.map(entry => entry[0]);
        const profits = sortedData.map(entry => entry[1]);

        // Membuat diagram batang
        const ctx = document.getElementById('chart0').getContext('2d');
        const chart0 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Total Profit',
                    data: profits,
                    backgroundColor: 'rgba(31, 111, 111, 1)', 
                    borderColor: 'rgba(31, 111, 111, 1)', 
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: false,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: 'black',
                        formatter: (value) => '€' + value.toFixed(2) // Tambahkan simbol Euro (€) ke nilai profit
                    }
                },
                indexAxis: 'x', 
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Profit'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Country'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    })
    .catch(error => console.error('Error fetching the data:', error));