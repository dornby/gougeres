require("jquery")

$(document).on('turbolinks:load', function() {
  const pathRegExp = RegExp('recipes/((?=[^new])[A-Za-z0-9\-\_]+)$')
  const path = window.location.pathname

  if (pathRegExp.test(path)) {
    const editButton = document.getElementById("menu-edit")
    const editLink = editButton.getElementsByTagName("a")[0]

    const pathElements = path.split("/")
    const friendlyId = pathElements[pathElements.length - 1]

    $.ajax({
      type: 'GET',
      url: `/admin/recipes/from_slug?q=`+ friendlyId,
      async: false,
      success: function(recipe) {
        editLink.href = (`/admin/recipes/${recipe.id}/edit`)
      }
    });
  }
})
