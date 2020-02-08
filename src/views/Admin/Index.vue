<template>
    <div class="adminIndex">
        <div class="ui buttons" v-for="(item,key) in items" :key="key">
            <router-link :to="{name:'adminEdit',params:{id:item.id}}" class="ui blue big button">{{item.item_name}}</router-link>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  data () {
    return {
      db: null,
      items: [],
      sexCount: {
        man: 0,
        woman: 0
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
    // this.$store.getters.getHistroyList.forEach(function (item) {
    //   if (item.sex === '男') this.sexCount.man += 1
    //   else if (item.sex === '女') this.sexCount.woman += 1
    // })
  },
  mounted () {
    // this.renderChart({
    //   labels: ['男', '女'],
    //   datasets: [this.sexCount.man, this.sexCount.woman]
    // })
  }
}
</script>
