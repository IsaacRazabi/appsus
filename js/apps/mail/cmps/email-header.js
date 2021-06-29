
import { i18nService } from "../services/i18n-service.js";

export default {
    template: `
      <header class="email-header">
<!-- Button to Open the Modal -->
<header>

  <select v-bind:class="{selectLang:isHeb}" v-model="selectedDetailId" @change="onSetLang">
    <option  v-for="detail in details" v-bind:value="detail.id">
      {{detail.name}}
    </option>
  </select>
</div>
    </header>

<!-- The Modal -->
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <!-- <img src="'../../../../pic/logo/logoKS.jpg'" alt=""> -->
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

      </header>
      `,
      data() {
        return {
          lang :'en',
        selectedDetailId: 0,
    details: [
      { id: 0, name: 'en' },
      { id: 1, name: 'he' },
    ],
    isHeb : false
  }
      },
      methods: {
        onSetLang() {
          let lang =this.details[this.selectedDetailId].name ;
          i18nService.setLang(lang);
          if(lang === 'he') this.isHeb = true
          else {this.isHeb = false}
          console.log(this.isHeb);
          // if (this.lang === 'he') {
            this.$emit('changeLng', this.selectedDetailId)
          // } 
          // if (this.lang === 'en') {
          //   this.$emit('changeLng','en')
          // } 
          //  document.body.classList.add('rtl')
          // else document.body.classList.remove('rtl')
          // render();
          i18nService.doTrans();
      }
      },
      component:{
        i18nService
      }
  };
  