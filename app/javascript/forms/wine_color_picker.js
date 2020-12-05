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
        input.value = "red"
      } else if (clickedLabel.id == "white-label") {
        input.value = "white"
      } else if (clickedLabel.id == "rose-label") {
        input.value = "rose"
      }
    }

    const editHiddenValue = (wineTaggingId, concernedHiddenTag) => {
      concernedHiddenTag.value = `E${wineTaggingId}`
    }

    const addDestroyOptionToHiddenValue = (wineTaggingId, concernedHiddenTag) => {
      concernedHiddenTag.value = `DE${wineTaggingId}`
    }

    const editVisibleDataset = (wineTaggingId, concernedVisibleTag) => {
      concernedVisibleTag.dataset.id = `E${wineTaggingId}`
    }

    const fillWineTags = (wineTagsHiddenInputs, wineTagsVisibleInputs) => {
      const pathRegExp = RegExp('/admin/wines/[0-9]+/edit$')
      const path = window.location.pathname
      const myWineTaggings = []

      if (pathRegExp.test(path)) {
        const pathElements = path.split("/")
        const wineId = pathElements[pathElements.length - 2]

        $.ajax({
          type: 'GET',
          url: `/admin/wines/`+ wineId + `/wine_taggings`,
          async: false,
          success: function(wineTaggings) {
            wineTaggings.forEach(element => {
              myWineTaggings.push(element)
            })
          }
        });
      }

      myWineTaggings.forEach(existingWineTagging => {
        const concernedVisibleTag = Array.from(wineTagsVisibleInputs.children).filter(wineTagPill => parseInt(wineTagPill.dataset.tagId) === existingWineTagging.wine_tag_id)
        const concernedHiddenTag = Array.from(wineTagsHiddenInputs.children).map(div => div.firstChild).filter(wineTagHiddenInput => parseInt(wineTagHiddenInput.dataset.tagId) === existingWineTagging.wine_tag_id)

        if (concernedVisibleTag.length > 0) {
          handleToggle(existingWineTagging.wine_tag_id, wineTagsHiddenInputs, concernedVisibleTag[0])
          editVisibleDataset(existingWineTagging.id, concernedVisibleTag[0])
          editHiddenValue(existingWineTagging.id, concernedHiddenTag[0])
        } else {
          addDestroyOptionToHiddenValue(existingWineTagging.id, concernedHiddenTag[0])
        }
      })
    }

    const toggleClass = (newlyInsertedWineTag) => {
      newlyInsertedWineTag.classList.toggle('clicked')
    }

    const handleHiddenTag = (wineTagId, wineTagsHiddenInputs, newlyInsertedWineTag) => {
      const hiddenInputToEdit = wineTagsHiddenInputs.querySelector(`#wine_wine_taggings_attributes_${wineTagId - 1}_wine_tag_id`)

      if (!newlyInsertedWineTag.classList.contains('clicked')) {
        hiddenInputToEdit.value = newlyInsertedWineTag.dataset.id
      } else {
        hiddenInputToEdit.value = `D${newlyInsertedWineTag.dataset.id}`
      }
    }

    const handleToggle = (wineTagId, wineTagsHiddenInputs, newlyInsertedWineTag) => {
      handleHiddenTag(wineTagId, wineTagsHiddenInputs, newlyInsertedWineTag)
      toggleClass(newlyInsertedWineTag)
    }

    const createWineTagPill = (wineTag, wineTagsVisibleInputs, wineTagsHiddenInputs) => {
      wineTagsVisibleInputs.insertAdjacentHTML(
        'beforeend',
        `<div class="wine-tag-pill" data-id="${wineTag.id}" data-tag-id="${wineTag.id}">${wineTag.name}</div>`
      )

      const newlyInsertedWineTag = wineTagsVisibleInputs.lastChild

      newlyInsertedWineTag.addEventListener('click', function() {
        handleToggle(wineTag.id, wineTagsHiddenInputs, newlyInsertedWineTag)
      })
    }

    const createWineTagPills = (thisElement, wineTagsHiddenInputs, wineTagsVisibleInputs) => {
      var wineColor = null
      if (thisElement.id === "red-label") {
        wineColor = "red"
      } else if (thisElement.id === "white-label") {
        wineColor = "white"
      } else if (thisElement.id === "rose-label") {
        wineColor = "rose"
      }

      $.ajax({
        type: 'GET',
        url: `/admin/wine_tags/queried_index?wine_color=${wineColor}`,
        async: false,
        success: function(wine_tags) {
          wineTagsVisibleInputs.innerHTML = ""
          wine_tags.forEach(wineTag => {
            createWineTagPill(wineTag, wineTagsVisibleInputs, wineTagsHiddenInputs)
          })
        }
      })
    }

    const updateInput = (thisElement, wineTagsHiddenInputs, wineTagsVisibleInputs) => {
      if (!thisElement.classList.contains("selected")) {
        toggleLabels(thisElement)
      }
      toggleValue(thisElement);

      const selectedColor = document.querySelector(".color-label.selected")

      createWineTagPills(selectedColor, wineTagsHiddenInputs, wineTagsVisibleInputs)
      fillWineTags(wineTagsHiddenInputs, wineTagsVisibleInputs)
    }

    const createHiddenTag = (wineTag, wineTagsHiddenInputs) => {
      wineTagsHiddenInputs.insertAdjacentHTML(
        'afterbegin',
        `<div class="input hidden wine_wine_taggings_wine_tag field_without_errors"><input class="hidden" type="hidden" value="D${wineTag.id}" name="wine[wine_taggings_attributes][${wineTag.id - 1}][wine_tag_id]" id="wine_wine_taggings_attributes_${wineTag.id - 1}_wine_tag_id" data-tag-id="${wineTag.id}"></div>`
      )
    }

    if (wineColor === 'red') {
      toggleLabels(redLabel)
      toggleValue(redLabel)
    } else if (wineColor === 'white') {
      toggleLabels(whiteLabel)
      toggleValue(whiteLabel)
    } else if (wineColor === 'rose') {
      toggleLabels(roseLabel)
      toggleValue(roseLabel)
    }

    const selectedColor = document.querySelector(".color-label.selected")

    const wineTagsHiddenInputs = document.querySelector('.wine-tags-hidden-inputs')
    const wineTagsVisibleInputs = document.querySelector('.wine-tags-visible-inputs')

    $.ajax({
      type: 'GET',
      url: `/admin/wine_tags`,
      async: false,
      success: function(wine_tags) {
        wineTagsHiddenInputs.innerHTML = ""
        wine_tags.forEach(wineTag => {
          createHiddenTag(wineTag, wineTagsHiddenInputs)
        })
      }
    })

    createWineTagPills(selectedColor, wineTagsHiddenInputs, wineTagsVisibleInputs)
    fillWineTags(wineTagsHiddenInputs, wineTagsVisibleInputs)

    Array.from(labels.children).forEach(element => {
      element.addEventListener('click', function() {
        updateInput(this, wineTagsHiddenInputs, wineTagsVisibleInputs)
      })
    })
  }
})
