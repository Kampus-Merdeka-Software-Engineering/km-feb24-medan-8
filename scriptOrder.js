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

  // Menghitung Total Order_Quantity
  let total = 0;
  data.forEach((item) => {
    // Mengubah menjadi tipe data float
    const Order_Quantity = parseFloat(item.Order_Quantity);
    // Menambahkan total Order_Quantity
    total += Order_Quantity;
  });

  console.log(total);

  const p = document.getElementById("total-Order_Quantity");
  p.innerHTML = `Total Order_Quantity: ${total}`;
}

// Memanggil fungsi main()
main();
