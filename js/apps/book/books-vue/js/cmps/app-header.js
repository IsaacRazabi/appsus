export default {
  template: `
    <header class="app-header">
        <div class="logo">
       <h3>book <span>palace</span> </h3>
        </div>
        <nav class="menu" >
                <router-link to="/" class="home" exact>Home</router-link> 
                <router-link to="/book" class="books" >books</router-link> 
                <router-link to="/about" class="about" >About</router-link> 
        </nav>
    </header>
    `,
};
