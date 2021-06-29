export default {
    props: ['note'],
    template: ` <section class="note-preview">
                    <div v-if="isText">
                        <p>Type: {{note.type}}</p>
                        <p class="titleNote">{{note.title}}</p>
                        <p>{{note.txt}}</p>
                        <p>Pinned: {{note.isPinned}}</p>
                    </div>

                    <div v-if="isImg">
                        <p>Type: {{note.type}}</p>
                        <p class="titleNote">{{note.title}}</p>
                        <p><img src="https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg"/></p>
                        <p>Pinned: {{note.isPinned}}</p>
                    </div>

                </section>`,
    data(){
        return{
            isText: null,
            isImg: null,
            imgUrl: this.note.url,
        }
    },
    created(){
            if (this.note.type==='noteText') this.isText = true;
            if (this.note.type==='noteImage') this.isImg = true;

            console.log('this.isImg:',this.isImg)
            console.log('this.isText:',this.isText)
            console.log('this.note.type:',this.note.type)
        }
};

// v-if="note.type === 'noteText'"