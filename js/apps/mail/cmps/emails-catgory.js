
export default {
    template: `
    <section class="mail-categories">
<ul>
    <li data-trans="inbox"  @click="resetMails" class="inbox"> <router-link to="/mail"> inbox</router-link> </li>
    <li data-trans="starred" class="starred" @click="filterByRead"> starred </li>
    <li data-trans="sentMail" class="sent" @click="filterBySent" >sent mail</li>
    <li data-trans="drafts" @click="showDraft" class="drafts">drafts</li>
</ul>
    </section>
    `,
    methods: {
        filterByRead(){
          this.$emit("filterListByRead" , 'read')
        },
        filterBySent(){
          this.$emit("filterListByTime", 'time')
        },
        resetMails(){
this.$emit("resetMail")
        },
        showDraft(){
            this.$emit("showDrafts")
        }
    },
    components: {
       
    },
  };