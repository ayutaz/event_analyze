<template>
  <div class="dataChange">
    <label class="ui label">性別</label>
    <div class="ui buttons">
        <button class="ui button">男</button>
        <button class="ui button">女</button>
        <button class="ui button">その他</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataChange',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
