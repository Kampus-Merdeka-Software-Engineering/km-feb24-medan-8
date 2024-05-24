// Mengambil data dari file JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Menghitung total order untuk setiap ageGroup
        let orderData = {};

        data.forEach(item => {
            const ageGroup = item.Age_Group;
            const order = parseFloat(item.Order_Quantity);

            if (orderData[ageGroup]) {
                orderData[ageGroup] += order;
            } else {
                orderData[ageGroup] = order;
            }
        });

        // Mengonversi objek menjadi array untuk diurutkan berdasarkan total order
        const sortedData = Object.entries(orderData).sort((a, b) => b[1] - a[1]);

        // Membuat array untuk sumbu X dan Y
        const ageGroups = sortedData.map(entry => entry[0]);
        const orders = sortedData.map(entry => entry[1]);

        // Membuat diagram batang
        const ctx = document.getElementById('chart4').getContext('2d');
        const chart4 = new Chart(ctx, {
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
                indexAxis: 'y', 
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
                            text: 'States'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Menyembunyikan legenda
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the data:', error));