<template>
<!--搜索框  -->
  <div id="form">
    <div class="search_input rel bs_bb h100">
        <span class="search_icon ab"></span>
        <input class="keyWord" type="text" placeholder="请输入作者或作品名" @keyup.13="search()" v-model="searchText">
        <span class="close_icon ab" @click='clearText()' v-if='searchText'></span>
    </div>
    <span class="search_btn">                    
        <input @click="search()" type="button" value="搜索">
    </span>
  </div>
 
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      searchText: '',
      list: []
    }
  },
  computed: {
    ...mapState([
      'datas'
    ])
  },
  methods: {
    search: function () {
      var _this = this
      if (_this.searchText === '') {
        _this.getData(0)
        return
      }
      axios.get(
        'http://uc.nfapp.southcn.com/amuc/api/mileMoments/queryProducts', {
          params: {
            page: 0,
            orderType: 'hot',
            pageRows: 10,
            kw: this.searchText
          }
        }
      ).then(function (response) {
        console.log('加载成功')
        console.log(response.data)
        var datas = response.data
      //  var totalPerson = datas.totalProductsNum
      //  this.$store.dispatch('getDatas', response.data.list)
        if (datas.list.length === 0) {
          _this.list = []
          _this.isNull = false
          // this.$store.dispatch('getTickPic', !this.$store.state.tick)
          // _this.$store.dispatch('getSearchNull', true)
        } else {
          _this.isNull = true
          _this.list = datas.list
          // _this.$store.dispatch('getSearchNull', false)
        }
        console.log(_this.list.length)
      }, function (error) {
        // console.log('加载出错')
        console.log(error)
      })
    },
    clearText: function () {
      this.clearText = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
