async function getH1() {
    const title = document.querySelector('h1 input').value;
    console.log('title', title)
    return title;  
}

async function getTabID() {
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({
                active: true,
            }, function (tabs) {
                resolve(tabs[0].id);
            })
        } catch (e) {
            reject(e);
        }
    })
}

function generateName(htmlName){
    console.log('htmlName', htmlName)
}



document.addEventListener('DOMContentLoaded', function() {
    const generateNameButton = document.getElementById('generateName');
    const displayNameZone = document.getElementById('displayName');
    const copyNameButton = document.getElementById('copyName');

    generateNameButton.addEventListener('click', function() {
        displayNameZone.value = ":euronews: MEP 6.X.X EW-XXXX[XX]: Message"
    })


    copyNameButton.addEventListener('click', async function() {
        try {

            // fonction copy to clipboard
            await navigator.clipboard.writeText(displayNameZone.value);
            console.log("Texte copié dans le presse-papiers.")
            
            // récupérer les infos de la tab courante
            const tabId = await getTabID();
            await chrome.scripting.executeScript(
                {
                  target: {tabId: tabId, allFrames: true},
                  func: getH1,
                },
                (injectionResults) => {
                    generateName(injectionResults[0].result);
                });
        } catch (err) {
            console.error("Impossible de copier le texte : ", err);
        }
    })
})


