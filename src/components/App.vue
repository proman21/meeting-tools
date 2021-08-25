<template>
  <div id="app">
    <nav class="nav-extended">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo right">Meeting Tools</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <router-link tag="li" to="/speaking">
            <a>Speaking List</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  nav {
    height: calc(2 * 64px);
  }
</style>
