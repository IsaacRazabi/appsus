import bookApp from "./pages/book-app.js";
import { router } from "./router.js";
import appHeader from "./cmps/app-header.js";
import appFooter from "./cmps/app-footer.js";

const options = {
  el: '#app',
  router,
  template: `
 <section>
 <app-header />
 <router-view />
 <app-footer />
 </section>
 `,
  components: {
    appHeader,
    appFooter,
    bookApp,
  },
};

const app = new Vue(options);
