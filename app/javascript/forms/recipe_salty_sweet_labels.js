$(document).on('turbolinks:load', function() {
  const labels = document.querySelector('.salty-sweet-labels')

  if (labels) {
    const saltyLabel = document.getElementById('salty-label')
    const sweetLabel = document.getElementById('sweet-label')
    const recipeIsSweet = labels.dataset.isSweet

    const toggleLabels = (thisElement, otherElement) => {
      thisElement.classList.add("selected")
      otherElement.classList.remove("selected")
    }

    const updateInput = (thisElement, otherElement) => {
      if (!thisElement.classList.contains("selected")) {
        toggleLabels(thisElement, otherElement)
      }
      toggleValue(thisElement);
    }

    const toggleValue = (clickedLabel) => {
      const input = document.getElementById("recipe_is_sweet")

      if (clickedLabel.id == "salty-label") {
        input.value = false
      } else if (clickedLabel.id == "sweet-label") {
        input.value = true
      }
    }

    if (recipeIsSweet === 'true') {
      toggleLabels(sweetLabel, saltyLabel)
    } else {
      toggleLabels(saltyLabel, sweetLabel)
    }

    saltyLabel.addEventListener('click', function() {
      updateInput(this, sweetLabel)
    })

    sweetLabel.addEventListener('click', function() {
      updateInput(this, saltyLabel)
    })
  }
})
