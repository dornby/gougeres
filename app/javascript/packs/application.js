// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

var Trix = require("trix")

require("jquery")
require("channels")
require("turbolinks").start()

require("@rails/activestorage").start()
require("@rails/actiontext")
require("@rails/ujs").start()

require("@nathanvda/cocoon")

require("cocoon/callbacks")

require("forms/admin_ingredient_form")
require("forms/recipe_picture_button")

Trix.config.blockAttributes.heading1.tagName = "h4";
