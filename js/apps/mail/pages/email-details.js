import longText from "../cmps/long-text.js";
import { mailService } from "../services/email-service.js";
import { eventBus } from "../services/event-bus-service.js";

export default {
  template: `
    <section v-if="mail"  >
        <router-link to="/mail"><button >X</button></router-link>
        <div class="details-container"> 
        <section class = "details">
          <p> {{mail.sentTo}}</p>
      <p> {{mail.subject}}</p>
      <p>{{mail.body}} </p>
        <p>sent at: {{mail.sentAt}} </p>
    </section>
    <router-link  :to="'/mail/' + lastMailId">previous mail</router-link>
    <router-link :to="'/mail/' + nextMailId">Next mail</router-link>
    </div>
    </section>
    `,
  data() {
    return {
      mail: null,
      nextMailId: null,
      lastMailId: null,
    };
  },
  created() {
    const { mailId } = this.$route.params;
    mailService
      .getMailById(mailId)
      .then((mail) => (this.mail = mail))
      .then((mail) => (mail.isRead = true));
  },
  computed: {},

  methods: {
    addMail(mail) {
      mailService
        .addMail(this.mail)
        .then((mail) => {
          this.mail = mail;
          const msg = {
            txt: "Your email was successfully added!",
            type: "success",
            linkTitle: "go to mail",
            link: "/mail/" + this.mail.id,
          };
          eventBus.$emit("show-msg", msg);
        })
        .catch((err) => {
          const msg = {
            txt: err,
            type: "fail",
          };
          eventBus.$emit("show-msg", msg);
        });
    },
  },
  watch: {
    "$route.params.mailId": {
      immediate: true,
      handler() {
        const { mailId } = this.$route.params;
        mailService.getMailById(mailId).then((mail) => (this.mail = mail));
        mailService.getNextMailId(mailId).then((mailId) => {
          this.nextMailId = mailId;
        });
        mailService.lastMailId(mailId).then((mailId) => {
          this.lastMailId = mailId;
        });
      },
    },
  },
  components: {
    longText,
  },
};
