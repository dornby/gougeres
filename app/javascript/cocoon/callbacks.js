require("jquery")
require("@nathanvda/cocoon")

const ingredientOptions = (ingredients) => {
  return ingredients.map(ingredient => {
    return `<option value='${ingredient.id}'>${ingredient.name}</option>`
  })
}

jQuery(function() {
  $('#recipe_ingredients')
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
