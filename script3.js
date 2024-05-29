// Mengambil data dari file JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Menghitung total order untuk setiap gender
    let orderData = {};

    data.forEach(item => {
      const gender = item.Customer_Gender;
      const order = parseFloat(item.Order_Quantity);

      if (orderData[gender]) {
        orderData[gender] += order;
      } else {
        orderData[gender] = order;
      }
    });

    // Menghitung total order keseluruhan
    const totalOrders = Object.values(orderData).reduce((sum, order) => sum + order, 0);

    // Mengonversi objek menjadi array untuk diurutkan berdasarkan total order
    const sortedData = Object.entries(orderData).sort((a, b) => b[1] - a[1]);

    // Membuat array untuk labels (genders) dan data (orders)
    const genders = sortedData.map(entry => entry[0]);
    const percentages = sortedData.map(entry => ((entry[1] / totalOrders) * 100).toFixed(2));

    // Definisi warna
    const colors = ['#1f6f6f', '#54a1a1'];

    // Membuat array warna yang sesuai dengan jumlah data
    const backgroundColors = percentages.map((_, index) => colors[index % colors.length]);

    // Membuat diagram pie
    const ctx = document.getElementById('chart3').getContext('2d');
    const chart3 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: genders,
        datasets: [{
          label: 'Order Percentage',
          data: percentages,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
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