/* eslint-disable no-nested-ternary */
/* eslint-disable no-nested-ternary */
<template>
  <div class="userCenterPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">用户中心</div>
      </template>
    </van-nav-bar>
    <div class="headerInfo">
      <div class="flex">
        <img
          :src="userInfo.ProfilePhoto"
          style="width: 74px; height: 74px"
          alt
        />
        <div class="info">
          <div class="flex space-between">
            <div class="role flex">
              <div class="name">{{ userName }}</div>
              <div class="roleName">{{ userIdentity }}</div>
            </div>
            <van-icon class="settingIcon" name="setting-o" @click="go(7)" />
          </div>
          <div class="flex">
            <div class="infoTtem" @click="go(8)">
              <div>
                {{ userInfo.ChildrenCount }}
                <span style="font-size: 10px">个</span>
              </div>
              <div>我的成员</div>
            </div>
            <div class="gapbar"></div>
            <div class="infoTtem" @click="go(2)">
              <div>
                {{ userInfo.ActivityCount }}
                <span style="font-size: 10px">场</span>
              </div>
              <div>我的活动</div>
            </div>
            <div class="gapbar"></div>
            <div class="infoTtem" @click="go(1)">
              <div>
                {{ userInfo.Points }}
                <span style="font-size: 10px">分</span>
              </div>
              <div>我的积分</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerBottomNav flex space-between">
      <!-- <div class="flex item" @click="go(4)">
        <div style="max-width: 70px; position: relative">
          <div>我的记录</div>
          <div class="tipsNum">{{userInfo.Points}}</div>
        </div>
      </div>
      <div class="gapbar"></div> -->
      <div class="flex item" @click="go(5)">
        <div style="max-width: 70px; position: relative">
          <div>走访记录</div>
          <div class="tipsNum">{{ userInfo.VisitCount }}</div>
        </div>
      </div>
      <div class="gapbar"></div>
      <!-- <div class="flex item" @click="go(6)">
        <div style="max-width: 70px; position: relative">
          <div>成长记录</div>
          <div class="tipsNum">{{userInfo.Points}}</div>
        </div>
      </div>
      <div class="gapbar"></div> -->
      <div class="flex item" @click="go(9)">
        <div style="max-width: 70px; position: relative">
          <div>学习记录</div>
          <div class="tipsNum">{{ userInfo.LearningCount }}</div>
        </div>
      </div>
    </div>

    <div class="iconNav flex space-between">
      <div
        v-for="(src, index) in navHeaderList"
        :key="index"
        @click="go(index)"
      >
        <img :src="src.img" style="width: 24px; height: 24px" alt />
        <div class="text">{{ src.name }}</div>
      </div>
    </div>
    <div class="tenBar"></div>
    <div class="useInfo flex space-between">
      <div class="flex">
        <img :src="usrInfoIcon" class="useInfoImg" alt />
        <div class="text">用户信息</div>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="tenBar"></div>
    <div class="elseNav" v-for="(list, index) in settingList" :key="index">
      <div class="flex space-between" @click="gofun(index)">
        <div class="flex">
          <img :src="list.img" class="elseNavImg" alt />
          <div class="text">{{ list.name }}</div>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="bottomText">全学家儿童关爱平台</div>
    <bottomNavPage :selectedNav.sync="selectedNav"></bottomNavPage>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/home';
import bottomNavPage from './bottomNavPage.vue';

