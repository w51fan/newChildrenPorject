<template>
  <div class="careIndexPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">儿童之家</div>
      </template>
    </van-nav-bar>
    <div class="headBar">
      <img class="headerImg" src="../assets/img_bg_ertongzhijia@2x.png" alt />
      <div class="headBarInteview">
        <div class="warp">
          <div class="titleText">儿童关爱统计数据</div>
          <div class="flex">
            <div class="item">
              <div>
                <span class="guanaiertongColor">{{
                  totalCount.ChildrenCount
                }}</span>
                <span class="gray">名</span>
              </div>
              <div class="name">关爱儿童</div>
            </div>
            <div class="item">
              <div>
                <span class="guanaihuodongColor">{{
                  totalCount.ActivityCount
                }}</span>
                <span class="gray">场</span>
              </div>
              <div class="name">关爱活动</div>
            </div>
            <div class="item">
              <div>
                <span class="jiatinngjiaoyuColor">{{
                  totalCount.CourseCount
                }}</span>
                <span class="gray">小时</span>
              </div>
              <div class="name">家庭教育小视频</div>
            </div>
          </div>
          <div class="flex">
            <div class="item">
              <div>
                <span class="ertongzhijiaColor">{{
                  totalCount.ChildrenHomeCount
                }}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">儿童之家</div>
            </div>
            <div class="item">
              <div>
                <span class="ertongzhurenColor">{{
                  totalCount.UserCount
                }}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">儿童主任</div>
            </div>
            <div class="item">
              <div>
                <span class="shegongzhanColor">{{
                  totalCount.SocialStationCount
                }}</span>
                <span class="gray">个</span>
              </div>
              <div class="name">社工站</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="gap gapone"></div>

    <div class="gap gapten"></div>-->
    <van-tabs class="careIndexTabs" v-model="activeTab">
      <van-tab title="活动统计">
        <div class="gap gaptwo"></div>
        <div v-for="(area, index) in areaItems" :key="index">
          <div class="flex space-between" style="padding: 20px">
            <div>{{ area.text }}</div>
            <div
              v-if="area.ActivityCount > 0"
              @click="collapseDown(area, index)"
            >
              ({{ area.ActivityCount }}场)
              <van-icon name="arrow-down" v-if="showCurrentDown === index" />
              <van-icon name="arrow" v-else />
            </div>
            <div v-else>
              (0场)
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
                  v-if="child.ActivityCount > 0"
                  @click="collapseSecondDown(child, turn)"
                >
                  ({{ child.ActivityCount }}场)
                  <van-icon
                    name="arrow-down"
                    v-if="showSecondCurrentDown === turn"
                  />
                  <van-icon name="arrow" v-else />
                </div>
                <div v-else>
                  (0场)
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="gap gapone"></div>
              <div v-if="showSecondChild === turn">
                <div v-for="(tree, temp) in child.children" :key="temp">
                  <div class="flex space-between" style="padding: 5px 45px" @click="goDetail(tree)">
                    <div
                      style="border-left: 1px solid #676767; padding-left: 5px"
                    >
                      --{{ tree.text }}
                    </div>
                    <div v-if="tree.ActivityCount > 0">
                      ({{ tree.ActivityCount }}场)
                    </div>
                    <div v-else>(0场)</div>
                  </div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="儿童统计">
        <div class="gap gaptwo"></div>
        <div v-for="(area, index) in childrenItems" :key="index">
          <div class="flex space-between" style="padding: 20px">
            <div>{{ area.text }}</div>
            <div
              v-if="area.ChildrenCount > 0"
              @click="collapseDown(area, index)"
            >
              ({{ area.ChildrenCount }}名)
              <van-icon name="arrow-down" v-if="showCurrentDown === index" />
              <van-icon name="arrow" v-else />
            </div>
            <div v-else>
              (0名)
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
                  v-if="child.ChildrenCount > 0"
                  @click="collapseSecondDown(child, turn)"
                >
                  ({{ child.ChildrenCount }}名)
                  <van-icon
                    name="arrow-down"
                    v-if="showSecondCurrentDown === turn"
                  />
                  <van-icon name="arrow" v-else />
                </div>
                <div v-else>
                  (0名)
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="gap gapone"></div>
              <div v-if="showSecondChild === turn">
                <div v-for="(tree, temp) in child.children" :key="temp">
                  <div
                    class="flex space-between"
                    style="padding: 5px 45px"
                    @click="goDetail(tree)"
                  >
                    <div
                      style="border-left: 1px solid #676767; padding-left: 5px"
                    >
                      --{{ tree.text }}
                    </div>
                    <div v-if="tree.ChildrenCount > 0">
                      ({{ tree.ChildrenCount }}名)
                    </div>
                    <div v-else>(0名)</div>
                  </div>
                </div>
                <div class="gap gapone"></div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="儿童主任">
        <div class="gap gaptwo"></div>
        <div class="flex space-between">
          <div class="childrenMastertableHead">儿童之家</div>
          <div class="childrenMastertableHead">儿童主任</div>
          <div class="childrenMastertableHead">活动数</div>
        </div>
        <div class="gap gapone"></div>
        <van-cell
          class="childrenMaster"
          :value="childrenHome.ActivityCount"
          is-link
          @click="goDetail(childrenHome)"
          v-for="(childrenHome, index) in topChildrenHomeList"
          :key="index"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="flex space-between">
              <div class="custom-title">{{ childrenHome.Name }}</div>
              <div>{{ childrenHome.ChildrenDirector }}</div>
            </div>
          </template>
        </van-cell>
      </van-tab>
      <van-tab title="社工站">
        <div class="gap gaptwo"></div>
        <div class="flex space-between">
          <div class="childrenMastertableHead">社工站</div>
          <!-- <div class="childrenMastertableHead">社工管理员</div> -->
          <div class="childrenMastertableHead">活动数</div>
        </div>
        <div class="gap gapone"></div>
        <van-cell
          class="childrenMaster"
          :value="SocialStation.ActivityCount"
          is-link
          @click="goSocialStation(SocialStation)"
          v-for="(SocialStation, index) in topSocialStationList"
          :key="index"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="flex space-between">
              <div class="custom-title">{{ SocialStation.Name }}</div>
              <!-- <div>{{SocialStation.ChildrenDirector}}</div> -->
            </div>
          </template>
        </van-cell>
      </van-tab>
    </van-tabs>
    <!-- <bottomNavPage :selectedNav.sync="selectedNav"></bottomNavPage> -->
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
// import bottomNavPage from './bottomNavPage.vue';

