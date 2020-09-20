<template>
  <div class="volunteerDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">志愿者详情</div>
      </template>
    </van-nav-bar>
    <div class="volunteerDetailHeader flex">
      <img :src="volunteer.img" alt class="img" />
      <div>
        <div>{{volunteer.name}}</div>
        <div>{{volunteer.personalDescribe}}</div>
      </div>
    </div>
    <div class="dataTitle">数据统计</div>
    <div class="flex space-between tableHeader">
      <div class="item">人数</div>
      <div class="item">活动次数</div>
      <div class="item" style="margin-right: 15px;">评分</div>
    </div>
    <van-cell class="dataInfo">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="flex space-between tableContent">
          <div class="custom-title">{{childrenHome.ChildrenCount}}人</div>
          <div>{{childrenHome.ActivityCount}}次</div>
          <div>
            <ul class="cleanfloat flex">
              <li v-for="(n,index) in 5" :key="index" :class="[index+1>starNum?'grayStar':'star']">★</li>
            </ul>
          </div>
        </div>
      </template>
    </van-cell>
    <div class="myActivity">
      <div class="title">我的活动</div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "volunteerDetailPage",
  data() {
    return {
      volunteer: {
        img: require("../assets/icon_touxiang_zhiyuanzhe @2x.png"),
        name: "规划局",
        personalDescribe: "个人简介"
      },
      childrenHome: {
        ChildrenCount: "33",
        ActivityCount: "33"
      }
    };
  },
  methods: {
    onClickLeft() {},
    go() {
      //   this.$router.push({
      //     name: 'loginPage',
      //   });
    }
  }
};
</script>

<style lang="less">
.volunteerDetailPage {
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
  .volunteerDetailHeader {
    background: #ff8077;
    color: #ffffff;
    .img {
      width: 54px;
      height: 54px;
    }
  }
  .dataTitle {
    background: rgba(232, 232, 232, 0.5);
    text-align: left;
  }
  .tableHeader {
    padding: 20px 20px 10px;
    .item {
      // flex: 3;
      text-align: center;
    }
  }
  .dataInfo {
    padding: 20px 20px 10px;
    .tableContent {
      .item {
        flex: 3;
      }
    }
  }
  .myActivity {
    .title {
      text-align: left;
    }
  }
}
</style>