export default {
  name: 'userCenterPage',
  components: {
    bottomNavPage,
  },
  data() {
    return {
      selectedNav: 'userCenterPage',
      // eslint-disable-next-line global-require
      headimg: require('../assets/nohead.png'),
      navHeaderList: [
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_ertongzhijia.png'),
          name: '儿童之家',
        },
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_wodejifen_yonghuzhongxin@2x.png'),
          name: '我的积分',
        },
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_wodehuodong_yonghuzhongxin@2x.png'),
          name: '我的活动',
        },
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_yonghufankui_yonghuzhongxin@2x.png'),
          name: '用户反馈',
        },
      ],
      // eslint-disable-next-line global-require
      usrInfoIcon: require('../assets/icon_yonghuxinxi_yonghuzhongxin@2x.png'),
      settingList: [
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_bangzhuzhongxin_yonghuzhongxin@2x.png'),
          name: '帮助中心',
        },
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_banbenshengji_yonghuzhongxin@2x.png'),
          name: '版本升级',
        },
        {
          // eslint-disable-next-line global-require
          img: require('../assets/icon_tuichudenglu_yonghuzhongxin@2x.png'),
          name: '退出登录',
        },
      ],
      showOverlay: false,
      userIdentity: '',
      userName: '',
      userInfo: {
        ActivityCount: 0,
        ChildrenCount: 0,
        LearningCount: 0,
        Points: 0,
        VisitCount: 0,
        ProfilePhoto: '',
        // growingCount: 0,
        // myRecordsCount: 0,
      },
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token
        ? this.$store.state.common.Token
        : window.localStorage.getItem('childrenToken');
    },
    UserType() {
      return this.$store.state.common.UserType
        ? this.$store.state.common.UserType
        : window.localStorage.getItem('UserType') - 0;
    },
    // User: {
    //   get() {
    //     return this.$store.state.common.User;
    //   },
    //   set() {},
    // },
  },
  mounted() {
    this.showOverlay = true;
    getUserInfo(this.Token)
      .then((res) => {
        console.log('getUserInfo', res);
        this.userInfo = res.data.user;
        this.userName = res.data.user.Name;
        this.userInfo.ProfilePhoto = this.userInfo.ProfilePhoto === ''
          ? this.headimg
          : this.userInfo.ProfilePhoto;
        this.userIdentity = this.userInfo.Type === 4
          ? '儿童主任'
          : this.userInfo.Type === 7
            ? '志愿者'
            : this.userInfo.Type === 3
              ? '镇级管理员'
              : this.userInfo.Type === 2
                ? '县级管理员'
                : this.userInfo.Type === 1
                  ? '市级管理员'
                  : this.userInfo.Type === 6
                    ? '助理'
                    : this.userInfo.Type === 11
                      ? '家长'
                      : this.userInfo.Type === 12
                        ? '社区工作服务管理员'
                        : this.userInfo.Type === 14
                          ? '校儿童主任'
                          : this.userInfo.Type === 15
                            ? '校儿童督导员'
                            : '村级讲师';
        this.showOverlay = false;
      })
      .catch((err) => {
        console.log('getUserInfo', err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'homePage',
      });
    },
    go(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.$store.commit('common/getPreCurrentPath', 'userCenterPage');
          this.$router.push({
            // name: 'childrenHomePageIndex',
            name: 'childrenHomeListPage',
          });
          break;
        case 1:
          this.$router.push({
            name: 'myIntegralPage',
          });
          break;
        case 2:
          this.$router.push({
            name: 'offlineActivityPage',
          });
          break;
        case 3:
          this.$router.push({
            name: 'userFeedbackPage',
          });
          break;
        case 4:
          this.$router.push({
            name: 'myRecordsPage',
          });
          break;
        case 5:
          if (this.UserType === 11) {
            this.$notify({
              type: 'warning',
              message: '您没有权限操作此菜单，请联系管理员',
              duration: 2000,
            });
            return;
          }
          this.$router.push({
            name: 'myRecordsListPage',
          });
          break;
        case 6:
          this.$router.push({
            name: 'growthRecordPage',
          });
          break;
        case 7:
          this.$store.commit('common/getPreCurrentPath', 'userCenterPage');
          this.$router.push({
            name: 'accountSettingPage',
          });
          break;
        case 8:
          this.$router.push({
            name: 'myMembersListPage',
          });
          break;
        case 9:
          this.$router.push({
            name: 'studyRecordListPage',
          });
          break;
        default:
          this.$notify({
            type: 'warning',
            message: '此功能还没有上线',
            duration: 2000,
          });
          break;
      }
    },
    gofun(index) {
      switch (index) {
        case 0:
          this.$store.commit('common/getPreCurrentPath', 'userCenterPage');
          this.$router.push({
            // name: 'childrenHomePageIndex',
            name: 'childrenHomeListPage',
          });
          break;
        case 1:
          this.$router.push({
            name: 'myIntegralPage',
          });
          break;
        case 2:
          // Dialog.confirm({
          //   title: '标题',
          //   message: '弹窗内容',
          // })
          //   .then(() => {
          //     // on confirm
          //   })
          //   .catch(() => {
          //     // on cancel
          //   });
          this.$dialog
            .confirm({
              // title: '提示',
              message: '确定退出登录？',
            })
            .then(() => {
              // on confirm
              console.log('queding');
              window.localStorage.removeItem('childrenToken');
              window.localStorage.removeItem('cityId');
              this.$router.push({
                name: 'guidePage',
              });
            })
            .catch(() => {
              // on cancel
              console.log('guanbi ');
            });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
.userCenterPage {
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .headerInfo {
    padding: 20px 20px 0;
    background-image: linear-gradient(#ffb7b3, #f24b42, #ef4843);
    .usercenterHeaderImg {
      width: 74px;
      height: 74px;
    }
    .info {
      width: 285px;
      .role {
        padding: 0 15px;
        .name {
          font-size: 18px;
          font-weight: 600;
          color: rgba(249, 249, 249, 1);
          padding-right: 5px;
        }
        .roleName {
          font-size: 14px;
          color: rgba(249, 249, 249, 1);
          line-height: 24px;
        }
      }
      .settingIcon {
        font-size: 20px;
        color: #efefef;
      }
      .infoTtem {
        padding: 15px 10px;
        color: rgba(249, 249, 249, 1);
      }
      .gapbar {
        border-right: 1px solid #f9f9f9;
        margin: 25px 0;
      }
    }
  }
  .headerBottomNav {
    // padding: 0px 20px;
    background: rgba(255, 0, 0, 0.4);
    color: rgba(93, 1, 1, 1);
    .gapbar {
      border-right: 1px solid rgba(245, 42, 42, 0.6);
    }
    .item {
      margin: 15px 10px;
      position: relative;
      flex: 4;
      justify-content: center;
      .tipsNum {
        background: rgba(243, 0, 0, 1);
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        font-size: 10px;
        color: #efefef;
        position: absolute;
        right: -10px;
        top: -13px;
      }
    }
  }
  .iconNav {
    padding: 20px;
    .iconNavImg {
      width: 24px;
      height: 24px;
    }
    .text {
      font-size: 14px;
      font-weight: 600;
      padding: 5px 0;
    }
  }
  .tenBar {
    height: 10px;
    background: #efefef;
  }
  .useInfo {
    padding: 20px;
    .useInfoImg {
      width: 18px;
      height: 18px;
    }
    .text {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  .elseNav {
    padding: 10px 20px;
    border-bottom: 1px solid #efefef;
    .elseNavImg {
      width: 18px;
      height: 18px;
    }
    .text {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  .bottomText {
    color: #717c87;
    font-size: 14px;
    margin-top: 50px;
  }
}
</style>
