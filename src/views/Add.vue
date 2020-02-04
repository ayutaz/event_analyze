<template>
    <div class="add">
        <form class="ui form">
            <div class="field">
                <label>商品</label>
                <div class="ui labeled input">
                    <div class="label">商品名</div>
                    <input v-model="items['1'].name">
                </div>
                <div class="ui labeled input">
                    <div class="label">個数</div>
                    <input v-model="items['1'].count">
                </div>
                <div class="ui labeled input">
                    <div class="label">値段</div>
                    <input v-model="items['1'].price">
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
      sum: '',
      sex: '',
      age: '',
      items: {
        1: {
          name: '',
          count: '',
          price: ''
        }
      }
    }
  },
  created: function () {
    this.db = firebase.firestore()
    this.age_list = store.state.age_list
    this.age()
  },
  methods: {
    addItems: function () {
      var _this = this

      // todos コレクションにドキュメントを追加
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
        // 追加に成功したら、name を空にする
          _this.sum = ''
          _this.sex = ''
          _this.age = ''
          _this['1'].name = ''
          _this['1'].count = ''
          _this['1'].count = ''
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
    }
  }
}
</script>
