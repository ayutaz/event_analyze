<template>
    <div class="edit">
      <form class="ui form">
        <div class="field">
          <label>年齢</label>
          <input v-model="age">
        </div>
        <div class="field ui grid">
            <label>性別</label>
            <div class="ui buttons">
              <button class="ui button" @click="changeSex('男')" type="button">男性</button>
              <button class="ui button" @click="changeSex('女')" type="button">女性</button>
              <button class="ui button" @click="changeSex('その他')" type="button">その他</button>
            </div>
          </div>
        <div class="ui centered aligned grid">
          <button class="ui positive button four wide column" type="button" @click="changeItem()">変更</button>
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
      db: null,
      items: [],
      age: 0,
      sum: 0,
      sex: null,
      buyTime: null
    }
  },
  created () {
    this.db = firebase.firestore()
    let _this = this
    this.db.collection('historys').doc(this.$route.params.id).onSnapshot(function (doc) {
      _this.items = []
      let datas = doc.data()
      datas.buyTime = datas.buyTime.toDate()
      _this.buyTime = datas.buyTime
      _this.age = datas.age
      _this.sex = datas.sex
      _this.items = []
      datas.items.forEach(function (item) {
        _this.items.push(item)
      })
    })
  },
  methods: {
    changeItem: function () {
      this.db.collection('historys').doc(this.$route.params.id).update({
        age: this.age,
        sex: this.sex
      }).then(function () {
        console.log('Document successfully written!')
      }).catch(function (error) {
        console.error('Error writing document: ', error)
      })
    },
    changeSex: function (sex) {
      this.sex = sex
    }
  }
}
</script>
