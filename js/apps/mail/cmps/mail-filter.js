export default {
    template: `
    <section class="mail-filter">
    <div class="justify-content searchField">
        <input @input="filter" v-model="filterBy.subject" type="text"  placeholder="Search..."> 
     <button @click="filter" class="btn-filter">search emails </button> 
  </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
               subject: '',
                isRead: false,
               sentAt: Date.now()
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy , 'text');
        }
    }
  };