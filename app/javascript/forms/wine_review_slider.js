$(document).on('turbolinks:load', function() {
  const wineReviewContainers = document.querySelectorAll(".wine-review-container")

  if (wineReviewContainers.length > 0) {
    const sliders = document.querySelectorAll("input[type='range']")
    const rangeValues = document.querySelectorAll(".wine-review-value")
    const wineReviewsContainer = document.querySelector('.wine-reviews-container')
    const hiddenInputs = wineReviewsContainer.querySelectorAll("input.hidden")

    const pathRegExp = RegExp('/admin/wines/[0-9]+/edit$')
    const path = window.location.pathname
    const myWineReviews = []

    if (pathRegExp.test(path)) {
      const pathElements = path.split("/")
      const wineId = pathElements[pathElements.length - 2]

      $.ajax({
        type: 'GET',
        url: `/admin/wines/`+ wineId + `/wine_reviews`,
        async: false,
        success: function(wineReviews) {
        wineReviews.forEach(element => {
          myWineReviews.push(element)
        })
        }
      });
    }

    Array.from(wineReviewContainers).forEach((element, index) => {
      concernedWineReviews = myWineReviews.filter(e => e.reviewer_id == hiddenInputs[index].value)

      if (concernedWineReviews.length === 0) {
        sliders[index].value = -1
      } else {
        sliders[index].value = concernedWineReviews[0].review
      }

      if (!(sliders[index].value)) {
        sliders[index].value = -1
      }

      rangeValues[index].innerText = sliders[index].value

      if (sliders[index].value == -1) {
        rangeValues[index].innerText = "Pas de note"
      }

      sliders[index].addEventListener('input', function() {
        if (this.value != -1) {
          rangeValues[index].innerText = this.value
        } else {
          rangeValues[index].innerText = "Pas de note"
        }
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
  }
})
