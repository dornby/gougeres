import Rails from "@rails/ujs";

$(document).on('turbolinks:load', function() {
  const ingredientForm = document.getElementById('new_ingredient')

  if (ingredientForm) {
    if (typeof(String.prototype.trim) === "undefined") {
      String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
      };
    }
    const addSeparator = (e) => {
      e.insertAdjacentHTML(
        'beforeend',
        `<div class="ingredient-autocomplete-separator"><div class="line"></div></div>`
      )
    }

    const addResult = (e, ingredient) => {
      e.insertAdjacentHTML(
        'beforeend',
        `<div tabindex="0" class="ingredient-autocomplete-result" data-id="${ingredient.id}">
          ${ingredient.name}
        </div>`
      )
    }

    const addSelectHint = (ingredientAutocompleteResults) => {
      ingredientAutocompleteResults.insertAdjacentHTML(
        'afterbegin',
        `<div class="hint select-ingredient">⌘＋⏎</div>`
      )
    }

    const handleClick = (textInput, element, ingredientAutocompleteResults, hiddenInput) => {
      textInput.value = element.innerText.trim()
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

    const ajaxQueryIngredients = (query, textInput, hiddenInput, insertedItem, addIngredientHint) => {
      $.ajax({
        type: 'GET',
        url: `/admin/ingredients/queried_index?q=` + query,
        success: function(ingredients) {
          const ingredientAutocompleteResults = insertedItem.querySelector('.ingredient-autocomplete-results')
          ingredientAutocompleteResults.innerHTML = ""
          ingredientAutocompleteResults.classList.remove('invisible')
          addIngredientHint.innerText = "⌘＋⏎"
          document.addEventListener('click', function(event) {
            if (!(textInput.contains(event.target))) {
              addIngredientHint.style.display = "none"
              ingredientAutocompleteResults.classList.add('invisible')
            }
          })
          if (ingredients.length > 0) {
            addSelectHint(ingredientAutocompleteResults)
            addIngredientHint.style.display = "none"
            ingredients.forEach((ingredient, index) => {
              handleForEachIngredient(index, ingredientAutocompleteResults, ingredient, textInput, hiddenInput, ingredients)
            })
          } else {
            ingredientAutocompleteResults.classList.add('invisible')
            addIngredientHint.style.display = "flex"
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
              const successAlert = document.querySelector('.alert-container')
              hiddenInput.value = last_ingredient.id
              addIngredientHint.innerText = "✔"
              successAlert.style.display = "flex";
              setTimeout(
                function(){successAlert.style.display = "none"},
                3000
              );
            }
          });
        });

        $('[data-js-tutorial-form]').on("ajax:error", function(event) {
          const detail = event.detail;
          const errorFull = detail[2].responseText;

          const errorRegExp = /Validation failed: /
          const breakRegExp = /Extracted source/
          const errorObject = errorRegExp.exec(errorFull)
          const breakObject = breakRegExp.exec(errorFull)
          const errorMessage = errorFull.substring(
            errorObject.index + 19, breakObject.index - 1
          )

          const errorMessageElement = document.querySelector(".error-message")

          errorMessageElement.innerText = errorMessage
        });
      });
    }

    const handleAutocomplete = (element) => {
      const textInput = element.querySelector('.ingredient-name-text-input')
      const hiddenInput = element.querySelector('input.hidden')
      const addIngredientHint = element.querySelector(".hint.add-ingredient")

      textInput.addEventListener('focus', function() {
        const query = textInput.value.toLowerCase();
        ajaxQueryIngredients(query, textInput, hiddenInput, element, addIngredientHint)
        textInput.classList.add('selected-field')

        textInput.addEventListener('input', function() {
          const query = textInput.value.toLowerCase();
          ajaxQueryIngredients(query, textInput, hiddenInput, element, addIngredientHint)
        })
      })

      textInput.addEventListener('focusout', function() {
        textInput.classList.remove('selected-field')
      })
    }

    document.addEventListener('keydown', function(event) {
      if (event.metaKey && event.key == "Enter") {
        const selectedField = document.querySelector('.selected-field')

        if (selectedField) {
          const element = selectedField.parentElement.parentElement
          const hiddenInput = element.querySelector('input.hidden')
          const addIngredientHint = element.querySelector(".hint.add-ingredient")
          event.preventDefault()
          const ingredientAutocompleteResults = selectedField.parentElement.querySelector('.ingredient-autocomplete-results')
          const firstResult = ingredientAutocompleteResults.querySelector('.ingredient-autocomplete-result')
          if (firstResult) {
            selectedField.value = firstResult.innerText.trim()
            hiddenInput.value = firstResult.dataset.id
          } else {
            const input = ingredientForm.querySelector('input')
            input.value = selectedField.value.trim()
            submitForm(ingredientForm, hiddenInput, addIngredientHint)
          }
          ingredientAutocompleteResults.classList.add('invisible')
        }
      }
    })

    const textInputs = document.querySelectorAll('.ingredient-name-text-input')

    $.ajax({
      type: 'GET',
      url: `/admin/ingredients/queried_index?q=`,
      success: function(ingredients) {
        textInputs.forEach(e => {
          const thisHidden = e.parentElement.parentElement.querySelector('input.hidden')
          ingredients.filter
          e.value = ingredients.filter(x => x.id == thisHidden.value)[0].name
        })
      }
    });

    textInputs.forEach(element => {
      handleAutocomplete(element.parentElement.parentElement.parentElement.parentElement.parentElement)
    })

    jQuery(function() {
      $('#recipe-ingredients')
        .on('cocoon:before-insert', function(_e, insertedItem, _originalEvent) {
          handleAutocomplete(insertedItem[0])
        })
    })
  }
})
