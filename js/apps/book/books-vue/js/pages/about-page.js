import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="home-page app-main">
            <h2 ref="header">About us...</h2>
            <button @click="callBus">Call the bus</button>
            <input type="text" v-model="greet.txt" keyup.enter="submitStuff"  />
        </section>
    `,
    data(){
        return{
            greet: {txt:''},
            searchWords :[],
        }
    },
    watch :{
        greet :{
            handler(newVal,oldVal){
                console.log(newVal,oldVal);
                console.log(this.searchWords)
            },
            deep:true
        }
    },
    methods: {
        submitStuff(){
            this.searchWords.push(greet.txt)
        }
    },
    created() {
    },
    mounted(){
    
    },
    methods: {
        callBus() {
            // console.log(this.$refs.header);
            // eventBus.$emit('puk')
            // eventBus.$emit('puk2')
        }
    },
};