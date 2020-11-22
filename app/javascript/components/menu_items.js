require("jquery")

$(document).on('turbolinks:load', function() {
  const menuButton = document.querySelector(".menu-button")
  const hoverTrap = document.querySelector(".hover-trap")
  const menu = document.querySelector(".menu")
  const menuPopUps = menu.getElementsByClassName("pop-up")
  const booleanise = (e) => { return e === "true" }

  menuButton.addEventListener('click', function() {
    Array.prototype.forEach.call(menuPopUps, (item) => {
      item.classList.toggle("invisible")
      item.classList.toggle("slided-up")
      item.dataset.menuOpen = !booleanise(item.dataset.menuOpen)
    })
  })

  let last_known_scroll_position = 0
  let ticking = false;

  window.addEventListener('scroll', function(e) {
    const previous_scroll_position = last_known_scroll_position
    last_known_scroll_position = window.scrollY;

    if (previous_scroll_position < last_known_scroll_position) { // scroll down
      menuButton.classList.remove("visible")
      menuButton.classList.add("invisible")
      Array.prototype.forEach.call(menuPopUps, (item) => {
        if (booleanise(item.dataset.menuOpen)) {
          item.classList.remove("slided-up")
          item.classList.add("invisible")
        }
      })
    } else if (previous_scroll_position > last_known_scroll_position) { // scroll up
      menuButton.classList.remove("invisible")
      menuButton.classList.add("visible")
      Array.prototype.forEach.call(menuPopUps, (item) => {
        if (booleanise(item.dataset.menuOpen)) {
          item.classList.remove("invisible")
          item.classList.add("slided-up")
        }
      })
    }
  })
})
