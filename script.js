let stateFilters = [];
let countryFilters = [];
let subCategoryFilters = [];
let dateRangeFilter = [];

const countryToStatesMap = {
  Germany: ["Bayern", "Hessen", "Nordrhein-Westfalen", "Saarland", "Hamburg", "Brandenburg"],
  France: ["Nord", "Seine (Paris)", "Seine Saint Denis", "Yveline", "Essonne", "Hauts de Seine", "Seine et Marne", "Loiret", "Moselle", "Garonne (Haute)", "Val d'Oise", "Val de Marne", "Charente-Maritime", "Loir et Cher", "Somme", "Pas de Calais"],
  "United Kingdom": ["England"],
};

function handleOnCountryFilter(element) {
  countryFilters = updateFilter(element, countryFilters);
  updateStateFiltersBasedOnCountry();
  reloadAllCharts();
}

function handleOnStateFilter(element) {
  stateFilters = updateFilter(element, stateFilters);
  reloadAllCharts();
}

function updateStateFiltersBasedOnCountry() {
  let stateCheckboxes = document.querySelectorAll(
    'input[type=checkbox][name="state"]'
  );
  stateCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = true;
  });

  countryFilters.forEach((country) => {
    let states = countryToStatesMap[country] || [];
    states.forEach((state) => {
      let checkbox = document.querySelector(
        `input[type=checkbox][name="state"][value="${state}"]`
      );
      if (checkbox) {
        checkbox.checked = true;
        checkbox.disabled = false;
        stateFilters = updateFilter(checkbox, stateFilters);
      }
    });
  });
}

function handleOnSubCategoryFilter(element) {
  subCategoryFilters = updateFilter(element, subCategoryFilters);
  reloadAllCharts();
}

function handleOnChangeDateRange(element) {
  dateRangeFilter = getDateRange(element);
  reloadAllCharts();
}

function reloadAllCharts() {
  loadChartTotalProfitByCountry(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  loadChartTotalProfitByState(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  loadChartTotalProfitPercentageBySubCategoryProduct(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  loadChartTotalOrderPercentageByGender(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  loadChartTotalOrderByAgeGroup(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  loadChartCustomerTotalOrderByColorProduct(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  calculateTotalProfit(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
  calculateTotalOrder(
    stateFilters,
    countryFilters,
    subCategoryFilters,
    dateRangeFilter
  );
}

function getDateRange() {
  let startDate = document.getElementById("startDate").value || "1900-01-01";
  let endDate = document.getElementById("endDate").value || "1900-01-01";

  return [startDate, endDate];
}

function updateFilter(element, filtersSelector) {
  let filterValue = element.value;
  if (element.checked) {
    filtersSelector.push(filterValue);
    return filtersSelector;
  }

  return filtersSelector.filter((item) => item !== filterValue);
}

function processFilter(data, states, countries, subCategories, dateRange) {
  return data.filter((countryData) => {
    let stateFilter =
      states.length == 0 ? true : states.includes(countryData["State"]);
    let countryFilter =
      countries.length == 0 ? true : countries.includes(countryData["Country"]);
    let subCategoryFilter =
      subCategories.length == 0
        ? true
        : subCategories.includes(countryData["Sub_Category"]);
    let dateRangeFilter =
      dateRange.length == 0 ? true : isOnDateRange(countryData, dateRange);

    return stateFilter && countryFilter && subCategoryFilter && dateRangeFilter;
  });
}

function isOnDateRange(countryData, dateRange) {
  if (dateRange.length != 2) return true;

  let startDate = new Date(dateRange[0]);
  let endDate = new Date(dateRange[1]);

  if (startDate > endDate) return true;

  return (
    parseDate(countryData["Date"]) > startDate &&
    parseDate(countryData["Date"]) < endDate
  );
}

function destroyChart(chartId) {
  let chartStatus = Chart.getChart(chartId);
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// Definisikan batas tanggal di luar fungsi event listener
const StartDate = new Date("2011-01-01");
const EndDate = new Date("2016-06-30");

// Fungsi untuk memvalidasi tanggal
function validateDate(selectedDate, defaultValue) {
  if (selectedDate < StartDate || selectedDate > EndDate) {
    alert(
      "Data is not available. Please select a date between 1 January 2011 to 30 June 2016"
    );
    return defaultValue;
  }
  return selectedDate.toISOString().split("T")[0]; // Mengembalikan tanggal dalam format yyyy-mm-dd
}

// Fungsi untuk memeriksa apakah startDate lebih besar dari endDate dan mengatur tanggal default
function checkDateRange() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;

  if (startDateValue && endDateValue) {
    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    if (startDate > endDate) {
      alert("Start date cannot be later than end date.");
      startDateInput.value = "2011-01-01";
      endDateInput.value = "2016-06-30";
    }
  }
}

// Event listener untuk startDate
document.getElementById("startDate").addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  this.value = validateDate(selectedDate, "2011-01-01");
  checkDateRange();
});

// Event listener untuk endDate
document.getElementById("endDate").addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  this.value = validateDate(selectedDate, "2016-06-30");
  checkDateRange();
});

window.onload = function () {
  let countryCheckboxes = document.querySelectorAll(
    'input[type=checkbox][name="country"]'
  );
  let stateCheckboxes = document.querySelectorAll(
    'input[type=checkbox][name="state"]'
  );
  let subcategoryCheckboxes = document.querySelectorAll(
    'input[type=checkbox][name="subcategory"]'
  );

  countryCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
    handleOnCountryFilter(checkbox);
  });

  stateCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
    handleOnStateFilter(checkbox);
  });

  subcategoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
    handleOnSubCategoryFilter(checkbox);
  });
};