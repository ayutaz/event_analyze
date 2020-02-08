<template>
    <div class="adminEdit">
      <form class="ui form">
        <div class="field">
          <label>商品名</label>
          <input type="text" v-model="item_name">
        </div>
        <div class="field">
          <label>値段</label>
          <input type="number" v-model="item_price">
        </div>
      </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      item_name: null,
      item_price: null
    }
  },
  created () {
    this.db = firebase.firestore()
    this.db.collection('items_index').doc(this.$route.params.id).onSnapshot(function (doc) {
      let datas = doc.data()
      console.log(datas)
      this.item_name = datas.item_name
      this.item_price = datas.item_price
    })
  }
}
</script>
