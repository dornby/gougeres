import Rails from "@rails/ujs";

$(document).on('turbolinks:load', function() {
  const ingredientForm = document.getElementById('new_ingredient')

  if (ingredientForm) {
    const addSeparator = (e) => {
      e.insertAdjacentHTML(
        'beforeend',
        `<div class="ingredient-autocomplete-separator"><div class="line"></div></div>`
      )
    }

    const addResult = (e, ingredient) => {
      e.insertAdjacentHTML(
        'beforeend',
        `<div tabindex="0" class="ingredient-autocomplete-result" data-id="${ingredient.id}">${ingredient.name}</div>`
      )
    }

    const addSelectHint = (ingredientAutocompleteResults) => {
      ingredientAutocompleteResults.insertAdjacentHTML(
        'afterbegin',
        `<div class="hint select-ingredient">⌘⏎</div>`
      )
    }

    const handleClick = (textInput, element, ingredientAutocompleteResults, hiddenInput) => {
      textInput.value = element.innerText
      ingredientAutocompleteResults.classList.add('invisible')
      hiddenInput.value = element.dataset.id
    }

    const addClickonAllResults = (allResults, textInput, ingredientAutocompleteResults, hiddenInput) => {
      allResults.forEach(result => {
        result.addEventListener('click', function() {
          handleClick(textInput, this, ingredientAutocompleteResults, hiddenInput)
        })
      })
    }

    const handleForEachIngredient = (index, ingredientAutocompleteResults, ingredient, textInput, hiddenInput, ingredients) => {
      if (index > 0) {
        addSeparator(ingredientAutocompleteResults)
        addResult(ingredientAutocompleteResults, ingredient)
      } else {
        addResult(ingredientAutocompleteResults, ingredient)
      }

      const allResults = document.querySelectorAll(".ingredient-autocomplete-result")

      addClickonAllResults(allResults, textInput, ingredientAutocompleteResults, hiddenInput, ingredients)
    }

    const hideResultsAtClickOut = (textInput, addIngredientHint, ingredientAutocompleteResults) => {
      document.addEventListener('click', function(event) {
        if (!(textInput.contains(event.target))) {
          addIngredientHint.style.display = "none"
          ingredientAutocompleteResults.classList.add('invisible')
        }
      })
    }

    const queryIngredients = (textInput, hiddenInput, insertedItem, addIngredientHint) => {
      const query = textInput.value.toLowerCase();

      $.ajax({
        type: 'GET',
        url: `/admin/ingredients/queried_index?q=` + query,
        success: function(ingredients) {
          console.log("query")
          const ingredientAutocompleteResults = insertedItem.querySelector('.ingredient-autocomplete-results')

          ingredientAutocompleteResults.innerHTML = ""
          ingredientAutocompleteResults.classList.remove('invisible')
          addIngredientHint.innerText = "⌘⬆⏎"
          addIngredientHint.style.display = "flex"

          hideResultsAtClickOut(textInput, addIngredientHint, ingredientAutocompleteResults)

          if (ingredients.length > 0) {
            addSelectHint(ingredientAutocompleteResults)
            ingredients.forEach((ingredient, index) => {
              handleForEachIngredient(index, ingredientAutocompleteResults, ingredient, textInput, hiddenInput, ingredients)
            })
          } else {
            ingredientAutocompleteResults.classList.add('invisible')
          }
        }
      });
    }

    const submitForm = (ingredientForm, hiddenInput, addIngredientHint) => {
      Rails.fire(ingredientForm, 'submit')
      jQuery(function() {
        $('[data-js-tutorial-form]').on("ajax:success", function(){
          $.ajax({
            type: 'GET',
            url: `/admin/ingredients/last`,
            success: function(last_ingredient) {
              if (hiddenInput.parentElement.parentElement.querySelector('input.ingredient-name-text-input').classList.contains('selected-field')) {
                const successAlert = document.querySelector('.alert-container')
                hiddenInput.value = last_ingredient.id
                addIngredientHint.innerText = "✔"
                successAlert.style.display = "flex";
                setTimeout(
                  function(){successAlert.style.display = "none"},
                  3000
                );
              }
            }
          });
        });
      });
    }

    const setupAutocomplete = (nestedField, textInput, hiddenInput) => {
      const addIngredientHint = nestedField.querySelector(".hint.add-ingredient")

      textInput.addEventListener('focus', function() {
        queryIngredients(textInput, hiddenInput, nestedField, addIngredientHint)
        textInput.classList.add('selected-field')

        textInput.addEventListener('input', function() {
          queryIngredients(textInput, hiddenInput, nestedField, addIngredientHint)
        })
      })

      textInput.addEventListener('focusout', function() {
        textInput.classList.remove('selected-field')
      })
    }

    const chooseResult = (result, selectedField, hiddenInput) => {
      selectedField.value = result.innerText
      hiddenInput.value = result.dataset.id
    }

    const createIngredient = (ingredientForm, selectedField, hiddenInput, addIngredientHint) => {
      const input = ingredientForm.querySelector('input')
      input.value = selectedField.value
      submitForm(ingredientForm, hiddenInput, addIngredientHint)
    }

    // For existing ingredients
    const nestedFields = document.querySelectorAll('.nested-fields')

    nestedFields.forEach(nestedField => {
      const textInput = nestedField.querySelector('.ingredient-name-text-input')
      const hiddenInput = nestedField.querySelector('input.hidden')
      $.ajax({
        type: 'GET',
        url: `/admin/ingredients/${hiddenInput.value}`,
        success: function(ingredient) {
          textInput.value = ingredient.name
        }
      });
      setupAutocomplete(nestedField, textInput, hiddenInput)
    })

    // For newly inserted ingredients
    jQuery(function() {
      $('#recipe-ingredients')
        .on('cocoon:before-insert', function(_e, insertedItem, _originalEvent) {
          const textInput = insertedItem[0].querySelector('.ingredient-name-text-input')
          const hiddenInput = insertedItem[0].querySelector('input.hidden')
          setupAutocomplete(insertedItem[0], textInput, hiddenInput)
        })
    })

    // Listening to ⌘＋⏎
    document.addEventListener('keydown', function(event) {
      if (event.metaKey && event.key == "Enter" && !event.shiftKey) {
        const selectedField = document.querySelector('.selected-field')

        if (selectedField) {
          event.preventDefault()

          const ingredientField = selectedField.parentElement.parentElement
          const hiddenInput = ingredientField.querySelector('input.hidden')
          const addIngredientHint = ingredientField.querySelector(".hint.add-ingredient")
          const ingredientAutocompleteResults = selectedField.parentElement.querySelector('.ingredient-autocomplete-results')
          const firstResult = ingredientAutocompleteResults.querySelector('.ingredient-autocomplete-result')

          ingredientAutocompleteResults.classList.add('invisible')

          if (firstResult) {
            chooseResult(firstResult, selectedField, hiddenInput)
          } else {
            createIngredient(ingredientForm, selectedField, hiddenInput, addIngredientHint)
          }
        }
      }
    })

    // Listening to ⌘＋⬆+⏎
    document.addEventListener('keydown', function(event) {
      if (event.metaKey && event.shiftKey && event.key == "Enter") {
        const selectedField = document.querySelector('.selected-field')

        if (selectedField) {
          event.preventDefault()

          const ingredientField = selectedField.parentElement.parentElement
          const hiddenInput = ingredientField.querySelector('input.hidden')
          const addIngredientHint = ingredientField.querySelector(".hint.add-ingredient")
          const ingredientAutocompleteResults = selectedField.parentElement.querySelector('.ingredient-autocomplete-results')
          const matchingResults = Array.from(ingredientAutocompleteResults.querySelectorAll('.ingredient-autocomplete-result')).filter(e => e.innerText == selectedField.value)

          ingredientAutocompleteResults.classList.add('invisible')

          if (matchingResults.length > 0) {
            chooseResult(matchingResults[0], selectedField, hiddenInput)
          } else {
            createIngredient(ingredientForm, selectedField, hiddenInput, addIngredientHint)
          }
        }
      }
    })
  }
})
