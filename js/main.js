import emailApp from './apps/mail/pages/email-app.js';
import keepApp from './apps/keep/pages/keep-app.js';
import appHeader from './pages/app-header.js';
import homePage from './pages/home-page.js';
import appFooter from './pages/app-footer.js';
import {router} from './router.js';
import bookApp from './apps/book/books-vue/js/pages/book-app.js';

const options = {
    el: '#app',
    router,
    template:`<section>
                <app-header/>
                <router-view/>
                <app-footer/>
            </section>`,
    components: {
        emailApp,
        keepApp,
        appHeader,
        homePage,
        appFooter,
        bookApp
    }
};

new Vue(options);
