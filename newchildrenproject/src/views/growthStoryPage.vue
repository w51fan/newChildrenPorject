<template>
  <div class="growthStoryPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">成长故事</div>
      </template>
    </van-nav-bar>
    <div class="pageText">优秀楷模</div>
    <div class="navImgList flex wrap">
      <div class="item flex space-between fudaoyuanBgColor" @click="go(1)">
        <div class="warp">
          <div class="text fudaoyuanColor">优秀儿童督导员</div>
          <div class="quchakan fudaoyuanColorchakan">去查看></div>
        </div>
        <div class="flex">
          <img
            src="../assets/icon_rongyubiaobin01@2x.png"
            alt
            style="max-width: 46px; height: 40px; padding: 10px 0"
          />
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
      <div class="item flex space-between ertongzhurenBgColor" @click="go(2)">
        <div class="warp">
          <div class="text ertongzhurenColor" style="color: rgba(0, 122, 255, 1)">优秀儿童主任</div>
          <div class="quchakan ertongzhurenColorchakan">去查看></div>
        </div>
        <img
          src="../assets/icon_rongyubiaobin02@2x.png"
          alt
          style="max-width: 46px; padding: 10px 0"
        />
      </div>
      <div class="item flex space-between shaonianBgColor" @click="go(3)">
        <div class="warp">
          <div class="text shaonianColor" style="color: rgba(20, 18, 100, 1)">阳光家庭</div>
          <div class="quchakan shaonianColorchakan">去查看></div>
        </div>
        <div class="flex">
          <img
            src="../assets/icon_rongyubiaobin03@2x.png"
            alt
            style="max-width: 46px; padding: 10px 0"
          />
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
      <div class="item flex space-between xuexileyuanBgColor" @click="go(4)">
        <div class="warp">
          <div class="text xuexileyuanColor" style="color: rgba(237, 1, 1, 1)">优秀志愿者</div>
          <div class="quchakan xuexileyuanColorchakan">去查看></div>
        </div>
        <img
          src="../assets/icon_rongyubiaobin04@2x.png"
          alt
          style="max-width: 69px; padding: 10px 0"
        />
      </div>
    </div>
    <!-- <div class="zhiyuanzheText">美丽心灵</div> -->
    <div class="pageText">美丽心灵</div>
    <!-- <div class="zhiyuanzherenshuText">志愿者人数统计</div> -->
    <!-- <div class="gap gapone"></div> -->
    <div class="navImgList flex wrap">
      <div class="item flex space-between fudaoyuanBgColor" @click="goFun(1)">
        <div class="warp">
          <div class="text fudaoyuanColor">家长说</div>
          <div class="quchakan fudaoyuanColorchakan">去查看></div>
        </div>
        <div class="flex">
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
      <div class="item flex space-between ertongzhurenBgColor" @click="goFun(2)">
        <div class="warp">
          <div class="text ertongzhurenColor" style="color: rgba(0, 122, 255, 1)">志愿者说</div>
          <div class="quchakan ertongzhurenColorchakan">去查看></div>
        </div>
        <div class="flex">
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
      <div class="item flex space-between shaonianBgColor" @click="goFun(3)">
        <div class="warp">
          <div class="text shaonianColor" style="color: rgba(20, 18, 100, 1)">儿童主任说</div>
          <div class="quchakan shaonianColorchakan">去查看></div>
        </div>
        <div class="flex">
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
      <div class="item flex space-between xuexileyuanBgColor" @click="goFun(4)">
        <div class="warp">
          <div class="text xuexileyuanColor" style="color: rgba(237, 1, 1, 1)">阳光孩子</div>
          <div class="quchakan xuexileyuanColorchakan">去查看></div>
        </div>
        <div class="flex">
          <div style="width: 8px; height: 100%; background: #fff"></div>
        </div>
      </div>
    </div>

    <!-- <div class="jiazhangshuoTitle" @click="goFun(1)">
      <div class="title">家长说</div>
      <div class="logo">></div>
    </div>
    <div class="jiazhangshuoTitle" @click="goFun(2)">
      <div class="title">志愿者说</div>
      <div class="logo">></div>
    </div>
    <div class="jiazhangshuoTitle" @click="goFun(3)">
      <div class="title">儿童主任说</div>
      <div class="logo">></div>
    </div>
    <div class="jiazhangshuoTitle" @click="goFun(4)">
      <div class="title">阳光孩子</div>
      <div class="logo">></div>
    </div>-->
    <!-- <div>
      <div v-for="(area, index) in areaItems" :key="index">
        <div class="flex space-between" style="padding: 20px">
          <div>{{ area.text }}</div>
          <div v-if="area.VolunteerCount > 0" @click="collapseDown(area, index)">
            ({{ area.VolunteerCount }}人)
            <van-icon name="arrow-down" v-if="showCurrentDown === index" />
            <van-icon name="arrow" v-else />
          </div>
          <div v-else>
            (0人)
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="gap gapone"></div>
        <div v-if="showChild === index">
          <div v-for="(child, turn) in area.children" :key="turn">
            <div class="flex space-between" style="padding: 5px 25px">
              <div style="border-left: 1px solid #676767; padding-left: 5px">
                --{{ child.text }}
              </div>
              <div
                v-if="child.VolunteerCount > 0"
                @click="collapseSecondDown(child, turn)"
              >
                ({{ child.VolunteerCount }}人)
                <van-icon
                  name="arrow-down"
                  v-if="showSecondCurrentDown === turn"
                />
                <van-icon name="arrow" v-else />
              </div>
              <div v-else>
                (0人)
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="gap gapone"></div>
            <div v-if="showSecondChild === turn">
              <div v-for="(tree, temp) in child.children" :key="temp">
                <div class="flex space-between" style="padding: 5px 45px">
                  <div
                    style="border-left: 1px solid #676767; padding-left: 5px"
                  >
                    --{{ tree.text }}
                  </div>
                  <div v-if="tree.VolunteerCount > 0">
                    ({{ tree.VolunteerCount }}人)
                  </div>
                  <div v-else>(0人)</div>
                </div>
              </div>
              <div class="gap gapone"></div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <bottomNavPage :selectedNav.sync="selectedNav"></bottomNavPage>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getTreeCount, getArticleList } from "@/api/home";
