require("jquery")
require("@nathanvda/cocoon")

const ingredientOptions = (ingredients) => {
  const options = ingredients.map(ingredient => {
    return `<option value='${ingredient.id}'>${ingredient.name}</option>`
  })

  options.unshift(
    `<option value="">Choisir un ingrédient</option>`
  )

  return options
}

jQuery(function() {
  $('#recipe-ingredients')
    .on('cocoon:before-insert', function(_e, insertedItem, _originalEvent) {
      $.ajax({
        type: 'GET',
        url: "/admin/ingredients",
        success: function(data) {
          var selectElement = insertedItem.find(".ingredient-name").find("select")
          selectElement.empty();
          selectElement.html(
            ingredientOptions(data)
          );
        }
      });
    })
})
