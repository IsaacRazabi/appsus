import {mailService} from '../services/email-service.js'

export default {
  props: [],
  template: `
<section v-if="searchWords" class="add-mail">
 <div  data-trans="newMail"  class="compose" @click="composeMail">  ➕  new mail </div> 
  <div  v-if="active">
<div  class="overlay popup1">
<div class="popup form-popup" v-if="active">

<div> 
<input type="search" list="completeWords" v-model="newMail.to"   placeholder="to"/> 
<datalist id="completeWords"  v-if="newMail.to"  v-for="(word,key) in completeWords">
  <option>{{completeWords[0]}} </option>
  <option >{{completeWords[1]}}</option>
  <option >{{completeWords[2]}}</option>
  <option >{{completeWords[3]}}</option>
  <option >{{completeWords[4]}}</option>
  <option >{{completeWords[5]}}</option>
  <option >{{completeWords[6]}}</option>
  <option >{{completeWords[7]}}</option>
  <option >{{completeWords[8]}}</option>
  <option >{{completeWords[9]}}</option>
  <option >{{completeWords[10]}}</option>
</datalist>



<!-- <select v-if="newMail.to">
<option v-for="word in completeWords" >
  {{word}}
</option>
</select> -->

</div>
<div> <input v-model="newMail.cc" type="text" placeholder="cc"/></div>
<div> <input v-model="newMail.subject" type="text" placeholder="subject"/></div>
<div> <input class="email-body" v-model="newMail.body" type="text" /></div>
<button @click="closeModal"> X </button>
<button class="add" v-on:click="addMail">  send</button>
<button class="addDraft" v-on:click="saveDraft"> save </button>
    </div>
  </div>
</div>

</div>
</div>
</section>
    `,
  data() {
    return {
      newMail: {
        to: "",
        cc: "",
        subject: "",
        body: "",
        draft: false
      },
      active: false,
      searchWords: mailService.loadEmailNames(),
      completeWords : [],
    };
  },
  methods: {
    closeModal(){
this.active= false;
if(confirm('do you want to save do draft ?'))this.saveDraft()
else {this.resetInput()}
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  },
    addMail() {
      if(!this.newMail.to){ alert( `we don't know the address ... try again  ! `); return}
      if(!this.validateEmail(this.newMail.to)) { alert( `we don't know the address ... try again  ! `); return}
      this.$emit("addeMail", this.newMail);
      this.active = false;
      this.submitTo();
      this.resetInput()
    },
    composeMail() {
      this.active = true;
    },
    submitTo() {
      // this.searchWords.splice(0, this.searchWords.length - 1);
      let user = this.newMail.to.substring(0,this.newMail.to.indexOf("@"));
      if ((this.searchWords).includes(user)) return; 
      this.searchWords.push(user);
      mailService.saveEmailNames(this.searchWords)
    },
    createAutComplete(names){
      this.completeWords = names
    },
    autoComplete() {},
    saveDraft(){
      this.newMail.draft=true;
      this.active= false;
      this.$emit("addDraft", this.newMail);
      this.resetInput()
    },
    resetInput(){
      this.newMail = {
        to: "",
        cc: "",
        subject: "",
        body: "",
        draft: false
    }
  }
  },
  components: {},
  watch: {
    newMail: {
      handler(newVal, oldVal) {
        for (let index = 0; index < this.searchWords.length; index++) {
          if (newVal.to[0] === this.searchWords[index][0]) {
            const filteredNames = this.searchWords.filter((name)=>{
              if (name[0]===newVal.to[0]) return name
            })
            this.createAutComplete(filteredNames)
          }
        }
        
      },
      deep: true,
    },
    
  },
  // created() {
 
  // },
  components:{
    mailService
  }
};
