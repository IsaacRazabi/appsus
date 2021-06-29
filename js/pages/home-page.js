export default {
    template: `<main class="home-page"  :style="{backgroundImage:changeBg}">
          <header class="app-header">
      <!-- <div class="logo"><img src="../../pic/logo/logoKS.jpg"></div> -->
          <nav class="nav-menu" >
                  <router-link to="/" class="home" exact>Home</router-link> | 
                  <router-link to="/mail"  >mail</router-link> |
                  <router-link to="/keep"  >note</router-link> |
                  <router-link to="/book"  >book</router-link> 
          </nav>
      </header>
                </main>`
                ,
                data() {
                    return {
                        interval: null,
                        imgUrl: 1,
                    };
                },
                computed: {
                    changeBg() {
                        //  return `url("img/bg/bg-img${this.imgUrl}.webp")`;
                        if (this.imgUrl === 1) return 'url("css/img/bg/bg-img1.webp")';
                        if (this.imgUrl === 2) return 'url("css/img/bg/bg-img5.webp")';
                        if (this.imgUrl === 3) return 'url("css/img/bg/bg-img10.webp")';
                    },
                },
                created() {
                    this.interval = setInterval(() => {
                        this.imgUrl++;
                        if (this.imgUrl > 3) this.imgUrl = 1;
                    }, 6000);
                },
                destroyed() {
                    clearInterval(this.interval);
                },
};



         // <div class="bg-img">
                    // <img src="../../pic/bg-img/bg-mark.jpg">