$(document).on('turbolinks:load', function() {
  const searchBar = document.querySelector('.search-bar');

  if (searchBar) {
    const indexItems = document.querySelector('.index-items');

    const path = window.location.pathname

    const winesPathRegExp = RegExp('/wines')
    const recipesPathRegExp = RegExp('/recipes')

    const adminPathRegExp = RegExp('/admin/')

    searchBar.addEventListener('input', function() {
      const query = searchBar.value

      let pathObject

      if (winesPathRegExp.test(path)) {
        pathObject = "wines"
      } else if (recipesPathRegExp.test(path)) {
        pathObject = "recipes"
      }

      let resultToInsert = (result) => {
        if (adminPathRegExp.test(path)) {
          return `<div class="index-item"><h4><a href="/admin/${pathObject}/${result.id}/edit">${result.name}</a></h4></div>`
        } else {
          return `<div class="index-item"><h4><a href="/${pathObject}/${result.slug}">${result.name}</a></h4></div>`
        }
      }

      $.ajax({
        type: 'GET',
        url: `/` + pathObject + `/queried_index?q=` + query,
        success: function(results) {
          indexItems.innerHTML = ""
          for (let letter in results) {
            indexItems.insertAdjacentHTML(
              'beforeend',
              `<h2>${letter}</h2>`
            )
            results[letter].forEach(result => {
              indexItems.insertAdjacentHTML(
                'beforeend',
                resultToInsert(result)
              )
            })
          }
        }
      });
    })
  }
});
