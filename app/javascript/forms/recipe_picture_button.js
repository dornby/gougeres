$(document).on('turbolinks:load', function() {
  const actualBtn = document.getElementById('recipe_picture');
  const newButton = document.getElementById('recipe-picture-button');

  if (actualBtn) {
    actualBtn.addEventListener('change', function(){
      newButton.textContent = this.files[0].name
      newButton.classList.add("file-chosen")
    })
  }
})
