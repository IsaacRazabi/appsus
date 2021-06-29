export default {
    template: `
      <header class="app-header">
      <div class="logo"><img src="../../pic/logo/logoKS.jpg"></div>
          <nav class="nav-menu" >
                  <router-link to="/" class="home" exact>Home</router-link> | 
                  <router-link to="/mail"  >mail</router-link> |
                  <router-link to="/keep"  >note</router-link> |
                  <router-link to="/book"  >book</router-link> 
          </nav>
      </header>
      `,
  };
  