<template>
    <div class="adminIndex">
        <div class="ui buttons" v-for="(item,key) in items" :key="key">
            <router-link :to="{name:'adminEdit',params:{id:item.id}}" class="ui blue big button">{{item.name}}</router-link>
        </div>
        <div class="ui buttons">
          <router-link to="/admin/add" class="ui button">商品の追加</router-link>
        </div>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../../store/index'
export default {
  name: 'adminIndex',
  data () {
    return {
      db: null,
      items: [],
      sexCount: {
        man: 0,
        woman: 0,
        other: 0
      },
      graphData: {
        data: null
      }
    }
  },
  created () {
    this.db = firebase.firestore()
    let _this = this
    this.db.collection('items_index').onSnapshot(function (querySnapshot) {
      _this.items = []
      querySnapshot.forEach(function (doc) {
        let data = doc.data()
        data.id = doc.id
        _this.items.push(data)
      })
    })
    this.searchSexAnalyze()
  },
  mounted () {
    this.graphData.data = store.state.label
  },
  methods: {
    searchSexAnalyze: function () {
      this.items.forEach(function (item) {
        if (item.sex === '男') this.sexCount.man += 1
        else if (item.sex === '女') this.sexCount.woman += 1
        else if (item.sex === 'その他') this.sexCount.other += 1
      })
    }
  }
}
</script>
