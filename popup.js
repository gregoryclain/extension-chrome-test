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

function generateName(stringName){
    console.log('htmlName', stringName)
    const idPR = stringName.match(/\(([^)]+)\)/);
    const scopePR = stringName.match(/\[([^\]]+)\]/);
    const msgPR = stringName.match(/\](.*)$/);
    const tagPR = document.getElementById('tagName').value ? document.getElementById('tagName').value : "6.X.X" ;

    const stringToPost = ':euronews: MEP ' + tagPR + ' ' + idPR[1] + scopePR[0] + ': ' + msgPR[1] ;
    return stringToPost;
}

// async function chromeScripting(){
//     const tabId = await getTabID();
//     console.log('tabId',tabId )
//     let result;
//     return chrome.scripting.executeScript({
//         target: {tabId: tabId, allFrames: true},
//             func: getH1,
//         },
//         (injectionResults) => {
//             result = injectionResults[0].result;
//             return injectionResults[0].result;
//             // generateName(injectionResults[0].result);
//         });

// }

document.addEventListener('DOMContentLoaded', function() {
    const displayNameZone = document.getElementById('displayName');
    const generateNameButton = document.getElementById('generateButton');
    const copyNameButton = document.getElementById('copyButton');
    const eraseNameButton = document.getElementById('eraseButton');
    const tagNameButton = document.getElementById('tagName')
    

    generateNameButton.addEventListener('click', async function() {
        try {
            // récupérer les infos de la tab courante
            const tabId = await getTabID();
            // const test1 = await chromeScripting();
            await chrome.scripting.executeScript(
                {
                  target: {tabId: tabId, allFrames: true},
                  func: getH1,
                },
                (injectionResults) => {
                    displayNameZone.value = generateName(injectionResults[0].result);
                });
        } catch (err) {
            console.error(err);
        }
    })

    copyNameButton.addEventListener('click', async function() {
        try { 
            await navigator.clipboard.writeText(displayNameZone.value);
            console.log("Texte copié dans le presse-papiers.")
        } catch (err) {
            console.error("Impossible de copier le texte : ", err);
        }
    })
    eraseNameButton.addEventListener('click', async function() {
        displayNameZone.value ="";
        tagNameButton.value ="";
    })
})


