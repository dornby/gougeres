import { executeSearch } from "components/search/execute"

$(document).on("turbolinks:load", function() {
  const searchForm = document.querySelector(".search-form");

  if (searchForm) {
    const searchBar = document.querySelector(".search-bar");

    searchBar.addEventListener("input", () => {
      if (searchBar.value != "") {
        searchForm.dataset.queryText = `q=${searchBar.value}`
      } else {
        searchForm.dataset.queryText = ""
      }

      executeSearch()
    })
  }
});
