import { mailService } from "../services/email-service.js";
import mailList from "../cmps/email-list.js";
import mailFilter from "../cmps/mail-filter.js";
import emailCompose from "../cmps/email-compose.js";
import emailsCatgory from "../cmps/emails-catgory.js";
import addMail from "../cmps/add-mail.js";
import { eventBus } from "../services/event-bus-service.js";
import emailDrafts from "../cmps/email-drafts.js";
import emailHeader from "../cmps/email-header.js";

export default {
  template: `
                <section v-bind:class="{rtl: isHebrew , ltr:isEnglish}">
                <emailHeader @changeLng="changeLng"></emailHeader>
                <mail-filter @filtered="setFilter"> </mail-filter>
                  <div>
                  <div class="flex">  
                    <section class="categories">
                      <addMail @addeMail="addNewMail"  @addDraft="addNewDraft"   ></addMail>
                      <!-- <email-drafts @addDraft="addNewDraft"  @addeMail="addNewMail" v-if="false"></email-drafts> -->
                  <emailsCatgory @showDrafts="showDraft" @resetMail="resetMails" @filterListByRead="filterByCategory" @filterListByTime="filterByCategory" ></emailsCatgory>
                  </section>
                  
                  <!-- <router-view></router-view> -->
                  <mail-list v-if="true " class="mail-list" :toggleDraft="toggleDraft" :mails="mailsToShow"  @removed="removeMail" ></mail-list>
                 </div>
                 </div>
                </section>
    `,
  data() {
    return {
      mails: [],
      filterBy: null,
      toggleDraft:false,
      isHebrew:false,
      isEnglish:true
    };
  },
  created() {
    this.loadMails();
    eventBus.$on('addeMail' , ((mail) => {this.addNewMail(mail); this.resetMails()}))
    eventBus.$on('addDraft' , ((mail) => {this.addNewDraft(mail) ; this.resetMails()}))
    // eventBus.$on('removeDraft' , ((mail) => {this.removeMail(mail.id) ;this.resetMails()}))
  },
  methods: {
    resetMails(){
      this.toggleDraft=false;
this.loadMails()
    },
    filterByCategory(filterType) {
      if (filterType === "read") {
        const mailsToShow = this.mails.filter((mail) => {
          return mail.isRead === false
        });
        return this.mails = mailsToShow;
      }
      if (filterType === "time") {
        const mailsToShow=this.mails.sort((x, y)=>{
          return new Date(x.createdAt) - new Date(y.createdAt);
        });
        return this.mails = mailsToShow;
      }
    this.loadMails()
    },
    loadMails() {
      mailService.query().then((mails) => (this.mails = mails));
    },
    removeMail(mailId) {
      mailService.removeMail(mailId).then(() => this.loadMails());
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    isFilterEmpty() {
      return (
        !this.filterBy || (!this.filterBy.subject && !this.filterBy.isRead)
      );
    },
    addNewMail(mail) {
      mailService.addMail(mail).then(this.loadMails);
    },
    addNewDraft(draft){
      mailService.addMail(draft).then(this.loadMails);
    },
    showDraft(){
this.toggleDraft = true
    },
    changeLng(diff){
      console.log(diff);
      if(diff===1) {
        this.isHebrew = true
        this.isEnglish = false
     }
     if(diff===0) {
       this.isHebrew = false
       this.isEnglish = true
    }
  }
  },
  computed: {
    mailsToShow() {
      if (this.isFilterEmpty()) return this.mails;
      const searchStr = this.filterBy.subject.toLowerCase();
      const mailsToShow = this.mails.filter((mail) => {
        return mail.subject.toLowerCase().includes(searchStr);
      });
      return mailsToShow;
    },
  },
  components: {
    mailList,
    mailFilter,
    emailCompose,
    emailsCatgory,
    addMail,
    eventBus,
    emailDrafts,
    emailHeader
  },
};

