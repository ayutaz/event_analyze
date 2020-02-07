<template>
    <div class="add">
        <form class="ui form">
            <div class="field" v-for="(item,key) in items" :key="key">
                <label>商品</label>
                <div class="ui labeled input">
                    <div class="label">商品名</div>
                    <input v-model="item.item_name" readonly="" type="text">
                </div>
                <div class="ui labeled input">
                    <div class="label">個数</div>
                    <input v-model="item.item_count" type="number" placeholder="0">
                </div>
                <div class="ui labeled input">
                    <div class="label">値段</div>
                    <input v-model="item.item_price" readonly="" type="number">
                </div>
                <div class="ui labeled input">
                  <div class="label">合計</div>
                  <input v-model="sum" readonly="">
                </div>
            </div>
            <div class="field">
                <label>性別</label>
                <input v-model="sex" type="radio" value="男">
                <label>男</label>
                <input v-model="sex" type="radio" value="女">
                <label>女</label>
            </div>
            <div class="field">
                <label>年齢</label>
                <select class="ui dropdown" v-model="age" id="age">
                  <option disabled value="">年齢</option>
                  <option v-for="option in age_list" :key="option.id">
                    {{option.text}}
                  </option>
                </select>
            </div>
            <button class="ui button" v-on:click="addItems()">追加</button>
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
        items: {
          1: {
            name: _this['1'].name,
            count: _this['1'].count,
            price: _this['1'].price
          }
        }
      })
        .then(function () {
          console.log('dbへの追加完了')
          // 追加に成功したら、name を空にする
          _this.sum = 0
          _this.sex = ''
          _this.age = 0
          _this['1'].name = ''
          _this['1'].count = 0
          _this['1'].price = 0
        })
        .catch(function () {
        // エラー時の処理
          console.log('dbの追加エラー')
        })
    }
  },
  watch: {
    age: function (event) {
      // eslint-disable-next-line no-undef
      $('#age').dropdown()
    },
    items: {
      handler: function () {
        for (let i = 0; i < this.items.length; i++) {
          console.log('count:' + this.items[i].item_count + ',price:' + this.items[i].item_price)
          this.sum = this.items[i].item_count * this.items[i].item_price
        }
        console.log('itemの長さ:' + this.items.length + ',合計金額:' + this.sum)
      },
      deep: true
    }
  }
}
</script>
