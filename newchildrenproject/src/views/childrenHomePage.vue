<template>
  <div class="childrenHomePage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">儿童之家</div>
      </template>
    </van-nav-bar>
    <div class="headBar">
      <img class="headerImg" src="../assets/img_bg_ertongzhijia@2x.png" alt />
      <div class="headBarInteview">
        <div class="flex tipsTiitle">
          <img src="../assets/icon_ertongzhijia.png" class="img" alt />
          <div class="name">金桥村儿童之家</div>
        </div>
        <div
          class="position"
        >位置：{{childrenHome.ProvinceName.Name}} >{{childrenHome.CityeName.Name}} >{{childrenHome.AreaName.Name}} >{{childrenHome.TownName.Name}} >{{childrenHome.VillageName.Name}}</div>
        <div class="flex space-between tableHeader">
          <div class="item">人数</div>
          <div class="item">活动次数</div>
          <div class="item" style="margin-right: 15px;">评分</div>
        </div>
        <van-cell class="childrenInfo">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="flex space-between tableContent">
              <div class="custom-title">{{childrenHome.ChildrenCount}}人</div>
              <div>{{childrenHome.ActivityCount}}次</div>
              <div>
                <ul class="cleanfloat flex">
                  <li
                    v-for="(n,index) in 5"
                    :key="index"
                    :class="[index+1>starNum?'grayStar':'star']"
                  >★</li>
                </ul>
              </div>
            </div>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="myChildrenHome">
      <div>儿童之家成员</div>
      <div class="flex space-between tableHeader">
        <div class="item" style="text-align: left;">儿童姓名</div>
        <div class="item">监护人</div>
        <div class="item" style="text-align: right;">编辑</div>
      </div>
      <van-cell class="childrenInfo">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="flex space-between tableContent">
            <div class="flex item" style="flex:3;">
              <img :src="childrenHome.childrenImg" style="width: 24px; height: 24px;margin-right: 10px;" alt />
              <div>{{childrenHome.childrenName}}</div>
            </div>
            <div class="item"  style="flex:3;text-align: center;">{{childrenHome.parents}}</div>
            <div class="item"  style="flex:3;text-align: right;">
              <van-icon name="ellipsis" />
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="gap gapfive"></div>
    <div class="myChildrenHome">
      <div>儿童之家活动</div>
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
// import { getChildrenHomeList } from '@/api/home';
// import bottomNavPage from './bottomNavPage.vue';

