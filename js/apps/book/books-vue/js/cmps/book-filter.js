export default {
  template: `
  <section class="book-filter">
  <div class="searchField">
      <label>Title:</label>
      <input v-model="filterBy.title" type="text"  placeholder="Search..."> 
      Price
      From
      <section class="prices-filter">
     <input v-model.number="filterBy.minPrice" type="number" placeholder="minimum price" />
     to
      <input v-model.number="filterBy.maxPrice" type="number" placeholder="maximum price" />
    </section>
    <button @click="filter" class="btn-filter">Find my books </button>
</div>
  </section>
  `,
  data() {
      return {
          filterBy: {
              title: '',
              minPrice: 0,
              maxPrice: 1000 ** 1000
          }
      };
  },
  methods: {
      filter() {
          this.$emit('filtered', this.filterBy);
      }
  }
};