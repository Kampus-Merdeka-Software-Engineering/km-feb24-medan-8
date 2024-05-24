// Mengambil data dari file JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Menghitung total profit untuk setiap state
        let profitData = {};

        data.forEach(item => {
            const state = item.State;
            const profit = parseFloat(item.Profit);

            if (profitData[state]) {
                profitData[state] += profit;
            } else {
                profitData[state] = profit;
            }
        });

        // Mengonversi objek menjadi array untuk diurutkan berdasarkan total profit
        const sortedData = Object.entries(profitData).sort((a, b) => b[1] - a[1]);

        // Membuat array untuk sumbu X dan Y
        const states = sortedData.map(entry => entry[0]);
        const profits = sortedData.map(entry => entry[1]);

        // Membuat diagram batang horizontal
        const ctx = document.getElementById('chart1').getContext('2d');
        const chart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: states,
                datasets: [{
                    label: 'Total Profit',
                    data: profits,
                    backgroundColor: '#1f6f6f', 
                    borderColor: '#1f6f6f', 
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Mengatur orientasi sumbu X dan Y
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Total Profit'
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'States'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the data:', error));