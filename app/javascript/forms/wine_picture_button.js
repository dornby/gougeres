$(document).on('turbolinks:load', function() {
  const actualBtn = document.getElementById('wine_picture');
  const newButton = document.getElementById('wine-picture-button');

  if (actualBtn) {
    actualBtn.addEventListener('change', function(){
      newButton.textContent = this.files[0].name
      newButton.classList.add("file-chosen")
    })
  }
})
