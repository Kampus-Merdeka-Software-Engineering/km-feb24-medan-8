// Fungsi untuk membaca file JSON dan menghitung total profit
function calculateTotalProfit(
  stateFiltersValues,
  countryFiltersValues,
  subCategoryValues,
  dateRangeFilterValues
) {
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

      let totalProfit = 0;

      // Menghitung total profit berdasarkan checkbox yang dipilih
      filteredData.forEach((item) => {
        {
          totalProfit += parseFloat(item.Profit);
        }
      });
      const formattedProfit = totalProfit.toLocaleString("de-DE");

      document.getElementById("profitResult").innerText = `€${formattedProfit}`;
    });
}
calculateTotalProfit();

function calculateTotalOrder(
  stateFiltersValues,
  countryFiltersValues,
  subCategoryValues,
  dateRangeFilterValues
) {
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

      let totalOrder = 0;

      // Menghitung total profit berdasarkan checkbox yang dipilih
      filteredData.forEach((item) => {
        {
          totalOrder += parseFloat(item.Order_Quantity);
        }
      });
      const formattedOrder = totalOrder.toLocaleString("de-DE");

      document.getElementById("orderResult").innerText = `${formattedOrder}`;
    });
}
calculateTotalOrder();
