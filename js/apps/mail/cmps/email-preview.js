
import longText from "./long-text.js";
import addMail from "./add-mail.js";
import emailDrafts from './email-drafts.js'

export default {
    props: ['mail',"showDraft"],
    template:`
    <section>
    <section v-if="!showDraft">
     <section v-if="!mail.isDraft" >
      <div  v-on:click="showMore" v-bind:class="{read: isPressed, new:!mail.isRead}"  class="mail flex" >
        <span>{{mail.sentBy}}</span>
        <span>{{mail.subject}} - {{partText}} </span> 
        <span > {{time}}</span>
      </div>
      <long-text @removed="removeMail" v-if="isPressed" :txt="mail.body" :mail="mail" > </long-text> 
</section>
</section>

<section v-if="showDraft">
<section v-if="mail.isDraft" >
      <div  v-on:click="showMore" v-bind:class="{read: isPressed}"  class="mail flex" >
        <span>{{mail.sentBy}}</span>
        <span>{{mail.subject}} - {{partText}} </span> 
        <span > {{time}}
        <span @click="editMail"> 📤</span>
        <div v-if="edit">
          <email-drafts :mailToEdit="mailToEdit"></email-drafts>
        </div>
        </span>
      </div>
      <long-text @removed="removeMail" v-if="isPressed" :txt="mail.body" :mail="mail" > </long-text> 
</section>
</section>

</section>
      `,
       data(){
        return{
          mailToEdit : this.mail,
          isActive:this.mail.isRead,
          time: this.mail.sentAt,
          isPressed:false,
          chooseList : this.showDraft,
          edit:false
        }
      },
      created() {
      },
      methods: {
        showMore(){
this.isPressed = !this.isPressed;
this.mail.isRead = true;
        },
        removeMail(mailId){
          this.$emit("removed", mailId);
        },
        editMail(){
          this.edit=true;
        }
      },
      
      computed:{
        partText(){
     return this.mail.body.substring(0,7)
        }
  },
  components: {
    longText,
    addMail,
    emailDrafts
  },
  }

  