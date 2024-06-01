function loadChart5(stateFiltersValues, countryFiltersValues, subCategoryValues, dateRangeFilterValues) {
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

            // Menghitung total order untuk setiap color
            let orderData = {};

            filteredData.forEach(item => {
                const color = item.Color;
                const gender = item.Customer_Gender;
                const order = parseFloat(item.Order_Quantity);

                if (!orderData[color]) {
                    orderData[color] = {
                        'Male': 0,
                        'Female': 0
                    };
                }

                orderData[color][gender] += order;
            });

            // Mengurutkan data berdasarkan total order untuk setiap warna
            const sortedColors = Object.keys(orderData).sort((a, b) => {
                const totalOrderA = orderData[a]['Male'] + orderData[a]['Female'];
                const totalOrderB = orderData[b]['Male'] + orderData[b]['Female'];
                return totalOrderB - totalOrderA;
            });

            // Mengambil label colors
            const colors = sortedColors;

            // Mengambil data order untuk masing-masing gender
            const maleOrders = colors.map(color => orderData[color]['Male']);
            const femaleOrders = colors.map(color => orderData[color]['Female']);

            // reload chart
            let chartId = 'chart5';
            destroyChart(chartId)

            // Membuat double bar chart
            const ctx = document.getElementById(chartId).getContext('2d');
            const chart5 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: colors,
                    datasets: [
                        {
                            label: 'Male',
                            data: maleOrders,
                            backgroundColor: '#1f6f6f',
                            borderColor: '#1f6f6f',
                            borderWidth: 1
                        },
                        {
                            label: 'Female',
                            data: femaleOrders,
                            backgroundColor: '#54a1a1',
                            borderColor: '#54a1a1',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    indexAxis: 'x', // Mengatur sumbu X sebagai sumbu kategori
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Colors'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Order'
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                            formatter: (value, context) => {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');; // Menampilkan nilai
                            },
                            color: 'black',
                            font: {
                                weight: 'normal'
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(error => console.error('Error fetching the data:', error));
};

loadChart5()