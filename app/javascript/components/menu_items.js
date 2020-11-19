require("jquery")

$(document).on('turbolinks:load', function() {
  const menuButton = document.querySelector(".menu-button")

  menuButton.addEventListener('click', function() {
    const menu = document.querySelector(".menu")
    const menuPopUps = menu.getElementsByClassName("pop-up")

    Array.prototype.forEach.call(menuPopUps, (item) => {
      item.classList.toggle("display-none")
      item.classList.toggle("display-block")
    })
  })
})
