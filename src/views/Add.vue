<template>
    <div class="add ui main container">
        <form class="ui form">
          <h4 class="ui dividing header">販売品入力</h4>
          <div class="ui field">
            <div class="two fields" v-for="(item,key) in items" :key="key">
              <div class="four wide field">
                <label>商品名</label>
                <input v-model="item.item_name" readonly="" type="text">
              </div>
              <div class="two wide field">
                <label>個数</label>
                <input v-model.number.trim="item.item_count" type="number" placeholder="">
              </div>
            </div>
          </div>
          <div class="ui labeled input">
            <div class="label ui header">合計</div>
            <input v-model="sum" readonly="">
          </div>
          <div class="field">
              <label>性別</label>
              <div class="ui buttons">
                <button class="ui button" @click="changeSex('男')" type="button">男性</button>
                <button class="ui button" @click="changeSex('女')" type="button">女性</button>
                <button class="ui button" @click="changeSex('その他')" type="button">その他</button>
              </div>
          </div>
          <div class="field">
            <label>年齢</label>
            <select v-model.trim="age" id="age">
              <option v-for="option in age_list" :key="option.id">
                {{option.text}}
              </option>
            </select>
          </div>
          <button class="ui positive button" v-on:click.prevent="addItems()">追加</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store/index'
export default {
  name: 'add',
  data: function () {
    return {
      db: null,
      age_list: null,
      sum: 0,
      sex: '',
      age: 0,
      items: []
    }
  },
  created: function () {
    this.db = firebase.firestore()
    this.age_list = store.state.age_list
    let _this = this
    this.db.collection('items_index').onSnapshot(function (querySnapshot) {
      _this.items = []
      querySnapshot.forEach(function (doc) {
        let data = doc.data()
        data.item_count = 0
        _this.items.push(data)
      })
    })
  },
  methods: {
    addItems: function () {
      var _this = this
      this.db.collection('historys').add({
        sum: _this.sum,
        sex: _this.sex,
        age: _this.age,
        items: _this.items,
        buy_time: new Date()
      })
        .then(function () {
          console.log('dbへの追加完了')
          // 追加に成功したら、name を空にする
          _this.sum = 0
          _this.items.item_count = 0
          _this.sex = ''
          _this.age = 0
        })
        .catch(function () {
        // エラー時の処理
          console.log('dbの追加エラー')
        })
    },
    changeSex: function (sex) {
      this.sex = sex
    }
  }
}
</script>
