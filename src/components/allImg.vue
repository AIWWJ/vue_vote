<template>
<div>
  <!--相片展示区域  -->
  <div id="all_pic" class="w100 bs_bb">

      <!--搜索结果为空时显示  -->
      <div :class="{hide:isNull}" class="search_msg_box ab ab_50">
          <div class="search_null">
              <p>找不到诶，检查一下输入的内容，</p>
              <p>记得是作者或者是学校名称哦~</p>
          </div>
      </div>
      <!--搜索结果为空时显示  -->

      <!--第一名相片展示区域100%  -->
      <!-- <HotImg></HotImg> -->

      <div v-if='item.isFirst' id="first_one" class="rel w100" v-for="(item,index) in list">
        <div :class="{bd: item.isTick}" :title='item.rownum+ "."+item.productName' :data-school="item.productName">
          <div class="icons">
            <div class="hot_pic ab">
              <span class="ab">Hot</span>
              <img src="../assets/hot-icon.png" alt="热门标志">
            </div>
            <div class="tick_pic ab bs100" @click="tickPic(index)" :class="{ yel_tick: item.isTick }" :data-id="item.productId"></div>
          </div>
          <div @click="showVotePage(index)" class="pic">
            <img class="w100" :src="isPC ? item.productUrl : item.thumbnailUrl" alt="第一名图片">
          </div>
          <div class="pic_msg ab w100 bs_bb">
            <p class="msg_title">
              <span class="list"> {{item.rownum}} </span>
              <span>.</span>
              <span class="school_name"> {{item.productName}}</span>
            </p>
            <div class="first">
              <div class="author fl">
                <span>作者: </span>
                <span class="elp"> {{item.author}}</span>
              </div>
              <div class="like fr">
                <div class="like_num"> {{item.voteNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--剩下队伍相片展示，分为两列  -->
      <!-- <CommonImg></CommonImg> -->                      
      <!--下面为单独的相片  -->
      <div v-else class="pic_wrap bs_bb fl">
        <div :title='item.rownum+ "."+item.productName' class="pic_wrap_inner rel" :class="{bd: item.isTick}">
         <div :data-school="item.productName">
            <div @click="tickPic(index)" :class="{ yel_tick: item.isTick }" class="tick_pic ab bs100" :data-id="item.productId"></div>
            <div class="pic" @click="showVotePage(index)">
              <img class="bor_tb w100 bs_bb" :src="isPC ? item.productUrl : item.thumbnailUrl">
            </div>
            <div class="pic_msg ab w100 bs_bb">
              <div class="msg_other">
                <div class="author fl">
                  <span class="list"> {{item.rownum}} </span>
                  <span>.</span>
                  <span class="elp"> {{item.author}}</span>
                </div>
                <div class="like fr">
                  <div :class="{yel_heart:item.isTick}" class="like_num"> {{item.voteNum}}</div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>                      
      <!--其他图片展示结束  -->            
  </div>
  <!--全部相片展示结束  -->


  <!--投票页面  -->
  <div v-show="votePage" class="vote_page fixed ab_0 w100">
      <div class="vote_title rel">
          <div>
              <span @click="hideVotePage()" class="back">返回</span>
              <span @click="choseVote(index)" :class="{chosed: isChose}" class="chose bs_bb ab">选择</span>
          </div>
      </div>
      <div class="vote_pic rel w100 h100">
          <img class="ab" :src="voteImg">
      </div>
      <div class="vote_msg ab w100">
          <!--排名及学校信息  -->
          <p class="msg_title">
              <span class="list">{{voteList}}</span>
              <span>.</span>
              <span class="school_name">{{voteSchool}}</span>
          </p>
          <!--作者及已得票数  -->
          <div class="author_like">
              <div class="author fl">
                  <span>{{voteAuthor}}</span>
              </div>
              <div class="like fr">
                  <div :class="{yel_heart:isChose}" class="like_num">{{voteLikeNum}}</div>
              </div>
          </div>
      </div>
  </div>
  <!--投票页面  -->

  </div>
</template>

<script>
import {mapState} from 'vuex'
import objLength from '../js/common'
import storage from '../js/localstorage'
import system from '../js/system'
import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      searchText: '',
      voteProductIds: {},
      page: 0,
      isNull: true,
      // isFirst: false,
      isChose: false,
      maskText: '',
      choseIndex: 1,
      voteImg: '',
      voteList: '',
      voteSchool: '',
      voteAuthor: '',
      isPC: system,
      voteLikeNum: '',
      list: []
    }
  }, 
  computed: {
    ...mapState([
      'searchNull',
      'loading',
      'introPic',
      'voteBtn',
      'mask',
      'dataList',
      'votePage',
      'tick'
    ])
  },
  mounted () {
    this.getData(this.page)
    // 获取及设置投票id等
    // var storage = window.localStorage
    if (storage.fetch('voteId')) {
      storage.save('voteId', storage.fetch('voteId'))
      storage.save('voteArr', storage.fetch('voteArr'))
    } else {
      storage.save('voteId', '')
      storage.save('voteArr', '')
    }
  },
  methods: {
    // 隐藏活动介绍
    hideIntro: function () {
      this.$store.dispatch('getIntroPic', false)
    },
    // 隐藏投票页面
    hideVotePage: function () {
      this.$store.dispatch('getVotePage', false)
    },
    // 隐藏投票达到指定次数
    hideMask: function () {
      this.$store.dispatch('getMask', false)
    },
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
      this.searchText = ''
    },
    // 点击小勾，选择当前对象
    tickPic: function (index) {
      // console.log(item.rownum++)
      // console.log($(index.srcElement).attr('width'))
      var arr = this.list
      var item = arr[index]
      item.isTick = !item.isTick
      // console.log(item.isTick)
      this.voteProductIds[item.productId] = item.isTick
      // console.log(this.voteProductIds)
      if (objLength(this.voteProductIds) > 3) {
        // lenInTickObj存放tickObj中已选中的元素
        var lenInTickObj = 0
        for (var key in this.voteProductIds) {
          if (this.voteProductIds[key] === false) {
            delete this.voteProductIds[key]
          }
          if (this.voteProductIds[key] === true) {
            lenInTickObj++
          }
        }
        // console.log(lenInTickObj)
      }
      // 限制用户最多选中3张图片
      if (lenInTickObj >= 4) {
        this.maskText = '最多只能选择3张照片'
        this.$store.dispatch('getMask', true)
        // $(this).click()
        this.tickPic(index)
      }
      if (this.voteBtnShow(this.voteProductIds)) {
        this.$store.dispatch('getVoteBtn', true)
      } else {
        this.$store.dispatch('getVoteBtn', false)
      }
      var originValue = parseInt(item.voteNum)
      if (item.isTick) {
        item.voteNum = parseInt(item.voteNum) + 1
        originValue = item.voteNum
      } else {
        item.voteNum = originValue - 1
      }
      arr[index] = item
    },
    // voteBtnShow用来判断页面中是否有元素被选中，有则继续显示投票按钮
    voteBtnShow: function (obj) {
      var counter = 0
      for (var key in obj) {
        if (obj[key] === true) {
          counter++
        }
        if (counter > 0) {
          return true
        } else {
          return false
        }
      }
    },
    // 点击图片，显示投票页面
    showVotePage: function (index) {
      var arr = this.list
      var item = arr[index]
      this.choseIndex = index
      this.isChose = item.isTick
      this.voteImg = item.productUrl
      this.voteList = item.rownum
      this.voteSchool = item.productName
      this.voteAuthor = item.author
      this.voteLikeNum = item.voteNum
      // console.log(this.voteImg)
      // this.$store.dispatch('getVotePage', !this.$store.state.votePage)
      this.$store.dispatch('getVotePage', true)
      arr[index] = item
    },
    choseVote: function () {
      var index = this.choseIndex
      this.tickPic(index)
      var arr = this.list
      var item = arr[index]
      console.log(index)
      this.isChose = item.isTick
      this.voteLikeNum = item.voteNum
      arr[index] = item
    },
    // 加载数据到页面
    getData: function (page) {
      var _this = this
      // this.$http.get('../js/data.js').then(function (datas) {
      //   console.log('加载本地json文件成功')
      //   console.log(datas)
      //   _this.list = datas.bodyText
      //   console.log(_this.list)
      // }, function (error) {
      //   console.log(error)
      // })
      axios.get(
          'http://uc.nfapp.southcn.com/amuc/api/mileMoments/productInfos', {
            params: {
              page: page,
              orderType: 'hot',
              pageRows: 10
            }
          }
        ).then(function (response) {
          // console.log('加载成功')
        //  console.log(response.data)
         // 为每个数据添加isTick属性
          var datalist = response.data.list
          for (var i = 0; i < datalist.length; i++) {
            datalist[i].isTick = false
            if (datalist[i].rownum === '1') {
              datalist[i].isFirst = true
            }
          }
          _this.list = datalist
          // console.log(_this.list)
        }, function (error) {
          // console.log('加载出错')
          console.log(error)
        })
    },
    // 点击投票按钮进行投票
    vote: function () {
      var voteArr = []
      var t = new Date()
      var time = t.getFullYear() + '' + (t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + parseInt(1e5 * Math.random())
      // voteArr数组用来存放用户选取的投票对象的id
      for (var key in this.voteProductIds) {
        if (this.voteProductIds[key] === true) {
          voteArr.push(key)
        }
      }
      //  判断本地是否存在投票id等信息
      if (window.localStorage) {
        storage.save('voteArr', voteArr.join(','))
        if (!storage.fetch('voteId')) {
          storage.save('voteId', time)
        }
        console.log(storage.fetch('voteArr'))
        console.log(storage.fetch('voteId'))
      }
      var deviceId = storage.fetch('voteId')
      // 将用户选中的对象及deviceId传给服务器
      var voteString = voteArr.join(',') + '&deviceId=' + deviceId + '&userId='
      axios.get('http://uc.nfapp.southcn.com/amuc/api/mileMoments/vote?productIds=' + voteString)
      .then(function (response) {
        var res = response.data
        console.log(res)
        if (res.code === '1000') {
          this.$router.push('result')
        } else {
          this.maskText = res.result
          this.$store.dispatch('getMask', true)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
