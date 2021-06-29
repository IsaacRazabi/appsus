export default {
    template: `<main class="home-page"  :style="{backgroundImage:changeBg}">
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