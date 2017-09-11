<template>
  <!--全部内容  -->
    <div id="main">
        <!--头部：包括banner和搜索  -->
        <div id="header">
            <Banner></Banner>
             <!--搜索框  -->
            <!-- <InputGroup></InputGroup> -->
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
        </div>

        <!-- 相片展示区域 -->
        <!-- <AllImg></AllImg> -->
        <!--相片展示区域  -->
          <div id="all_pic" class="w100 bs_bb">
            <!-- <div> -->
              <!--搜索结果为空时显示  -->
              <div v-if="hideNull" :class="{hide:isNull}" class="search_msg_box ab ab_50">
                  <div class="search_null">
                      <p>找不到诶，检查一下输入的内容，</p>
                      <p>记得是作者或者是学校名称哦~</p>
                  </div>
              </div>

              <!-- <div v-else></div> -->
              <!--搜索结果为空时显示  -->

              <!--第一名相片展示区域100%  -->
              <!-- <HotImg></HotImg> -->

              <div v-if='item.isFirst' :data-index="index"  id="first_one" class="rel w100" v-for="(item,index) in list">
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
              <!-- <div id="other_pics">
              </div> -->                  
              <!--下面为单独的相片  -->
              <!-- <div class="pic_box w100"> -->
                <div v-else :data-index="index" class="pic_wrap bs_bb fl">
                  <div :title='item.rownum+ "."+item.productName' class="pic_wrap_inner rel" :class="{bd: item.isTick}">
                   <div :data-school="item.productName">
                      <div @click="tickPic(index)" :class="{ yel_tick: item.isTick }" class="tick_pic ab bs100" :data-id="item.productId"></div>
                      <div class="pic" @click="showVotePage(index)">
                        <img class="bor_tb w100 bs_bb" :src="isPC ? item.productUrl : item.thumbnailUrl">
                      </div>
                      <div class="pic_msg ab w100 bs_bb">
                        <div class="msg_other">
                          <div class="author fl elp">
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
              <!-- </div>    -->                 
              <!--其他图片展示结束  -->                  
          </div>
        <!-- </div> -->

          <!--全部相片展示结束  -->

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

        <!--活动介绍图片  -->
        <div v-show="introPic" class="intro_pic fixed ab_0">
            <div class="info_ensure ab">
                <img class="w100" src="../assets/info-content.png" alt="活动详情">
                <img @click="hideIntro()" class="ensure-btn w100" src="../assets/ensure-btn.png" alt="确定按钮">
            </div>
        </div>
      
        <!--投票按钮  -->
        <div v-show="voteBtn" class="vote_btn w100 bs100" @click="vote()">
        </div>

        <!--已经达到投票数之后显示的弹窗  -->
        <div v-show="mask" class="mask fixed ab_0">
            <div class="mask_box ab t25 ab_50">
                <div class="mask_title"></div>
                <div class="mask_con w100 bs100">
                    <p>{{maskText}}</p>
                </div>
                <div @click="hideMask()" class="mask_btn w100"></div>
            </div>
        </div>

        <!--投票页面  -->
        <div v-show="votePage" class="vote_page fixed ab_0 w100">
            <div class="vote_title rel">
                <div>
                    <span @click="hideVotePage()" class="back">返回</span>
                    <span @click="choseVote()" :class="{chosed: isChose}" class="chose bs_bb ab">选择</span>
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
                      <span>作者: </span>
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
    <!--全部内容结束  -->
</template>

