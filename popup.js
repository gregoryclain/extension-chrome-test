document.addEventListener('DOMContentLoaded', function() {
    const generateNameButton = document.getElementById('generateName');
    const displayNameZone = document.getElementById('displayName');
    const copyNameButton = document.getElementById('copyName');
    generateNameButton.addEventListener('click', function() {
        displayNameZone.value = "Test text"
    })
    copyNameButton.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(displayNameZone.value);
            console.log("Texte copié dans le presse-papiers.")
        } catch (err) {
            console.error("Impossible de copier le texte : ", err);
        }
    })
})


