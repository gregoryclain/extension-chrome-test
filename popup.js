document.addEventListener('DOMContentLoaded', function() {
    let generateNameButton = document.getElementById('generateName');
    let displayNameZone = document.getElementById('displayName');
    generateNameButton.addEventListener('click', function() {
        console.log('test console')
        displayNameZone.value = "Test text"
    })
})


