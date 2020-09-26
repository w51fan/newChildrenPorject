<template>
  <div class="homePage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">全家学儿童关爱</div>
      </template>
    </van-nav-bar>
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#E73A32">
        <van-swipe-item v-for="(img,index) in imgList" :key="index">
          <img :src="img" class="swipeImg" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="navHeader">
      <div v-for="(src,index) in navHeaderList" :key="index" @click="go(index)">
        <img :src="src.img" class="navHeaderImg" alt />
        <div style="font-size:14px;font-weight:600;padding-bottom:10px;">{{src.name}}</div>
      </div>
    </div>
    <div style="width:100%;height:10px;background:#EBECEC;"></div>
    <div style="text-align: left;padding:20px;font-size: 16px;font-weight: 600;">
      <div>儿童关爱数据统计</div>
    </div>
    <div class="statisticsData">
      <div>
        <div
          style="color:rgba(210, 30, 25, 1);font-size: 18px;font-weight: 600;"
        >{{statisticsData.childrenHomeNum}}</div>
        <div style="color: rgba(102, 102, 102, 1);">邵阳儿童之家（个）</div>
      </div>
      <div style="width: 1px;height: 25px;background: rgba(218, 218, 218, 0.8);margin-top: 10px;"></div>
      <div>
        <div
          style="color:rgba(107, 192, 60, 1);font-size: 18px;font-weight: 600;"
        >{{statisticsData.activityNum}}</div>
        <div style="color: rgba(102, 102, 102, 1);">开展关爱活动（次）</div>
      </div>
    </div>
    <div
      style="text-align: left;padding: 10px 20px 0;font-size: 14px;font-weight: 600;display:flex;justify-content: space-between;"
    >
      <div>各地区开展关爱活动详情</div>
      <div style="display: flex;">
        <div
          style="width: 20px;height: 20px;background: rgba(252, 90, 33, 1);border-radius: 5px;margin-right: 5px;margin-top: 1px;"
        ></div>
        <div>关爱活动</div>
      </div>
    </div>
    <div>
      <div id="myChart" :style="{ height: '300px'}"></div>
    </div>
    <bottomNavPage :selectedNav.sync="selectedNav"></bottomNavPage>
  </div>
</template>

<script>
import { getTreeCount } from "@/api/home";
import bottomNavPage from "./bottomNavPage.vue";

export default {
  name: "homePage",
  components: {
    bottomNavPage
  },
  data() {
    return {
      imgList: [
        // eslint-disable-next-line global-require
        require("../assets/img_banner01@2x.png"),
        // eslint-disable-next-line global-require
        require("../assets/img_banner01@2x.png"),
        // eslint-disable-next-line global-require
        require("../assets/img_banner01@2x.png"),
        // eslint-disable-next-line global-require
        require("../assets/img_banner01@2x.png")
      ],
      navHeaderList: [
        {
          // eslint-disable-next-line global-require
          img: require("../assets/icon_zhengfuzhudao@2x.png"),
          name: "政府主导"
        },
        {
          // eslint-disable-next-line global-require
          img: require("../assets/icon_ertongzhijia@2x.png"),
          name: "儿童之家"
        },
        {
          // eslint-disable-next-line global-require
          img: require("../assets/icon_xuexileyuan_shouye@2x.png"),
          name: "学习乐园"
        }
      ],
      xAxisList: [
        // "双清区",
        // "大祥区",
        // "北塔区",
        // "邵阳县",
        // "洞口县",
        // "绥宁县",
        // "城步苗族自治县",
        // "新宁县"
      ],
      yAxisList: [],
      uintNum: 1000,
      // seriesList: [1260, 200, 1570, 8670, 570, 1150, 1350, 969, 999, 388],
      seriesList: [],
      maxNum: this.uintNum,
      selectedNav: "homePage",
      statisticsData: {
        childrenHomeNum: 2387,
        activityNum: 0
      },
      areaList: [],
      areaItems: [],
      childrenItems: []
    };
  },
  computed: {
    echartOption() {
      return {
        // title: {
        //   text: '各地区开展关爱活动详情',
        // },
        legend: {
          show: true,
          icon: "stack",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#1bb4f6"
          },
          data: ["关爱活动"]
        },
        grid: {
          left: "16%",
          bottom: "45%",
          top: 20
        },
        xAxis: {
          type: "category",
          data: this.xAxisList,
          axisLabel: {
            color: "#999",
            textStyle: {
              fontSize: 12
            },
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: "value",
          min: 0,
          max: this.maxNum
        },
        series: [
          {
            data: this.seriesList,
            type: "bar",
            barWidth: "10px",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      // color: 'rgba(253, 119, 47, 1)', // 0% 处的颜色
                      color: "rgba(251, 66, 21, 1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(253, 119, 47, 1)"
                      // color: 'rgba(251, 66, 21, 1)', // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: [30, 30, 0, 0]
              }
            },
            label: {
              show: true,
              fontSize: 10,
              fontWeight: "bold",
              position: "top",
              color: "black",
              formatter: params => `${params.value}次`
            }
          }
        ]
      };
    },
    cityId() {
      console.log("governmentLedPage", this.$store.state);
      // return this.$store.state.common.cityId;
      return 2018;
    }
  },
  mounted() {
    getTreeCount(this.cityId)
      .then(result => {
        // console.log("getTreeCount", result);
        this.areaList = result.data.areaList;
        let maxnunm = 0;
        this.areaList.forEach(item => {
          const areaTemp = {
            text: item.ActivityCount > 0 ? `${item.Name}` : item.Name,
            children: [],
            ActivityCount: item.ActivityCount
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
                      threeItem.ActivityCount > 0
                        ? `${threeItem.Name}   `
                        : threeItem.Name,
                    ActivityCount: threeItem.ActivityCount
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
                  areaItem.ActivityCount > 0
                    ? `${areaItem.Name}  `
                    : areaItem.Name,
                children: activityChildren,
                ActivityCount: areaItem.ActivityCount
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
          this.xAxisList.push(item.Name);
          this.seriesList.push(item.ActivityCount);
          this.statisticsData.activityNum =
            this.statisticsData.activityNum + item.ActivityCount;
          // this.uintNum
          let l = 0;
          while (maxnunm >= 1) {
            maxnunm = maxnunm / 10;
            l++;
          }
          // console.log("0000", l);
          this.uintNum = 10 * l;
          if (item.ActivityCount > maxnunm) {
            maxnunm = item.ActivityCount;
          }
        });
        // console.log("this.areaItems", this.areaItems);
        // console.log("this.childrenItems", this.childrenItems);

        const myChart = this.$echarts.init(document.getElementById("myChart"));
        myChart.setOption(this.echartOption);
        this.showOverlay = false;
      })
      .catch(err2 => {
        console.log("getTreeCount", err2);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "loginPage"
      });
    },
    go(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.$router.push({
            name: "governmentLedPage"
          });
          break;
        case 1:
          this.$store.commit("common/getPreCurrentPath", "homePage");
          this.$router.push({
            name: "childrenHomePageIndex"
          });
          break;
        case 2:
          this.$router.push({
            name: "learningParkPage"
          });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="less">
.homePage {
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
  .navHeader {
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    .navHeaderImg {
      width: 60px;
      height: 60px;
      padding: 10px 38px 0;
    }
  }
  .statisticsData {
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 0 20px;
  }
}
</style>
