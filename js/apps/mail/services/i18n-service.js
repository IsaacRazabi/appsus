
export let i18nService = {
    getTrans,
    doTrans,
    setLang,
  };

let gTrans = {
inbox: {
        en: 'inbox',
        he: 'דואר נכנס'
    },
    starred: {
        en: 'starred',
        he: 'לא נצפו',
    },
    sentMail: {
        en: 'sent mail',
        he: 'נשלח',
    },
    drafts: {
        en: 'drafts',
        he: 'טיוטות'
    },
    newMail :
    {
        en: '➕  new mail',
        he: ' אימייל חדש ➕'  
    }
}

let gCurrLang = 'en';

function getTrans(transKey) {
    let keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    let txt = keyTrans[gCurrLang];
    if (!txt) return keyTrans.en
    return txt
}

function doTrans() {
    let els = document.querySelectorAll('[data-trans]')
    els.forEach((el)=> {
        let txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt   
    })
}

function setLang(lang) {
    gCurrLang = lang;
}