// import bottomNav from './bottomNav';
import bottomNavPage from "./bottomNavPage.vue";

export default {
  name: "growthStoryPage",
  components: {
    bottomNavPage
  },
  data() {
    return {
      selectedNav: "growthStoryPage",
      articlelist: [],
      showOverlay: false,
      showList: true,
      articleContent: "",
      articleTitle: "",
      loading: false,
      finished: false,
      refreshing: false,
      pageNumber: 1,
      pageSize: 10,
      total: "",
      areaList: [],
      areaItems: [],
      childrenItems: [],
      showCurrentDown: "",
      showSecondCurrentDown: "",
      showChild: "",
      showSecondChild: ""
    };
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId
        ? this.$store.state.common.cityId
        : window.localStorage.getItem("cityId");
    }
  },
  mounted() {
    this.showOverlay = true;
    if (!this.cityId) {
      this.$store.commit(
        "common/getCityId",
        window.localStorage.getItem("cityId") - 0
      );
      // this.cityId = window.localStorage.getItem("cityId");
    }
    console.log("this.cityId", this.cityId);
    getTreeCount(this.cityId)
      .then(res => {
        // console.log('getTreeCount', res);
        this.areaList = res.data.areaList;
        this.areaList.forEach(item => {
          const areaTemp = {
            text: item.VolunteerCount > 0 ? `${item.Name}` : item.Name,
            children: [],
            VolunteerCount: item.VolunteerCount
          };
          const childrenTemp = {
            text: item.ChildrenCount > 0 ? `${item.Name}   ` : item.Name,
            children: [],
            ChildrenCount: item.ChildrenCount
          };
          if (item.Area.length > 0) {
            item.Area.forEach(areaItem => {
              const activityChildren = [];
              const childrenChildren = [];
              if (areaItem.Area.length > 0) {
                areaItem.Area.forEach(threeItem => {
                  activityChildren.push({
                    text:
                      threeItem.VolunteerCount > 0
                        ? `${threeItem.Name}   `
                        : threeItem.Name,
                    VolunteerCount: threeItem.VolunteerCount
                  });
                  childrenChildren.push({
                    text:
                      threeItem.ChildrenCount > 0
                        ? `${threeItem.Name}   `
                        : threeItem.Name,
                    ChildrenCount: threeItem.ChildrenCount
                  });
                });
              }
              areaTemp.children.push({
                text:
                  areaItem.VolunteerCount > 0
                    ? `${areaItem.Name}  `
                    : areaItem.Name,
                children: activityChildren,
                VolunteerCount: areaItem.VolunteerCount
              });
              childrenTemp.children.push({
                text:
                  areaItem.ChildrenCount > 0
                    ? `${areaItem.Name}  `
                    : areaItem.Name,
                children: childrenChildren,
                ChildrenCount: areaItem.ChildrenCount
              });
            });
          }
          this.areaItems.push(areaTemp);
          this.childrenItems.push(childrenTemp);
          // console.log('this.areaItems', this.areaItems);
          // console.log('this.childrenItems', this.childrenItems);
        });
        this.showOverlay = false;
      })
      .catch(err => {
        console.log("getTotalCount", err);
        this.showOverlay = false;
      });
    this.showOverlay = false;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "homePage"
      });
    },
    getDate(date) {
      const activityDate = new Date(date);
      const year = activityDate.getFullYear();
      const month = activityDate.getMonth() + 1;
      const day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    collapseDown(data, index) {
      if (this.showCurrentDown === index) {
        this.showCurrentDown = "";
        this.showChild = "";
      } else {
        this.showCurrentDown = index;
        this.showChild = index;
      }

      console.log(data);
    },
    collapseSecondDown(data, index) {
      if (this.showSecondCurrentDown === index) {
        this.showSecondCurrentDown = "";
        this.showSecondChild = "";
      } else {
        this.showSecondCurrentDown = index;
        this.showSecondChild = index;
      }

      console.log(data);
    },
    go(index) {
      // 1：优秀儿童督导员 2：优秀儿童主任 3：最美少年 4：优秀志愿者
      switch (index) {
        case 1:
          this.$router.push({
            name: "volunteersListPage",
            query: {
              type: index,
              titleName: "优秀儿童督导员"
            }
          });
          break;
        case 2:
          this.$router.push({
            name: "volunteersListPage",
            query: {
              type: index,
              titleName: "优秀儿童主任"
            }
          });
          break;
        case 3:
          this.$router.push({
            name: "volunteersListPage",
            query: {
              type: index,
              titleName: "阳光家庭"
            }
          });
          break;
        case 4:
          this.$router.push({
            name: "volunteersListPage",
            query: {
              type: index,
              titleName: "优秀志愿者"
            }
          });
          break;
        default:
          break;
      }
    },
    goFun(index) {
      this.$router.push({
        name: "articleListPage",
        query: {
          type: index,
          // eslint-disable-next-line no-nested-ternary
          titleName:
            index === 1
              ? "家长说"
              : index === 2
              ? "志愿者说"
              : index === 3
              ? "儿童主任说"
              : "阳光孩子"
        }
      });
    }
  }
};
</script>

