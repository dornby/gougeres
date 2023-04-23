import { executeSearch } from "components/search/execute"

$(document).on("turbolinks:load", function() {
  const searchForm = document.querySelector(".search-form");

  if (searchForm) {
    const saltyLabel = document.getElementById("salty-label");
    const sweetLabel = document.getElementById("sweet-label");

    if (saltyLabel && sweetLabel) {
      saltyLabel.addEventListener("click", () => {
        saltyLabel.classList.toggle("selected")
        searchForm.dataset.querySavour = getSavourQueryValue(saltyLabel, sweetLabel)
        executeSearch()
      })

      sweetLabel.addEventListener("click", () => {
        sweetLabel.classList.toggle("selected")
        searchForm.dataset.querySavour = getSavourQueryValue(saltyLabel, sweetLabel)
        executeSearch()
      })
    }
  }
});

function getSavourQueryValue(saltyLabel, sweetLabel) {
  if (saltyLabel.classList.contains("selected") && sweetLabel.classList.contains("selected")) {
    var savour = null
  } else if ((!saltyLabel.classList.contains("selected") && !sweetLabel.classList.contains("selected"))) {
    var savour = null
  } else if (saltyLabel.classList.contains("selected")) {
    var savour = "salty"
  } else {
    var savour = "sweet"
  }

  if (savour) {
    return `savour=${savour}`
  } else {
    return ""
  }
}