<script>
import {mapState} from 'vuex'
import Banner from './banner'
// import InputGroup from './inputGroup'
// import HotImg from './hotImg'
// import AllImg from './allImg'
import Result from './result'
import objLength from '../js/common'
// import LoadMore from '../js/loadMore'
import storage from '../js/localstorage'
import system from '../js/system'
import axios from 'axios'
import FastClick from 'fastclick'
// console.log(FastClick)
export default {
  name: 'index',
  data () {
    return {
      isForm: 2,            // 表单的获取数据
      isInit: 1,            // 普通的获取数据
      loading: true,        // 数据加载完成前的动画
      searchText: '',       // 搜索框的内容
      voteProductIds: {},   // 用户选中的对象
      page: 0,              // 初始化加载的页数
      isNull: true,         // 搜索结果是否为空
      hideNull: true,       // 是否去掉搜索结果是否为空的div
      isChose: false,       // 判断是否选择
      maskText: '',        // 点击投票后的弹窗内容
      choseIndex: 1,       // 存储用户点击图片的index
      voteImg: '',         // vote_page中的图片地址
      voteList: '',        // vote_page中的排名
      voteSchool: '',      // vote_page中的学校
      voteAuthor: '',      // vote_page中的作者
      voteLikeNum: '',     // vote_page中的票数
      isPC: system,        // 判断设备是否为电脑
      totalNum: 0,        // 总参与人数
      isEnd: false,       // 是否达到数据最大数的标志
      isSearch: false,    // 判断是否属于搜索内容为空时触发的事件
      idBox: [],          // 用来存放getData取到数据的productId
      indexBox: [],       // 用来存放选择过的对象在idBox中的索引
      list: []            // 从后台获取的数据
    }
  },
  components: {
    Banner,
    // InputGroup,
    // HotImg,
    // AllImg,
    Result
  },
  computed: {
    ...mapState([
      'searchNull',
      'introPic',
      'voteBtn',
      'mask',
      'votePage',
      'tick'
    ])
  },
  mounted () {
    this.getData(this.page, this.isInit)
    this.$nextTick(function () {
      if ('addEventListener' in document) {
        // console.log(FastClick)
        document.addEventListener('DOMContentLoaded', function () {
          FastClick.attach(document.body)
        }, false)
      }
      window.addEventListener('scroll', this.throttle(this.scrollHandler, 500, 1000))
    })
    // 获取及设置投票id等
    if (storage.fetch('voteId')) {
      storage.save('voteId', storage.fetch('voteId'))
      storage.save('voteArr', storage.fetch('voteArr'))
    } else {
      storage.save('voteId', '')
      storage.save('voteArr', '')
    }
  },
  methods: {
    // 简单的节流函数
    throttle (func, wait, mustRun) {
      var timeout
      var startTime = new Date()

      return function () {
        var context = this
        var args = arguments
        var curTime = new Date()
        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
          func.apply(context, args)
          startTime = curTime
          // 没达到触发间隔，重新设定定时器
        } else {
          timeout = setTimeout(func, wait)
        }
      }
    },
    // 实际想绑定在 scroll 事件上的 scrollHandler
    scrollHandler () {
      // 滚动条到顶部的垂直高度
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      // 浏览器可视化窗口的大小
      var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 当滚动到最底部以上500像素时，加载新内容
      if ((document.body.scrollHeight - scrollTop) < (clientHeight + 500)) {
        if (this.isSearch === true || this.isEnd === true) {
          return
        } else {
          this.page++
          this.getData(this.page)
        }
      }
    },
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
    // 表单的搜索
    search: function () {
      var _this = this
      if (_this.searchText === '') {
        // _this.$store.dispatch('getVoteBtn', false)
        _this.list = []
        _this.isSearch = false
        _this.hideNull = true
        _this.page = 0
        _this.getData(_this.page, _this.isForm)
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
          // console.log('加载成功')
          // console.log(response.data)
          _this.idBox = []
          _this.indexBox = []
          // 拿到搜索结果之后需要先清空list
          // _this.list = []
          _this.isSearch = true
          var datalist = response.data.list
          if (datalist.length === 0) {
            _this.list = []
            _this.hideNull = true
            _this.isNull = false
          } else {
            _this.hideNull = false
            _this.isNull = true
            for (var i = 0; i < datalist.length; i++) {
              datalist[i].isTick = false
              // 制造idBox
              _this.idBox.push(datalist[i].productId)
              // 对rownum进行调整
              if (parseInt(datalist[i].rownum) < 10) {
                datalist[i].rownum = '00' + datalist[i].rownum
              } else if (parseInt(datalist[i].rownum) < 100) {
                datalist[i].rownum = '0' + datalist[i].rownum
              } else {
                datalist[i].rownum = datalist[i].rownum
              }
            }
            _this.list = datalist
            // console.log(_this.list)
            // 当voteProductIds不为空时执行此函数，保存用户之前的点击操作
            if (JSON.stringify(_this.voteProductIds) !== '{}') {
              for (var key in _this.voteProductIds) {
                if (_this.voteProductIds[key] === true) {
                  _this.indexBox.push(_this.idBox.indexOf(key))
                }
              }
              for (var k = 0; k < _this.indexBox.length; k++) {
                // console.log(_this.list)
                // console.log(_this.indexBox[k])
                // console.log(_this.list[_this.indexBox[k]])
                if (_this.indexBox[k] >= 0) {
                  if (_this.list[_this.indexBox[k]].isTick === false) {
                    _this.tickPic(_this.indexBox[k])
                    // _this.list[_this.indexBox[k]].isTick === true
                  }
                }
              }
            }
            // console.log(_this.idBox)
            // console.log(_this.indexBox)
          }
          // console.log(_this.list.length)
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
      // voteProductIds是一个对象，用于存放当前点击的对象是否被勾选
      this.voteProductIds[item.productId] = item.isTick
      // console.log(this.voteProductIds)
      // 当用户点击的对象超过3个时，需要将里面isTick为false的值给去掉
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
      // 当lenInTickObj达到4张时，限制用户最多选中3张图片，并触发当前图片的勾选
      if (lenInTickObj >= 4) {
        this.maskText = '最多只能选择3张照片'
        this.$store.dispatch('getMask', true)
        // $(this).click()
        this.tickPic(index)
      }
      // 当页面中存在勾选对象时，投票按钮不消失
      if (this.voteBtnShow(this.voteProductIds)) {
        this.$store.dispatch('getVoteBtn', true)
      } else {
        this.$store.dispatch('getVoteBtn', false)
      }
      // 点击勾选时需要对当前对象的票数进行改变
      var originValue = parseInt(item.voteNum)
      if (item.isTick) {
        item.voteNum = parseInt(item.voteNum) + 1
        originValue = item.voteNum
      } else {
        item.voteNum = originValue - 1
      }
      // 最终把更改之后的数据传回给list
      arr[index] = item
    },
    // voteBtnShow用来判断页面中是否有元素被选中，有则继续显示投票按钮
    voteBtnShow: function (obj) {
      var counter = 0
      for (var key in obj) {
        if (obj[key] === true) {
          counter++
        }
      }
      if (counter > 0) {
        return true
      } else {
        return false
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
      console.log(1)
      var index = this.choseIndex
      console.log(2)
      this.tickPic(index)
      console.log(3)
      var arr = this.list
      var item = arr[index]
      console.log(index)
      this.isChose = item.isTick
      this.voteLikeNum = item.voteNum
      arr[index] = item
    },
    // 加载数据到页面
    getData: function (page, check) {
      var _this = this
      if (check === 2) {
        _this.list = []
      }
      axios.get(
          'http://uc.nfapp.southcn.com/amuc/api/mileMoments/productInfos', {
            params: {
              page: page,
              orderType: 'hot',
              pageRows: 10
            }
          }
        ).then(function (response) {
          _this.idBox = []
          _this.indexBox = []
          // console.log('加载成功')
         // 为每个数据添加isTick属性
          var datas = response.data
          var datalist = datas.list
          // totalNum为总的参与人数
          _this.totalNum = parseInt(datas.totalProductsNum)
          // 给每个数据添加isTick:false，并将选手的id存放在idBox里面
          for (var i = 0; i < datalist.length; i++) {
            datalist[i].isTick = false
            // 制造idBox
            _this.idBox.push(datalist[i].productId)
            // 判断是否为第一张大图
            if (datalist[i].rownum === '1') {
              datalist[i].isFirst = true
            }
            // 对rownum进行调整
            if (parseInt(datalist[i].rownum) < 10) {
              datalist[i].rownum = '00' + datalist[i].rownum
            } else if (parseInt(datalist[i].rownum) < 100) {
              datalist[i].rownum = '0' + datalist[i].rownum
            } else {
              datalist[i].rownum = datalist[i].rownum
            }
          }
          // 当加载到的数据大于等于总人数时，禁止上拉加载事件
          if (datalist.length >= _this.totalNum) {
            _this.isEnd = true
          }
          // 将加载到的数据连接起来放到list中
          _this.list = _this.list.concat(datalist)
          // 数据加载完毕后取消loading动画
          _this.loading = false
          // console.log(_this.list)
          // 当voteProductIds不为空时执行此函数，保存用户之前的点击操作
          if (JSON.stringify(_this.voteProductIds) !== '{}') {
            for (var key in _this.voteProductIds) {
              if (_this.voteProductIds[key] === true) {
                _this.indexBox.push(_this.idBox.indexOf(key))
              }
            }
            for (var k = 0; k < _this.indexBox.length; k++) {
              if (_this.indexBox[k] >= 0) {
                if (_this.list[_this.indexBox[k]].isTick === false) {
                  _this.tickPic(_this.indexBox[k])
                }
              }
            }
          }
          // console.log(_this.idBox)
          // console.log(_this.indexBox)
        }, function (error) {
          // console.log('加载出错')
          console.log(error)
        })
    },
    // 点击投票按钮进行投票
    vote: function () {
      var voteArrs = []
      var t = new Date()
      var time = t.getFullYear() + '' + (t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + parseInt(1e5 * Math.random())
      // voteArr数组用来存放用户选取的投票对象的id
      for (var key in this.voteProductIds) {
        if (this.voteProductIds[key] === true) {
          voteArrs.push(parseInt(key))
        }
      }
      //  判断本地是否存在投票id等信息
      if (window.localStorage) {
        storage.save('voteArr', voteArrs.join(','))
        var arr = storage.fetch('voteId')
        if (arr.length === 0) {
          console.log('执行了')
          storage.save('voteId', time)
        }
        console.log(storage.fetch('voteArr'))
        console.log(storage.fetch('voteId'))
      }
      var deviceId = storage.fetch('voteId')
      // 将用户选中的对象及deviceId传给服务器
      var _this = this
      var voteString = voteArrs.join(',') + '&deviceId=' + deviceId + '&userId='
      axios.get('http://uc.nfapp.southcn.com/amuc/api/mileMoments/vote?productIds=' + voteString)
      .then(function (response) {
        var res = response.data
        console.log(res)
        if (res.code === '1000') {
          _this.$router.push('result')
        } else {
          _this.maskText = res.result
          _this.$store.dispatch('getMask', true)
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