<style lang="less" >
.growthStoryPage {
  margin-bottom: 50px;
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .wrap {
    flex-wrap: wrap;
  }
  .space-around {
    justify-content: space-around;
  }
  .space-between {
    justify-content: space-between;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .pageText {
    text-align: left;
    padding: 10px 20px;
    color: rgba(23, 17, 20, 1);
    font-size: 16px;
    font-weight: 600;
    background: rgba(249, 249, 249, 1);
  }
  .navImgList {
    padding: 10px 20px;
    .item {
      flex: 1;
      width: 50%;
      height: 70px;
      min-width: 50%;
      max-width: 50%;
      margin: 5px 0;
      .warp {
        text-align: left;
        padding: 10px;
        .fudaoyuanColor {
          color: rgba(255, 76, 45, 1);
        }
        .ertongzhurenColor {
          color: rgba(0, 122, 255, 1);
        }
        .shaonianColor {
          color: rgba(20, 18, 100, 1);
        }
        .xuexileyuanColor {
          color: rgba(237, 1, 1, 1);
        }
        .fudaoyuanColorchakan {
          color: rgba(255, 76, 45, 0.5);
        }
        .ertongzhurenColorchakan {
          color: rgba(0, 122, 255, 0.5);
        }
        .shaonianColorchakan {
          color: rgba(20, 18, 100, 0.5);
        }
        .xuexileyuanColorchakan {
          color: rgba(237, 1, 1, 0.5);
        }
        .text {
          font-size: 14px;
          font-weight: 600;
        }
        .quchakan {
          font-size: 12px;
        }
      }
    }
    .fudaoyuanBgColor {
      background: rgba(255, 247, 237, 1);
    }
    .ertongzhurenBgColor {
      background: rgba(227, 238, 255, 1);
    }
    .shaonianBgColor {
      background: rgba(241, 245, 253, 1);
    }
    .xuexileyuanBgColor {
      background: rgba(255, 242, 241, 1);
    }
  }
  .zhiyuanzheText {
    text-align: left;
    padding: 0 20px;
    color: rgba(23, 17, 20, 1);
    font-weight: 600;
    font-size: 16px;
    padding-bottom: 5px;
  }
  .zhiyuanzherenshuText {
    text-align: left;
    padding: 0 20px;
    color: rgba(23, 17, 20, 1);
    font-weight: 600;
    font-size: 14px;
    padding-bottom: 10px;
  }
  .jiazhangshuoTitle {
    display: flex;
    justify-content: space-between;
    flex: 1;
    min-width: 50%;
    .title {
      text-align: left;
      font-weight: 600;
      padding: 20px;
    }
    .logo {
      // font-weight: 600;
      font-size: 24px;
      padding: 10px 20px;
      line-height: 20px;
    }
  }
}
</style>
