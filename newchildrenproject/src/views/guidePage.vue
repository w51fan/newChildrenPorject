<template>
  <div class="guidePage">
    <div class="headBar">
      <img src="../assets/img_bg_yindaoye@2x.png" alt />
      <div class="headBarCity">
        <div>邵阳市</div>
        <div>儿童关爱平台</div>
      </div>
      <div class="headBarInteview">
        <div
          style="
            color: #022954;
            font-size: 18px;
            padding: 20px 0 0;
            display: flex;
          "
        >
          <div style="display: flex; padding-left: 20px; flex: 3">
            <div class="line"></div>
            <div class="round"></div>
          </div>
          <div style="font-size: 20px; font-weight: 600; width: 100%; flex: 3">
            系统介绍
          </div>
          <div style="display: flex; padding-right: 20px; flex: 3">
            <div class="round"></div>
            <div class="line"></div>
          </div>
        </div>
        <div class="introduceContent">{{ introduceContent }}</div>
        <div class="fix" @click="go">
          <div>进入平台</div>
        </div>
      </div>
    </div>
    <div style="color: #717c87; font-size: 14px">全学家儿童关爱平台</div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/home';

export default {
  name: 'guidePage',
  data() {
    return {
      showOverlay: false,
      activeTab: '',
      introduceContent:
        '儿童关爱行动平台是一套网络信息化管理系统，除了进行儿童信息采集外，通过建立县、乡、村三级监督考核系统、评估系统，还可以对儿童问题和动态及时关注、及时干预，及时解决，及时反馈。此系统包括管理端（PC）、展示端（用于展示民政系统对外数据和新闻发布）以及手机管理端（用户管理、上报儿童信息、发布儿童之家活动以及观看家庭教育视频）三个客户端。',
      // functionContent:"",
    };
  },
  methods: {
    go() {
      const token = window.localStorage.getItem('childrenToken');
      if (token) {
        this.showOverlay = true;
        getUserInfo(token)
          .then((res) => {
            console.log('getUserInfo init', res);
            // type 4:儿童主任,显示儿童之家，   1. 市级管理员 2. 县级管理员  3. 镇级管理员 4. 村级管理员 5. 村级讲师 6. 助理 7. 志愿者 11. 家长用户 12 社会救助服务管理员 显示社工服务
            this.$store.commit('common/getUserTpye', res.data.user.Type);
            this.$store.commit('common/SET_UserTpye', res.data.user.Type);
            this.$store.commit('common/getCityId', res.data.user.CityId);
            this.$store.commit('common/SET_cityId', res.data.user.CityId);
            this.$store.commit('common/getUser', res.data.user);
            this.showOverlay = false;
            if (
              res.data.user.Type === 4
              || res.data.user.Type === 11
              || res.data.user.Type === 14
              || res.data.user.Type === 15
            ) {
              this.$router.push({
                name: 'homePage',
                // name: "socialWorkstation",
                query: {
                  user: res.data.user,
                },
              });
            } else if (res.data.user.Type === 12) {
              this.$router.push({
                name: 'homePage',
                query: {
                  user: res.data.user,
                },
              });
            } else {
              this.$router.push({
                name: 'homePage',
                query: {
                  user: res.data.user,
                  isAssistant: true,
                },
              });
            }
          })
          .catch((err2) => {
            console.log('err', err2);
            this.showOverlay = false;
          });
      } else {
        this.$router.push({
          name: 'loginPage',
        });
      }
    },
  },
};
</script>

<style lang="less">
.guidePage {
  .headBar {
    height: 165vw;
    img {
      width: 100%;
    }
    position: relative;
    .headBarCity {
      position: absolute;
      font-size: 40px;
      color: #feffff;
      top: 10vw;
      width: 100%;
    }
    .headBarInteview {
      background: #fff;
      border-radius: 14px;
      top: 56vw;
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
        width: 100%;
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
