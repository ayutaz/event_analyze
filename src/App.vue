<template>
  <div id="app">
    <div class="ui top">
      <div class="ui continer">{{pageTitle}}</div>
    </div>
    <router-view/>
    <div class="ui bottom fixed massive three item menu">
      <router-link to="/" class="item">ホーム</router-link>
      <router-link to="/add" class="item">追加</router-link>
      <router-link to="/admin" class="item">管理画面</router-link>
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
