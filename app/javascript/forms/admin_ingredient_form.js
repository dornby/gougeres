import Rails from "@rails/ujs";

$(document).on('turbolinks:load', function() {
  const ingredientForm = document.getElementById('new_ingredient')

  if (ingredientForm) {
    const ingredientSubmit = document.getElementById('ingredient-submit')
    const ingredientName = document.getElementById('ingredient_name')
    const successAlert = document.querySelector('.alert-container')

    ingredientSubmit.addEventListener('click', () => {
      Rails.fire(ingredientForm, 'submit')
    })

    jQuery(function() {
      $('[data-js-tutorial-form]').on("ajax:success", function(event, data, status, xhr){
        $('#ingredientModal').modal('hide')
        ingredientName.value = '';
        successAlert.style.display = "flex";
        setTimeout(
          function(){successAlert.style.display = "none"},
          3000
        );
      });
    });
  }
})
