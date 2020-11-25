$(document).on('turbolinks:load', function() {
  const labels = document.querySelector('.color-labels')

  if (labels) {
    const redLabel = document.getElementById('red-label')
    const whiteLabel = document.getElementById('white-label')
    const roseLabel = document.getElementById('rose-label')
    const wineColor = labels.dataset.color

    const toggleLabels = (thisElement) => {
      thisElement.classList.add("selected")
      Array
        .from(labels.children)
        .filter(function(e) { return e.id != thisElement.id })
        .forEach(element => {
          element.classList.remove("selected")
        })
    }

    const toggleValue = (clickedLabel) => {
      const input = document.getElementById("wine_color")

      if (clickedLabel.id == "red-label") {
        input.value = "Rouge"
      } else if (clickedLabel.id == "white-label") {
        input.value = "Blanc"
      } else if (clickedLabel.id == "rose-label") {
        input.value = "Rosé"
      }
    }

    const updateInput = (thisElement) => {
      if (!thisElement.classList.contains("selected")) {
        toggleLabels(thisElement)
      }
      toggleValue(thisElement);
    }


    if (wineColor === 'Rouge') {
      toggleLabels(redLabel)
      toggleValue(redLabel)
    } else if (wineColor === 'Blanc') {
      toggleLabels(whiteLabel)
      toggleValue(whiteLabel)
    } else if (wineColor === 'Rosé') {
      toggleLabels(roseLabel)
      toggleValue(roseLabel)
    }

    Array.from(labels.children).forEach(element => {
      element.addEventListener('click', function() {
        updateInput(this)
      })
    })
  }
})
