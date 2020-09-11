<template>
  <div class="assistantEnnterPage">
    <div class="headBar">
      <img src="../assets/img_bg_yindaoye@2x.png" alt />
      <div class="headBarCity">
        <div>邵阳市</div>
        <div>儿童关爱平台</div>
      </div>
      <div class="headBarInteview">
        <div style="color:#022954;font-size:18px;padding: 20px 0 0;display: flex;">
          <div style=" display: flex;padding-left: 20px;">
            <div class="line"></div>
            <div class="round"></div>
          </div>
          <div style="font-size: 20px;font-weight: 600;width: 100%;">系统介绍</div>
          <div style="display: flex;padding-right: 20px;">
            <div class="round"></div>
            <div class="line"></div>
          </div>
        </div>
        <div class="introduceContent">{{introduceContent}}</div>
        <div class="fix" @click="go">
          <div>进入平台</div>
        </div>
      </div>
    </div>
    <div style="color:#717C87;font-size:14px;">全学家儿童关爱平台</div>
  </div>
</template>

<script>
export default {
  name: 'guidePage',
  data() {
    return {
      activeTab: '',
      introduceContent:
        '儿童关爱行动平台是一套网络信息化管理系统，除了进行儿童信息采集外，通过建立县、乡、村三级监督考核系统、评估系统，还可以对儿童问题和动态及时关注、及时干预，及时解决，及时反馈。此系统包括管理端（PC）、展示端（用于展示民政系统对外数据和新闻发布）以及手机管理端（用户管理、上报儿童信息、发布儿童之家活动以及观看家庭教育视频）三个客户端。',
      // functionContent:"",
    };
  },
  methods: {
    go() {
      this.$router.push({
        name: 'loginPage',
      });
    },
  },
};
</script>

<style lang="less">
.assistantEnnterPage {
  .headBar {
    height: 88vh;
    img {
      width: 100%;
    }
    position: relative;
    .headBarCity {
      position: absolute;
      font-size: 40px;
      color: #feffff;
      top: 26vw;
      left: 12vh;
    }
    .headBarInteview {
      background: #fff;
      border-radius: 14px;
      top: 32vh;
      position: absolute;
      margin: 15px;
      box-shadow: 0 10px 15px 0 rgba(216, 216, 216, 0.5);
      .round {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #979797;
        margin-top: 6px;
      }
      .line {
        width: 108px;
        height: 3px;
        background: #efefef;
        margin-top: 10px;
      }
    }
  }

  .fix {
    text-align: center;
    margin: auto;
    width: 240px;
    padding: 20px;
    background: url("../assets/btn_jinrupingtai@2x.png") no-repeat center;
    // background: rgba(197, 53, 42);
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 35px;
    &:hover {
      background: rgba(197, 53, 42, 0.5);
    }
  }

  .introduceContent {
    text-align: left;
    padding: 20px;
  }
  .function {
    text-align: left;
    padding: 20px;
  }
  .ennterPageTabs {
    /deep/.van-tabs__line {
      width: 40% !important;
    }
  }
}
</style>