export default {
  name: "childrenHomePage",
  components: {
    // bottomNavPage,
  },
  data() {
    return {
      // token:
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTYxMDYzNjMsImlhdCI6MTU5MzUxNDM2MywiaWQiOjI0NjMwLCJuYW1lIjoi5LiA5biGIiwicGhvbmUiOiIxMzQzMDIwMjYyMSIsInByb2ZpbGVfcGhvdG8iOiIifQ.CcCcf1s0cQ09esbvV-IsLdu_rh0BI2yNQ0muwsqQt7U",

      // User: "",
      childrenHomeList: [],
      selectedNav: "childrenHomePage",
      showOverlay: false,
      childrenHome: {
        ProvinceName: {
          Name: "湖南省"
        },
        CityeName: {
          Name: "邵阳市"
        },
        AreaName: {
          Name: "大祥区"
        },
        TownName: {
          Name: "板桥乡"
        },
        VillageName: {
          Name: "金桥村"
        },
        ChildrenCount: 11,
        ActivityCount: 11,
        childrenName: "李潇潇",
        parents: "小姐姐",
        childrenImg: require("../assets/img_ertong01@2x.png")
      }
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    User() {
      return this.$store.state.common.User;
    }
  },
  mounted() {
    if (this.$route.query.User && this.$route.query.UserTpye) {
      this.$store.commit("common/getUserTpye", this.$route.query.UserTpye);
      this.$store.commit("common/SET_UserTpye", this.$route.query.UserTpye);
      this.$store.commit("common/getUser", this.$route.query.User);
    }
    // if (!this.Token) {
    //   this.$store.commit(
    //     'common/getToken',
    //     window.localStorage.getItem('Token'),
    //   );
    // }
    // this.User = this.$store.state.common.User
    // this.token = this.$store.state.common.token
    // this.showOverlay = true;
    // getChildrenHomeList(this.Token)
    //   .then((result) => {
    //     console.log('getChildrenHomeList', result);
    //     this.childrenHomeList = result.data.childrenHomeList;
    //     this.$refs.assistantBottomNav.init();
    //     if (this.childrenHomeList.length > 0) {
    //       this.$store.commit(
    //         'common/getCityId',
    //         this.childrenHomeList[0].CityId,
    //       );
    //       this.$store.commit(
    //         'common/SET_cityId',
    //         this.childrenHomeList[0].CityId,
    //       );
    //       // this.$store.commit("common/getTownId", this.childrenHomeList[0].TownId);
    //       // this.$store.commit("common/getVillageId", this.childrenHomeList[0].VillageId);
    //     } else {
    //       this.$store.commit('common/getCityId', 2018);
    //       this.$store.commit('common/getCityId', 2018);
    //       this.$store.commit('common/SET_cityId', 2018);
    //     }
    //     this.showOverlay = false;
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //     this.showOverlay = false;
    //   });
  },
  methods: {
    onClickLeft() {},
    goChildrenHomeDetail(childrenHome) {
      this.$store.commit("common/getVillageId", childrenHome.VillageId);
      this.$router.push({
        name: "assistantChildrenHomeDetail",
        query: {
          currentPath: "childrenHomePage"
        }
      });
    },
    goSetting() {
      this.$router.push({
        name: "accountSetting",
        query: {
          currentPath: "childrenHomePage"
        }
      });
    }
  }
};
</script>

<style lang="less">
.childrenHomePage {
  margin-bottom: 60px;
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .headBar {
    height: 310px;
    position: relative;
    background: rgba(232, 232, 232, 0.5);
    .headerImg {
      width: 100%;
    }
    .headBarInteview {
      width: 93vw;
      background: #fff;
      border-radius: 6px;
      top: 80px;
      position: absolute;
      margin: 15px;
      box-shadow: 0 10px 15px 0 rgba(216, 216, 216, 0.5);
      .tipsTiitle {
        padding: 20px;
        .img {
          width: 24px;
          height: 24px;
          padding-right: 20px;
        }
        .name {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .tableHeader {
        padding: 20px 20px 10px;
        .item {
          // flex: 3;
          text-align: center;
        }
      }
      .childrenInfo {
        padding: 20px 20px 10px;
        .tableContent {
          .item{
            flex: 3;
          }
        }
      }
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
  .childrenHomePageHead {
    padding: 20px;
    .head {
      img {
        width: 50px;
      }
      .name {
        text-align: left;
        padding: 0 20px 10px;
      }
    }
  }
  .myChildrenHome {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    .tableHeader {
      padding: 20px 15px 10px;
      color: #9b9b9b;
      font-size: 14px;
      .item {
        flex: 3;
        text-align: center;
      }
    }
  }
  .childrenHomeList {
    .childrenHomeItem {
      .childrenHomeItemName {
        padding: 20px;
        line-height: 30px;
        img {
          width: 30px;
          height: 30px;
          margin-top: -2px;
        }
        .name {
          padding-left: 10px;
        }
      }
      .childrenMaster {
        .van-cell__title {
          padding: 0 5px;
        }
      }
    }
  }

  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .star {
    color: rgba(255, 60, 53, 1);
  }
  .grayStar {
    color: #e0e0e0;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .gaptwo {
    height: 3px;
  }
  .gapfive {
    height: 15px;
  }
  .status {
    margin: 0 15px;
    border-radius: 14px;
    font-size: 12px;
    padding: 2px 0;
    line-height: 20px;
  }
  .will {
    background: #ffac0ed6;
    color: #6f6f6f;
  }
  .childrenUserHead {
    width: 30px;
    text-align: center;
    font-size: 12px;
    padding: 8px;
    background: #3b4c5a;
    border-radius: 50%;
  }
}
</style>
