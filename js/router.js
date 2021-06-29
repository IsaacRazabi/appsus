import homePage from "./pages/home-page.js";
import emailApp from './apps/mail/pages/email-app.js'; 
import keepApp from './apps/keep/pages/keep-app.js';
import emailDetails from '../js/apps/mail/pages/email-details.js'
import booksApp from '../js/apps/book/books-vue/js/pages/book-app.js'



const routes = [
    {
        path:'/',
        component: homePage
    },
    {
        path:'/mail',
        component: emailApp,
        // children : [
        //     {
        //         path: ":mailId",
        //          component: emailDetails
        //        },
        // ]
    },
    {
        path: "/mail/:mailId",
         component: emailDetails
       },
    {
        path:'/keep',
        component: keepApp
    },

 {
        path:'/book',
        component: booksApp
    },
  
];

export const router = new VueRouter({routes});