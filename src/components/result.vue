<template>
  <div class="main">
    <!--banner图片  -->
    <!-- <Banner :hideIntro='hide'></Banner> -->    
    <div class="header_pic rel">
        <img class="banner" src="../assets/banner.png" alt="最酷毕业季广东高校摄影大赛">        
    </div>

    <div class="vote_box">
      <!--投票结果  -->
      <div class="vote_result">
        <div class="vote_text">投票结果</div>
        
        <!-- <div ref="yel" v-for="(item,index) in voteResult"> -->
        <!--单个投票人结果  -->
          <div :ref="'yel' + index" v-for="(item,index) in voteResult" class="vote_one">
            <div class="vote_target">
              <div class="vote_target_pic">
                <img :src="item.productUrl">
              </div>
              <div class="vote_target_msg">
                <div class="vote_author"> {{item.author}} </div>
                <div class="vote_ba">
                  <div data-vote="true" class="vote_msg">
                    <span class="gray_bar rel">
                      <!-- <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="leave"> -->
                      <!-- :style="{width:widthList[index]+'px'}" -->
                       <transition name="fade"> <!--v-if="show" :style="{'width':widthList[index]+'px'}"-->
                        <span v-if="show" class="yel_bar ab" :key="index" :index="index"></span>
                       </transition>
                      <!-- </transition> v-if="show" :key="index" -->
                    </span>
                  </div>
                  <div class="vote_data"> {{item.voteNum}} </div>
               </div>
              </div>
            </div>
          </div>

        <!-- </div> -->
        <!--单个投票人结果  -->
      </div>

      <!--投票排行榜  -->
      <div class="rank">
        <div class="vote_text">投票排行榜</div>

        <!--投票排行榜列表 -->
        <!-- <div id="other_pics"> -->
          <!--大相片盒子，包含所有的单元盒子  -->
          <div class="pic_box w100">
            <!--下面为单独的相片  -->
            <div class="pic_wrap fl bs_bb" v-for="(item,index) in rankList">
              <div class="pic_wrap_inner rel">
                <div class="rank_pic ab">                             
                  <div class="rank_num ab">{{item.rownum}}</div>
                </div>
                <div class="pic">
                  <img class="bor_tb w100 bs_bb" :src="item.productUrl">
                </div>
                <div class="vote_pic_msg ab bs_bb w100">
                  <div class="msg_other">
                    <div class="author elp fl">
                      <span>{{item.author}}</span>
                    </div>
                    <div class="like fr">
                      <span class="like_num">{{item.voteNum}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--大相片盒子结束  -->
        <!-- </div> -->
        <!--其他图片展示结束  -->
      </div>
    </div>
    
    <!--数据加载完成之前的动画  -->
    <div v-show="loading" class="loading fixed ab_0">
        <div class="ab">
            <div class="load_box">
                <div class="ajax-loader"></div>
                <p>小鲜肉们</p>
                <p>正在来袭</p>
            </div>
        </div>
    </div>

  </div>  
</template>

<script>
// import {mapState} from 'vuex'
// import Banner from './banner'
import axios from 'axios'
import storage from '../js/localstorage'
export default {
  name: 'result',
  data () {
    return {
      tst: 'width 2s linear',
      // bar: false,     // 黄色数据条
      loading: true,  // 加载数据完成前的动画
      rankList: [],
      num: 0,        // 记录被投选手个数
      // hide: true,
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      totalVoteNum: 0,
      // numList: {},  // 用来存放投票结果中数据的票数
      // grayWidth: 0,  // gray_bar的宽度:parseFloat(document.documentElement.style.fontSize) * 10
      widthList: [],  // 用来存放投票结果条的宽度
      totalNum: [],  // 该数据用来存放包含总票数的信息
      voteArr: storage.fetch('voteArr').split(','),
      url: 'http://uc.nfapp.southcn.com/amuc/api/mileMoments/productDetail?productId=',
      reqList: [axios.get('http://uc.nfapp.southcn.com/amuc/api/mileMoments/productInfos?orderType=hot&page=0&pageRows=1')],
      voteResult: []
    }
  },
  components: {
    // Banner
  },
  beforeCreate () {
    // sdk
  },
  created () {
    // this.getTotalNums()
  },
  mounted () {
    this.showVoteResult()
    this.showRankList()
    this.show = false
    // var a = this.$refs
    // console.log(this)
    // console.log(a.abc)
  },
  methods: {
    // getTotalNums: function () {
    //   var _this = this
    //   axios.get(
    //       'http://uc.nfapp.southcn.com/amuc/api/mileMoments/productInfos', {
    //         params: {
    //           orderType: 'hot',
    //           page: 0,
    //           pageRows: 1
    //         }
    //       }
    //     ).then(function (response) {
    //       console.log('加载成功')
    //       _this.totalVoteNum = response.data.totalDevice
    //       console.log(_this.totalVoteNum)
    //     }, function (error) {
    //       // console.log('加载出错')
    //       console.log(error)
    //     })
    // },
    // 显示投票结果
    showVoteResult: function () {
      var result = this.voteArr
      var _this = this
      // console.log(result.length)
      for (var j = 0; j < result.length; j++) {
        // axios.get(this.url+result[j])
        this.reqList.push(axios.get(this.url + result[j]))
        // this.reqest(result[j])
      }
      axios.all(this.reqList)
      .then(axios.spread(function () {
        _this.loading = false
        // 两个请求现已完成 acct, perms
        for (var i = 0; i < arguments.length; i++) {
          if (i === 0) {
            _this.totalNum.push(arguments[i].data)
          } else {
            _this.voteResult.push(arguments[i].data)
            _this.num++
          }
        }
        _this.totalVoteNum = _this.totalNum[0].totalDevice
        console.log('总票数：' + _this.totalVoteNum)
        // _this.grayWidth = (parseFloat(document.documentElement.style.fontSize) * 12 * 50).toFixed(3)
        // 灰色条的宽度
        console.log(_this.grayWidth)
        var datas = _this.voteResult
        for (var j = 0; j < datas.length; j++) {
          // _this.numList[j] = datas[j].voteNum
          // _this.widthList.push((_this.grayWidth * (Number((datas[j].voteNum / _this.totalVoteNum).toFixed(3)))).toFixed(3))
          _this.widthList.push((Number((datas[j].voteNum / _this.totalVoteNum).toFixed(3))) * 100)
        }
        console.log(_this.widthList)
        // console.log(_this.numList)
        // 操作投票结果的dom元素
        // console.log(_this.$refs)
        // console.log(_this.$refs.yel)
        _this.$nextTick(function () {
          // var datas = _this.voteResult
          // for (var j = 0; j < datas.length; j++) {
          //   // _this.numList[j] = datas[j].voteNum
          //   _this.widthList.push((_this.grayWidth * (Number((datas[j].voteNum / _this.totalVoteNum).toFixed(3)))).toFixed(3))
          // }
          _this.show = true
          // this.getNumList()
        })
      }))
    },
    // 过渡进入
    // 设置过渡进入之前的组件状态
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    // 设置过渡进入完成时的组件状态
    enter: function (el, done) {
      el.style.opacity = 1
       // var vm = this
      // var ix = el.key
      console.log(el)
      // console.log(el.index)
      el.style.width = 100 + 'px'
      console.log(this.widthList)
    },
    // 设置过渡进入完成之后的组件状态
    leave: function (el) {
      // var ix = el.key
      // console.log(ix)
      el.style.width = 100 + 'px'
      // ...
      // console.log(el)
    },
    // 显示前十名信息
    showRankList: function () {
      var _this = this
      axios.get(
        'http://uc.nfapp.southcn.com/amuc/api/mileMoments/topProductInfos', {
          params: {
            orderType: 'hot',
            limitNo: 10
          }
        }
      ).then(function (response) {
        console.log('加载成功')
        // console.log(response.data)
        var datas = response.data
        _this.rankList = datas.list
      }, function (error) {
        // console.log('加载出错')
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
