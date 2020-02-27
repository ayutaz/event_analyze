<template>
  <div id="app">
    <div class="ui three item menu">
      <router-link to="/" class="item">
        <img src="/img/logo/logo.png">
      </router-link>
      <div class="item header">{{pageTitle}}</div>
      <router-link to="/help" class="item">
        <i class="question circle outline big icon"></i>
      </router-link>
    </div>
    <div class="ui main container">
    <router-view/>
    </div>
    <div class="ui bottom fixed massive three item menu">
      <router-link to="/" class="item"><i class="home icon"></i>ホーム</router-link>
      <router-link to="/add" class="item"><i class="plus icon"></i>追加</router-link>
      <router-link to="/admin" class="item"><i class="setting icon"></i>管理画面</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  computed: {
    pageTitle () {
      return !!this.$route.meta && !!this.$route.meta.title ? this.$route.meta.title : 'Default title'
    }
  }
}
</script>
