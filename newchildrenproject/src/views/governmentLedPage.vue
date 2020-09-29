<template>
  <div class="governmentLedPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">政府主导</div>
      </template>
    </van-nav-bar>
    <!-- <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(img,index) in imgList" :key="index">
          <img :src="img" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="gap"></div>-->
    <div class="headBar">
      <img class="headerImg" src="../assets/img_bg_zhengfuzhudao@2x.png" alt />
      <div class="headerText">{{cityName}}民政儿童关爱</div>
      <div class="headBarInteview">
        <div class="warp">
          <div class="titleText">儿童关爱统计数据</div>
          <div class="flex">
            <div class="item">
              <div>
                <span class="guanaiertongColor">{{totalCount.ChildrenCount}}</span>
                <span class="gray">名</span>
              </div>
              <div class="name">关爱儿童</div>
            </div>
            <div class="item">
              <div>
                <span class="guanaihuodongColor">{{totalCount.ActivityCount}}</span>
                <span class="gray">场</span>
              </div>
              <div class="name">关爱活动</div>
            </div>
            <div class="item">
              <div>
                <span class="jiatinngjiaoyuColor">{{totalCount.CourseCount}}</span>
                <span class="gray">小时</span>
              </div>
              <div class="name">家庭教育视频</div>
            </div>
          </div>
          <div class="flex">
            <div class="item">
              <div>
                <span class="ertongzhijiaColor">{{totalCount.ChildrenHomeCount}}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">儿童之家</div>
            </div>
            <div class="item">
              <div>
                <span class="ertongzhurenColor">{{totalCount.UserCount}}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">儿童主任</div>
            </div>
            <div class="item">
              <div>
                <span class="shegongzhanColor">{{totalCount.SocialStationCount}}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">社工站</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jianjieTitle">政务简介</div>
    <div class="tabList">
      <div class="tab" v-for="(tab,index) in tabList" :key="index">
        <div class="tabItem" @click="viewDeatil(tab)">
          <img :src="tab.NewsThumbnail" alt class="tabItemImg" />
          <div>
            <div style="line-height: 40px;font-weight: 600;font-size: 14px;">{{tab.Title}}</div>
            <div
              style="line-height: 5px;font-size: 14px;color: #989898;font-size: 12px;"
            >{{tab.Title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="flex space-between newsTitle">
      <div style="padding: 10px 20px;">新闻资讯</div>
      <!-- <div style="padding: 10px 20px;color: #989898" @click="changeCity" v-if="!isAssistant">切换城市</div> -->
    </div>
    <div class="newsList">
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(news,index) in newsList" :key="index">
          <div class="flex" style="padding:10px;" @click="viewDeatil(news)">
            <img
              :src="news.NewsThumbnail"
              style="width:100px;min-width:100px;max-width:100px;height:60px;"
            />
            <div style="text-align: left;padding: 0 10px;position: relative;">
              <div>{{news.Title}}</div>
              <div
                style="position: absolute;color: #a0a0a0;font-size: 14px;padding: 5px 0;"
              >{{news.CreateTime}}</div>
            </div>
          </div>
        </div>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
    <!-- <bottomNavPage :selectedNav.sync="selectedNav"></bottomNavPage> -->
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  getHomeImgList,
  getMenuList,
  getNewsList,
  getGoveList,
  getTotalCount,
} from '@/api/home';
import bottomNavPage from './bottomNavPage.vue';

export default {
  name: 'governmentLedPage',
  components: {
    bottomNavPage,
  },
  data() {
    return {
      selectedNav: 'governmentLedPage',
      cityName: '邵阳市',
      imgList: [],
      tabList: [],
      newsList: [],
      isAssistant: false,
      showOverlay: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: '',
      // totalCount: '',
      totalCount: {
        ChildrenCount: '',
        ActivityCount: '',
        CourseCount: '',
        ChildrenHomeCount: '',
        UserCount: '',
        SocialStationCount: '',
      },
    };
  },
  watch: {
    selectedNav(val) {
      console.log(val);
      this.$router.push({
        name: val,
      });
    },
  },
  mounted() {
    if (this.$route.query.User && this.$route.query.UserTpye) {
      this.$store.commit('common/getUserTpye', this.$route.query.UserTpye);
      this.$store.commit('common/SET_UserTpye', this.$route.query.UserTpye);
      this.$store.commit('common/getUser', this.$route.query.User);
    }
    if (!this.Token) {
      this.$store.commit(
        'common/getToken',
        window.localStorage.getItem('Token'),
      );
    }
    this.showOverlay = true;
    this.isAssistant = this.$route.query.isAssistant;
    if (!this.cityId) {
      this.$store.commit(
        'common/getCityId',
        window.localStorage.getItem('cityId') - 0,
      );
      // this.cityId = window.localStorage.getItem("cityId")
    }
    console.log('this.cityId', this.cityId);
    getHomeImgList(this.cityId)
      .then((res) => {
        this.imgList = res.data.newsList[0].NewsThumbnail.split(',');
        getMenuList(this.cityId)
          .then((result) => {
            console.log(result);
            this.tabList = result.data.newsList.reverse();
          })
          .catch((err) => {
            console.log('err', err);
            this.showOverlay = false;
          });
        getNewsList(this.cityId, this.pageNumber, this.pageSize)
          .then((news) => {
            console.log(news);
            this.newsList = news.data.newsList;
            this.total = news.data.total;
            // this.showOverlay = false;
            getTotalCount(this.cityId)
              .then((res) => {
                // console.log("getTotalCount", res);
                this.totalCount = res.data.totalCount;
                this.showOverlay = false;
              })
              .catch((err) => {
                console.log('getTotalCount', err);
                this.showOverlay = false;
              });
          })
          .catch((err) => {
            console.log('err', err);
            this.showOverlay = false;
          });
      })
      .catch((err) => {
        console.log('err', err);
        this.showOverlay = false;
      });
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId
        ? this.$store.state.common.cityId
        : window.localStorage.getItem('cityId');
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'homePage',
      });
    },
    viewDeatil(row) {
      this.$router.push({
        name: 'newsDetail',
        query: {
          Id: row.Id,
        },
      });
    },
    changeCity() {
      this.$router.push({
        name: 'changeCityPage',
        query: {
          needComeBack: true,
        },
      });
    },
    getNewsList(param) {
      const { cityId, pageNumber, pageSize } = param;
      this.showOverlay = true;
      getNewsList(cityId, pageNumber, pageSize)
        .then((res) => {
          // console.log(news);
          res.data.newsList.forEach((item) => {
            this.newsList.push(item);
          });
          this.loading = false;
          this.showOverlay = false;
          if (!(this.newsList.length < this.total)) this.finished = true;
        })
        .catch((err) => {
          console.log('err', err);
          this.showOverlay = false;
        });
    },
    onLoad() {
      // console.log('123456')
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
      }
      // console.log('this.newsList.length',this.newsList.length)
      if (this.newsList.length < this.total) {
        this.getNewsList({
          cityId: this.cityId,
          pageNumber: this.pageNumber++ + 1,
          pageSize: this.pageSize,
        });
      } else {
        // this.finished = true;
      }
      this.loading = false;
    },
    onRefresh() {
      // console.log('123')
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="less">
.governmentLedPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .swipe {
    width: 100%;
    height: 150px;
  }
  .swipeImg {
    width: 100%;
    height: 150px;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .headBar {
    height: 250px;
    position: relative;
    background: rgba(232, 232, 232, 0.5);
    .headerImg {
      width: 100%;
      height: 193px;
    }
    .headerText {
      position: absolute;
      font-size: 24px;
      font-weight: 500;
      color: #feffff;
      top: 20px;
      width: 100%;
    }
    .headBarInteview {
      width: 93vw;
      background: #fff;
      border-radius: 14px;
      top: 50px;
      position: absolute;
      margin: 15px;
      box-shadow: 0 10px 15px 0 rgba(216, 216, 216, 0.5);
      .warp {
        margin: 15px;
        .titleText {
          font-weight: 600;
          font-size: 16px;
          text-align: left;
        }
      }
    }
  }
  .guanaiertongColor {
    color: rgba(20, 148, 255, 1);
    font-size: 16px;
  }
  .guanaihuodongColor {
    color: rgba(255, 165, 50, 1);
    font-size: 16px;
  }
  .jiatinngjiaoyuColor {
    color: rgba(211, 39, 34, 1);
    font-size: 16px;
  }
  .ertongzhijiaColor {
    color: rgba(32, 209, 121, 1);
    font-size: 16px;
  }
  .ertongzhurenColor {
    color: rgba(255, 129, 64, 1);
    font-size: 16px;
  }
  .shegongzhanColor {
    color: rgba(156, 19, 14, 1);
    font-size: 16px;
  }
  .item {
    padding: 10px 0 0;
    flex: 3;
  }
  .newsList {
    margin-bottom: 60px;
  }
  .jianjieTitle {
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: #171114;
    padding: 10px 20px;
  }
  .tabList {
    display: flex;
    flex-wrap: wrap;
  }
  .tabItem {
    // display: flex;
    padding: 10px 20px;
    /* border-bottom: 1px solid #e6e6e6; */
  }
  // .right {
  //   border-right: 1px solid #e6e6e6;
  // }
  .tabItemImg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .tab {
    // width: 50%;
    flex: 3;
    // min-width: 50%;
    // max-width: 50%;
    border-bottom: 1px solid #e6e6e6;
  }
  .newsTitle {
    border-bottom: 1px solid #e6e6e6;
    font-size: 16px;
    font-weight: 600;
    color: #171114;
  }
}
</style>
