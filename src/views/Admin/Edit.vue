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
        <div class="ui centered grid">
          <button class="ui positive button four wide column" type="button" @click="changeItem()">変更</button>
          <button class="ui negative button four wide column" type="button" @click="deleteItem()">削除</button>
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
    let _this = this
    this.db.collection('items_index').doc(this.$route.params.id).onSnapshot(function (doc) {
      let datas = doc.data()
      _this.item_name = datas.item_name
      _this.item_price = datas.item_price
    })
  },
  methods: {
    changeItem: function () {
      this.db.collection('items_index').doc(this.$route.params.id).set({
        item_name: this.item_name,
        item_price: this.item_price
      }).then(function () {
        console.log('Document successfully written!')
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },
    deleteItem: function () {
      this.db.collection('item_index').doc(this.$$route.params.id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }
}
</script>
