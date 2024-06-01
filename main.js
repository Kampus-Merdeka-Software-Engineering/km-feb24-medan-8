let stateFilters = []
let countryFilters = []
let subCategoryFilters = []
let dateRangeFilter = []


function handleOnCountryFilter(element) {
    countryFilters = updateFilter(element, countryFilters)
    reloadAllCharts()
}


function handleOnStateFilter(element) {
    stateFilters = updateFilter(element, stateFilters)
    reloadAllCharts()
}

function handleOnSubCategoryFilter(element) {
    subCategoryFilters = updateFilter(element, subCategoryFilters)
    reloadAllCharts()
}

function handleOnChangeDateRange(element) {
    dateRangeFilter = getDateRange(element)
    reloadAllCharts()
}

function reloadAllCharts() {
    loadChart0(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    loadChart1(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    loadChart2(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    loadChart3(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    loadChart4(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    loadChart5(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    calculateTotalProfit(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
    calculateTotalOrder(stateFilters, countryFilters, subCategoryFilters, dateRangeFilter)
}

function getDateRange() {
    let startDate = document.getElementById("startDate").value || "1900-01-01"
    let endDate = document.getElementById("endDate").value || "1900-01-01"
    
    return [startDate, endDate]
}

function updateFilter(element, filtersSelector) {
    let filterValue = element.value
    if (element.checked) {
        filtersSelector.push(filterValue)
        return filtersSelector
    }

    return filtersSelector.filter(item => item !== filterValue)
}

function processFilter(data, states, countries, subCategories, dateRange) {

    return data.filter(countryData => {
        let stateFilter = states.length == 0 ? true : states.includes(countryData["State"])
        let countryFilter = countries.length == 0 ? true : countries.includes(countryData["Country"])
        let subCategoryFilter = subCategories.length == 0 ? true : subCategories.includes(countryData["Sub_Category"])
        let dateRangeFilter = dateRange.length == 0 ? true : isOnDateRange(countryData, dateRange)

        return stateFilter && countryFilter && subCategoryFilter && dateRangeFilter
    })
}

function isOnDateRange(countryData, dateRange) {
    if (dateRange.length != 2) return true;

    let startDate = new Date(dateRange[0])
    let endDate = new Date(dateRange[1])

    if (startDate > endDate) return true;

    return parseDate(countryData["Date"]) > startDate && parseDate(countryData["Date"]) < endDate
}

function destroyChart(chartId) {
    let chartStatus = Chart.getChart(chartId);
      if (chartStatus !== undefined) {
          chartStatus.destroy()
      }
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}
