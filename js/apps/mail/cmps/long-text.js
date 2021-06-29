

export default {
    props: ['txt','mail'],
    template: `
    <div class="long-text">
       <section>
       <div class="long-header"> 
           {{mail.subject}}
           <div class="btn-long">
       <router-link :to="'/mail/'+mail.id" > <button>  📇  </button> </router-link>
       <button @click.prevent="remove(mail.id)">❌</button>
       </div>
       </div>
       <p> {{mail.sentBy}} - <{{mail.sentBy}}@gmail.com> </p>
           <p>{{displayText}}</p>
      </section>
    </div>
    `,
    data() {
        return {
            isShowingFullText: false
        }
    },
    methods: {
        toggleTextDisplay() {
            this.isShowingFullText = !this.isShowingFullText;
        },
        remove(mailId) {
      this.$emit("removed", mailId);
    },

},
    computed: {
        displayText() {
                return this.txt;
        },
        address(){
            return this.mail.sentBy
        }
 
    },
    components:{
    
    }
};