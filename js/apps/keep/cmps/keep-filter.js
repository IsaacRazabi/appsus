export default{
    template:  `<section class="keep-filter">
                    <label>Search:</label>
                    <input v-model="filterBy.txt" type="text" @input="filter" placeholder="Search">
                    <select name="filter-select" id="filter-ops">
                                <option value="text">Text</option>
                                <option value="title">Title</option>
                            </select>
                </section>`,
    data() {
        return {
            filterBy: {
                txt:'',
                title:'',
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        }
    }
};
