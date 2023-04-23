$(document).on('turbolinks:load', function() {
  const labelsToggle = document.querySelector('.salty-sweet-labels-toggle-js')
  const labels = document.querySelector('.salty-sweet-labels')

  if (labelsToggle) {
    const saltyLabel = document.getElementById('salty-label')
    const sweetLabel = document.getElementById('sweet-label')
    const recipeIsSweet = labelsToggle.dataset.isSweet

    function toggleLabels(thisElement) {
      thisElement.classList.add("selected")
      Array
        .from(labels.children)
        .filter(function(e) { return e.id != thisElement.id })
        .forEach(element => {
          element.classList.remove("selected")
        })
    }

    function updateInput(thisElement) {
      if (!thisElement.classList.contains("selected")) {
        toggleLabels(thisElement)
      }
      toggleValue(thisElement);
    }

    function toggleValue(clickedLabel) {
      const input = document.getElementById("recipe_is_sweet")

      if (clickedLabel.id == "salty-label") {
        input.value = false
      } else if (clickedLabel.id == "sweet-label") {
        input.value = true
      }
    }

    if (recipeIsSweet === 'true') {
      toggleLabels(sweetLabel)
      toggleValue(sweetLabel)
    } else {
      toggleLabels(saltyLabel)
      toggleValue(saltyLabel)
    }

    Array.from(labels.children).forEach(element => {
      element.addEventListener('click', function() {
        updateInput(this)
      })
    })
  }
})
