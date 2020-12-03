import Rails from "@rails/ujs";

$(document).on('turbolinks:load', function() {
  const ingredientForm = document.getElementById('new_ingredient')
  const ingredientSubmit = document.getElementById('ingredient-submit')

  if (ingredientSubmit) {
    const ingredientName = document.getElementById('ingredient_name')
    const successAlert = document.querySelector('.alert-container')
    const ingredientField = document.querySelector('#ingredient_name')

    $('#ingredientModal').on('shown.bs.modal', function () {
      ingredientField.focus();
    })

    ingredientField.addEventListener('input', () => {
      const query = ingredientField.value.toLowerCase();
      const ingredientsListContainer = document.querySelector('.queried-ingredients')
      const ingredientsList = document.querySelector('#ingredients-list')

      if (query != "") {
        $.ajax({
          type: 'GET',
          url: `/admin/ingredients/queried_index?q=` + query,
          success: function(ingredients) {
            if (ingredients.length > 0) {
              ingredientsList.innerHTML = ""
              ingredientsListContainer.classList.remove('display-none')
              ingredients.forEach((element, index) => {
                if (index < 5) {
                  ingredientsList.insertAdjacentHTML(
                    'beforeend',
                    `<li>${element.name}</li>`
                  )
                }
              })
              if (ingredients.length > 5) {
                ingredientsList.insertAdjacentHTML(
                  'beforeend',
                  `<li>...</li>`
                )
              }
            } else if (ingredients.length === 0) {
              ingredientsListContainer.classList.add('display-none')
            }
          }
        });
      } else {
        ingredientsListContainer.classList.add('display-none')
      }
    })

    ingredientSubmit.addEventListener('click', () => {
      Rails.fire(ingredientForm, 'submit')
    })

    jQuery(function() {
      $('[data-js-tutorial-form]').on("ajax:success", function(){
          $('#ingredientModal').modal('hide')
          ingredientName.value = '';
          successAlert.style.display = "flex";
          setTimeout(
            function(){successAlert.style.display = "none"},
            3000
          );
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
})
