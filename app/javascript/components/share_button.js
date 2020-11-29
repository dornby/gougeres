require("jquery")

$(document).on('turbolinks:load', function() {
  if (window.innerHeight > window.innerWidth && navigator.share) {
    const recipeShowPathRegExp = RegExp('recipes/((?=[^new])[A-Za-z0-9\-\_]+)$')
    const wineShowPathRegExp = RegExp('recipes/((?=[^new])[A-Za-z0-9\-\_]+)$')
    const path = window.location.pathname

    if (recipeShowPathRegExp.test(path) || wineShowPathRegExp.test(path)) {

      const shareButton = document.querySelector(".share-button")
      const share = document.querySelector(".share")

      share.classList.remove('click-through')
      shareButton.classList.add('visible')

      shareButton.addEventListener('click', function() {
        navigator.share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        })
      })

      let last_known_scroll_position = 0

      window.addEventListener('scroll', function() {
        const previous_scroll_position = last_known_scroll_position
        last_known_scroll_position = window.scrollY;

        if (previous_scroll_position < last_known_scroll_position && last_known_scroll_position > 300) { // scroll down
          shareButton.classList.remove("visible")
          shareButton.classList.add("invisible")
        } else if (previous_scroll_position > last_known_scroll_position) { // scroll up
          shareButton.classList.remove("invisible")
          shareButton.classList.add("visible")
        }
      })
    }
  }
})
