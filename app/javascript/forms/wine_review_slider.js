import Rails from "@rails/ujs";

$(document).on('turbolinks:load', function() {
  const wineReviewContainers = document.querySelectorAll(".wine-review-container")
  const sliders = document.querySelectorAll("input[type='range']")
  const rangeValues = document.querySelectorAll(".wine-review-value")
  const hiddenInputs = document.querySelectorAll("input.hidden")

  Array.from(wineReviewContainers).forEach((element, index) => {
    if (!(sliders[index].value)) {
      sliders[index].value = 5
    }
    rangeValues[index].innerText = sliders[index].value

    sliders[index].addEventListener('input', function() {
      rangeValues[index].innerText = this.value
    })

    $.ajax({
      type: 'GET',
      url: `/admin/reviewers/${hiddenInputs[index].value}`,
      success: function(reviewer) {
        element.querySelector("h4").innerText = reviewer.name
      }
    });

    if (hiddenInputs[index].value === "1") {
      sliders[index].classList.add("alice-slider")
    } else if (hiddenInputs[index].value === "2") {
      sliders[index].classList.add("hugo-slider")
    }
  })


})
