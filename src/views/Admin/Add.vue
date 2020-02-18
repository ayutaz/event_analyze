<template>
    <div class="adminAdd ui form">
        <div class="field">
            <label>商品名</label>
            <input v-model="name" placeholder="卵焼き" type="text">
        </div>
        <div class="field">
            <label>値段</label>
            <input v-model="price" type="number" placeholder="100">
        </div>
        <button class="ui button" v-on:click.prevent="addItem()">追加</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      db: null,
      price: 0,
      name: null
    }
  },
  created () {
    this.db = firebase.firestore()
  },
  methods: {
    addItem: function () {
      let _this = this
      this.db.collection('items_index').add({
        name: _this.name,
        price: _this.price
      }).then(function () {
        console.log('dbへの商品の追加完了')
        _this.name = null
        _this.price = 0
      }).catch(function () {
        console.log('dbの商品の追加エラー')
      })
    }
  }
}
</script>
