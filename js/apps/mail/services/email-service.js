
import {storageService } from './async-storage-service.js'
import {defaultMails} from '../data/default-mails.js'
import { save } from './storage.js';
import { defaultSearch } from '../data/default-search.js';



export const mailService = {
  query,
 removeMail,
makeId,
getMailById,
getNextMailId,
lastMailId,
addMail,
saveEmailNames,
loadEmailNames
};

const MAIL_KEY = 'mailData';
const gMails = defaultMails;
const SEARCH = 'SEARCH NAMES'

function query() {
  return storageService.query(MAIL_KEY)
      .then(mails => {
          if (!mails.length) { //on first call or deleted all mails the query function will contain empty arr.
              const initialMailList = defaultMails;
              storageService.postMany(MAIL_KEY, initialMailList) //push and save all new initial mails we just added
              return initialMailList;
          }
          return mails;
      })
}

function removeMail(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}


function makeId(length = 11) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


function getMailById(mailId) {
  return storageService.get(MAIL_KEY, mailId);
}

function getNextMailId(mailId){
  return query()
  .then(mails =>{
    const idx = mails.findIndex(mail=>mail.id===mailId)
    return (idx === mails.length-1)? mails[0].id: mails[idx+1].id
  })
}

function lastMailId (mailId){
  return query()
  .then(mails=>{
    const idx = mails.findIndex(mail=>mail.id===mailId)
    return (idx===0) ? mails[mails.length-1].id :mails[idx-1].id
  })
}

function addMail(newMail){
  let time = new Date()
  const mailToAdd = {
    id:makeId(),
    sentTo: newMail.to,
    subject: newMail.subject,
    body: newMail.body,
    isRead:  false,
    createdAt : time,
    sentAt: time.getHours() + ' : ' + time.getMinutes(),
    sentBy: 'isaac',
    isDraft :newMail.draft
  }
  return storageService.post(MAIL_KEY, mailToAdd);

} 

function saveEmailNames(names){
 return save.saveToStorage(SEARCH,names)
}

function loadEmailNames(){
  if (!save.loadFromStorage(SEARCH)){
    save.saveToStorage(SEARCH,defaultSearch)
  }
 return save.loadFromStorage(SEARCH)
}
