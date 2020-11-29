require("jquery")

$(document).on('turbolinks:load', function() {
  const menuButton = document.querySelector(".menu-button")
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

  menuButton.addEventListener('mouseenter', function() {
    menuButton.classList.remove("invisible")
    menuButton.classList.add("visible")
    Array.prototype.forEach.call(menuPopUps, (item) => {
      if (booleanise(item.dataset.menuOpen)) {
        item.classList.remove("invisible")
        item.classList.add("slided-up")
      }
    })
  })

  let last_known_scroll_position = 0

  window.addEventListener('scroll', function() {
    const previous_scroll_position = last_known_scroll_position
    last_known_scroll_position = window.scrollY;

    const scrollThreshold = () => {
      if (window.innerWidth > 1200) {
        return 100
      } else {
        return 300
      }
    }

    if (previous_scroll_position < last_known_scroll_position && last_known_scroll_position > scrollThreshold()) { // scroll down
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
