require("jquery")
require("@nathanvda/cocoon")

$(document).on('turbolinks:load', function() {

  const compareCreatedAt = (a, b) => {
    if ( a.created_at > b.created_at ){
      return -1;
    }
    if ( a.created_at < b.created_at ){
      return 1;
    }
    return 0;
  }

  const compareAlphabetically = (a, b) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  const ingredientOptions = (ingredients) => {
    const sortedIngredients = ingredients
    const lastIngredient = sortedIngredients.sort(compareCreatedAt)[0]
    const lastIngredientTimestamp = Date.parse(lastIngredient.created_at)
    const nowTimestamp = Date.parse(new Date().toISOString())
    if ((nowTimestamp - lastIngredientTimestamp) < 300000) {
      let alphabeticalIngredients = ingredients.sort(compareAlphabetically)

      alphabeticalIngredients = alphabeticalIngredients.filter(function(ingredient) {
        return ingredient.id !== lastIngredient.id;
      })

      alphabeticalIngredients.unshift(lastIngredient)

      return alphabeticalIngredients.map(ingredient => {
        return `<option value='${ingredient.id}'>${ingredient.name}</option>`
      })
    } else {
      ingredients.sort(compareAlphabetically)

      const options = ingredients.map(ingredient => {
        return `<option value='${ingredient.id}'>${ingredient.name}</option>`
      })

      options.unshift(
        `<option value="">Choisir un ingrédient</option>`
      )

      return options
    }
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
})
