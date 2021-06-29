import { eventBus } from "../services/event-bus-service.js";

export default {
    props: ['mailToEdit'],
    template: `
  <section class="add-mail">
  <div class="overlay popup1">
  <div class="popup form-popup" v-if="this.active">
  <div> <input v-model="newDraft.to" type="text" @input="autoComplete" placeholder="to"/> </div>
  <div> <input v-model="newDraft.cc" type="text" placeholder="cc"/></div>
  <div> <input v-model="newDraft.subject" type="text" placeholder="subject"/></div>
  <div> <input class="email-body" v-model="newDraft.body" type="text" /></div>
  <button @click="closeModal"> X </button>
  <button class="add" v-on:click="addMail">  send</button>
  <button class="addDraft" v-on:click="saveDraft"> save </button>
  </div>
  </div>
  </section>
      `,
    data() {
      return {
        // newDraft:this.mailToEdit,
        newDraft: {
          to: this.mailToEdit.sentTo,
          cc: "",
          subject: this.mailToEdit.subject,
          body: this.mailToEdit.body,
          draft: false
        },
        active: true,
        searchWords: [],
      };
    },
    methods: {
      closeModal(){
  this.active= false;
  if(confirm('do you want to save do draft ?'))this.saveDraft()
      },
      addMail() {
        eventBus.$emit("addeMail", this.newDraft);
        this.active = false;
        this.submitTo();
        this.resetInput()
        // eventBus.$emit("removeDraft", this.newDraft);
 
      },
      submitTo() {
        this.searchWords.splice(0, this.searchWords.length - 1);
        this.searchWords.push(this.newDraft.to);
      },
      autoComplete() {},
      saveDraft(){
        this.newDraft.draft=true;
        this.active= false;
        eventBus.$emit("addDraft", this.newDraft);
      },
      resetInput(){
        this.newDraft = {
          to: "",
          cc: "",
          subject: "",
          body: "",
          draft: false
      }
    }
    },
    components: {
      eventBus
    },
    // watch: {
    //   newMail: {
    //     handler(newVal, oldVal) {
    //       this.submitTo();
    //     },
    //     deep: true,
    //   },
    // },
  };
  