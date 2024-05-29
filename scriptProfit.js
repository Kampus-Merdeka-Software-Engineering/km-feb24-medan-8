// Variable untuk menampung data dari json
let data = [];

// Ambil Data dari json
async function loadData() {
  try {
    const response = await fetch("./bike_sales_cleaning.json");
    data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Fungsi Utama
async function main() {
  //   Memanggil fungsi loadData()
  await loadData();

  // Menghitung Total Profit
  let total = 0;
  data.forEach((item) => {
    // Mengubah menjadi tipe data float
    const profit = parseFloat(item.Profit);
    // Menambahkan total profit
    total += profit;
  });

  console.log(total);

  const p = document.getElementById("total-profit");
  p.innerHTML = `Total Profit: ${total}`;
}

// Memanggil fungsi main()
main();
