$(document).on("turbolinks:load", function() {
  const searchForm = document.querySelector(".search-form");

  if (searchForm) {
    const searchBar = document.querySelector(".search-bar");
    const saltyLabel = document.getElementById("salty-label");
    const sweetLabel = document.getElementById("sweet-label");

    const indexItems = document.querySelector(".index-items");

    const path = window.location.pathname

    const winesPathRegExp = RegExp("/wines")
    const recipesPathRegExp = RegExp("/recipes")

    const adminPathRegExp = RegExp("/admin/")

    searchBar.addEventListener("input", () => executeSearch(searchBar, saltyLabel, sweetLabel))

    saltyLabel.addEventListener("click", () => {
      saltyLabel.classList.toggle("selected")
      executeSearch(searchBar, saltyLabel, sweetLabel)
    })

    sweetLabel.addEventListener("click", () => {
      sweetLabel.classList.toggle("selected")
      executeSearch(searchBar, saltyLabel, sweetLabel)
    })

    function executeSearch(searchBar, saltyLabel = null, sweetLabel = null) {
      let query = `/queried_index?q=${searchBar.value}`

      if (saltyLabel && sweetLabel) {
        if (saltyLabel.classList.contains("selected") && sweetLabel.classList.contains("selected")) {
          var savour = null
        } else if ((!saltyLabel.classList.contains("selected") && !sweetLabel.classList.contains("selected"))) {
          var savour = null
        } else if (saltyLabel.classList.contains("selected")) {
          var savour = "salty"
        } else {
          var savour = "sweet"
        }

        query += `&savour=${savour}`
      }

      let pathObject

      if (winesPathRegExp.test(path)) {
        pathObject = "wines"
      } else if (recipesPathRegExp.test(path)) {
        pathObject = "recipes"
      }

      function resultToInsert(result) {
        if (adminPathRegExp.test(path)) {
          return `<div class="index-item"><h4><a href="/admin/${pathObject}/${result.id}/edit">${result.name}</a></h4></div>`
        } else {
          return `<div class="index-item"><h4><a href="/${pathObject}/${result.slug}">${result.name}</a></h4></div>`
        }
      }

      $.ajax({
        type: "GET",
        url: `/` + pathObject + query,
        success: function(results) {
          indexItems.innerHTML = ""
          for (let letter in results) {
            indexItems.insertAdjacentHTML(
              "beforeend",
              `<h2>${letter}</h2>`
            )
            results[letter].forEach(result => {
              indexItems.insertAdjacentHTML(
                "beforeend",
                resultToInsert(result)
              )
            })
          }
        }
      });
    }
  }
});
