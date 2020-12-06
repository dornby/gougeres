$(document).on('turbolinks:load', function() {
  const labels = document.querySelectorAll('.process-label')

  if (labels.length > 0) {
    const toggleClass = (thisElement) => {
      thisElement.classList.toggle("selected")
    }

    const toggleValue = (hiddenInput) => {
      if (hiddenInput.value === "true") {
        hiddenInput.value = "false"
      } else {
        hiddenInput.value = "true"
      }
    }

    const updateInput = (thisElement, hiddenInput) => {
      toggleClass(thisElement)
      toggleValue(hiddenInput)
    }

    labels.forEach(label => {
      const hiddenInput = document.getElementById(`wine_is_${label.id.split("-")[0]}`)

      if (label.dataset.selected === "true") {
        toggleClass(label)
        toggleValue(hiddenInput)
      }

      label.addEventListener('click', function() {
        updateInput(this, hiddenInput)
      })

    })
  }
})
