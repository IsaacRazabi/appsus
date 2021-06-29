import { i18nService } from '../services/i18n-service.js'

export default {
  props: ['book'],
  template:`
    <div class="book-preview">
      <p>{{book.title}}</p>
      <p>just today:{{getCurrentCurrency}}</p>
      <div v-if="book.listPrice.isOnSale" class="for-sale" > for sale  </div>
      <!-- <div v-if="book.listPrice.isOnSale" v-bind:class="{ active: for-sale }"></div> -->
      <!-- src="../img/download.jpg" -->
      <img :src="book.thumbnail">
    </div>
    `,
    computed:{
        getCurrentCurrency() {
            return i18nService.getCurrency(this.book)
},
}
}