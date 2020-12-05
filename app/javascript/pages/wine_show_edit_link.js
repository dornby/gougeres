require("jquery")

$(document).on('turbolinks:load', function() {
  const pathRegExp = RegExp('wines/((?=[^new])[A-Za-z0-9\-\_]+)$')
  const path = window.location.pathname

  if (pathRegExp.test(path)) {
    const editButton = document.getElementById("menu-edit")
    const editLink = editButton.getElementsByTagName("a")[0]

    const pathElements = path.split("/")
    const id = pathElements[pathElements.length - 1]

    editLink.href = (`/admin/wines/${id}/edit`)
  }
})