import {
  getTotalCount,
  getTreeCount,
  getTopChildrenHomeList,
  getTopSocialStationList,
} from '@/api/home';

export default {
  name: 'childrenHomePageIndex',
  components: {
    // bottomNavPage,
  },
  data() {
    return {
      selected: '1',
      selectedNav: 'careIndex',
      // totalCount: '',
      totalCount: {
        ChildrenCount: '',
        ActivityCount: '',
        CourseCount: '',
        ChildrenHomeCount: '',
        UserCount: '',
        SocialStationCount: '',
      },
      activeTab: 0,
      areaList: [],
      activeArea: 0,
      activeNames: '',
      activeNames2: '',
      activeNames3: '',
      areaItems: [],
      childrenItems: [],
      childerenHomeList: [],
      topChildrenHomeList: [],
      topSocialStationList: [],
      showOverlay: false,
      showCurrentDown: '',
      showSecondCurrentDown: '',
      showChild: '',
      showSecondChild: '',
    };
  },
  mounted() {
    this.showOverlay = true;
    if (this.$route.query.activeTab) {
      this.activeTab = this.$route.query.activeTab;
    }
    // if (!this.cityId) {
    //   this.$store.commit(
    //     'common/getCityId',
    //     window.localStorage.getItem('cityId') - 0,
    //   );
    //   // this.cityId = window.localStorage.getItem("cityId");
    // }
    console.log('this.cityId', this.cityId);
    getTotalCount(this.cityId)
      .then((res) => {
        // console.log("getTotalCount", res);
        this.totalCount = res.data.totalCount;
        getTreeCount(this.cityId)
          .then((result) => {
            // console.log("getTreeCount", result);
            this.areaList = result.data.areaList;
            this.areaList.forEach((item) => {
              const areaTemp = {
                text: item.ActivityCount > 0 ? `${item.Name}` : item.Name,
                children: [],
                ActivityCount: item.ActivityCount,
              };
              const childrenTemp = {
                text: item.ChildrenCount > 0 ? `${item.Name}   ` : item.Name,
                children: [],
                ChildrenCount: item.ChildrenCount,
              };
              if (item.Area.length > 0) {
                item.Area.forEach((areaItem) => {
                  const activityChildren = [];
                  const childrenChildren = [];
                  if (areaItem.Area.length > 0) {
                    areaItem.Area.forEach((threeItem) => {
                      activityChildren.push({
                        text:
                          threeItem.ActivityCount > 0
                            ? `${threeItem.Name}   `
                            : threeItem.Name,
                        VillageId: threeItem.Id,
                        ActivityCount: threeItem.ActivityCount,
                      });
                      childrenChildren.push({
                        text:
                          threeItem.ChildrenCount > 0
                            ? `${threeItem.Name}   `
                            : threeItem.Name,
                        VillageId: threeItem.Id,
                        ChildrenCount: threeItem.ChildrenCount,
                      });
                    });
                  }
                  areaTemp.children.push({
                    text:
                      areaItem.ActivityCount > 0
                        ? `${areaItem.Name}  `
                        : areaItem.Name,
                    children: activityChildren,
                    ActivityCount: areaItem.ActivityCount,
                  });
                  childrenTemp.children.push({
                    text:
                      areaItem.ChildrenCount > 0
                        ? `${areaItem.Name}  `
                        : areaItem.Name,
                    children: childrenChildren,
                    ChildrenCount: areaItem.ChildrenCount,
                  });
                });
              }
              this.areaItems.push(areaTemp);
              this.childrenItems.push(childrenTemp);
              console.log('this.areaItems', this.areaItems);
              console.log('this.childrenItems', this.childrenItems);
            });
            this.showOverlay = false;
          })
          .catch((err2) => {
            console.log('getTreeCount', err2);
            this.showOverlay = false;
          });
      })
      .catch((err) => {
        console.log('getTotalCount', err);
        this.showOverlay = false;
      });
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId
        ? this.$store.state.common.cityId
        : window.localStorage.getItem('cityId');
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
  },
  watch: {
    activeTab(val) {
      this.showCurrentDown = '';
      this.showSecondCurrentDown = '';
      this.showChild = '';
      this.showSecondChild = '';
      if (val === 2) {
        this.showOverlay = true;
        getTopChildrenHomeList(this.cityId)
          .then((res) => {
            // console.log("getTopChildrenHomeList", res);
            this.topChildrenHomeList = res.data.topChildrenHomeList;
            this.showOverlay = false;
          })
          .catch((err) => {
            // console.log("getTotalCount", err);
            this.showOverlay = false;
          });
      } else if (val === 3) {
        this.showOverlay = true;
        getTopSocialStationList(this.cityId)
          .then((res) => {
            // console.log("getTopChildrenHomeList", res);
            this.topSocialStationList = res.data.topSocialStationList;
            this.showOverlay = false;
          })
          .catch((err) => {
            // console.log("getTotalCount", err);
            this.showOverlay = false;
          });
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.PreCurrentPath ? this.PreCurrentPath : 'homePage',
      });
    },
    goDetail(childrenHome) {
      // this.$store.commit('common/getPreCurrentPath', 'childrenHomePageIndex');
      this.$store.commit('common/getVillageId', childrenHome.VillageId);
      // if (this.$route.query.currentPath) {
      //   this.$store.commit(
      //     'common/getPreCurrentPath',
      //     this.$route.query.currentPath,
      //   );
      // }

      this.$router.push({
        name: 'childrenHomePage',
        query: {
          currentPath: 'childrenHomePageIndex',
        },
      });
    },
    goSocialStation(SocialStation) {
      console.log('SocialStation', SocialStation);
      this.$store.commit('common/getSocialStationId', SocialStation.Id);
      if (this.$route.query.currentPath) {
        this.$store.commit(
          'common/getPreCurrentPath',
          this.$route.query.currentPath,
        );
      }

      this.$router.push({
        name: 'socialWorkstationDetail',
        query: {
          currentPath: 'careIndex',
          isAssistant: false,
        },
      });
    },
    collapseDown(data, index) {
      if (this.showCurrentDown === index) {
        this.showCurrentDown = '';
        this.showChild = '';
      } else {
        this.showCurrentDown = index;
        this.showChild = index;
      }

      console.log(data);
    },
    collapseSecondDown(data, index) {
      if (this.showSecondCurrentDown === index) {
        this.showSecondCurrentDown = '';
        this.showSecondChild = '';
      } else {
        this.showSecondCurrentDown = index;
        this.showSecondChild = index;
      }

      console.log(data);
    },
  },
};
</script>

<style lang="less">
.careIndexPage {
  width: 100%;
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .headBar {
    height: 250px;
    position: relative;
    background: rgba(232, 232, 232, 0.5);
    .headerImg {
      width: 100%;
    }
    .headBarInteview {
      width: 93vw;
      background: #fff;
      border-radius: 14px;
      top: 80px;
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

  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .gaptwo {
    height: 2px;
  }
  .gapten {
    height: 15px;
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
  .green {
    color: #0cce0c;
    font-size: 28px;
  }
  .gray {
    color: rgba(102, 102, 102, 1);
    font-size: 12px;
  }
  .item {
    padding: 10px 0 0;
    flex: 3;
  }
  .name {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
  }
  .careIndexTabs {
    /deep/.van-tabs__line {
      width: 34% !important;
    }
    /deep/.van-cell__title {
      text-align: left;
    }
    .three {
      /deep/.van-cell__right-icon {
        display: none;
      }
    }
    .childrenMaster {
      /deep/.van-cell__title {
        text-align: left;
        flex: 2;
      }
      /deep/.van-cell__value {
        flex: 1;
      }
    }
    .childrenMastertableHead {
      padding: 10px 30px;
      font-size: 16px;
      font-weight: 900;
    }
  }
}
</style>
