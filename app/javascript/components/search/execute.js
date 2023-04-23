function executeSearch() {
  const searchForm = document.querySelector(".search-form");
  const indexItems = document.querySelector(".index-items");

  const path = window.location.pathname

  const winesPathRegExp = RegExp("/wines")
  const recipesPathRegExp = RegExp("/recipes")

  const adminPathRegExp = RegExp("/admin/")

  let queryElements = []
  const queryDataset = searchForm.dataset

  for (var queryData in queryDataset) {
    queryElements.push(queryDataset[queryData])
  }

  const query = "/queried_index?" + queryElements.join("&")


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

export { executeSearch }
