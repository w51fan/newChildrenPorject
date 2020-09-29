<template>
  <div class="myRecordsListPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">走访记录</div>
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
              <div class="name">{{userName}}</div>
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
      <div class="flex item" @click="go(7)">
        <div style="max-width: 70px; position: relative">
          <div>学习记录</div>
          <div class="tipsNum">{{ userInfo.LearningCount }}</div>
        </div>
      </div>
    </div>
    <div class="flex addBtn" @click="addRecord">
      <div class="addBtnImg">
        <img :src="addImg" alt="" class="img" />
      </div>
      <div class="text">添加走访记录</div>
    </div>
    <div>
      <div class="listTitle">
        <div class="flex space-between">
          <div class="item">儿童姓名</div>
          <div class="item">走访时间</div>
          <div class="item">编辑</div>
        </div>
      </div>
      <div
        v-for="(record, index) in myRecordsList"
        :key="index"
        class="listContent flex"
      >
        <div class="item">{{ record.Name }}</div>
        <div class="item">{{ record.CreateTime | dateFilter }}</div>
        <div class="flex item">
          <div style="padding: 0 10px; flex: 1" @click="viewDeatil(record)">
            详情
          </div>
          <div style="padding: 0 10px; flex: 1" @click="edit(record)">修改</div>
        </div>
      </div>
    </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getVisitList, getUserInfo } from '@/api/home';

export default {
  name: 'myRecordsListPage',
  data() {
    return {
      myRecordsList: [],
      showOverlay: false,
      // eslint-disable-next-line global-require
      headimg: require('../assets/nohead.png'),
      // eslint-disable-next-line global-require
      addImg: require('../assets/icon_add active.png'),
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
        : window.localStorage.getItem('Token');
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
        getVisitList(this.Token)
          .then((res) => {
            console.log('getVisitList', res);
            this.myRecordsList = res.data.visitList;
            this.showOverlay = false;
          })
          .catch((err) => {
            console.log('getVisitList', err);
            this.showOverlay = false;
          });
      })
      .catch((err) => {
        console.log('getUserInfo', err);
        this.showOverlay = false;
      });
  },
  filters: {
    dateFilter(value) {
      const dateTime = new Date(value);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'userCenterPage',
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
          // this.$router.push({
          //   name: 'myRecordsListPage',
          // });
          break;
        case 6:
          this.$router.push({
            name: 'growthRecordPage',
          });
          break;
        case 7:
          this.$store.commit('common/getPreCurrentPath', 'myRecordsListPage');
          this.$router.push({
            name: 'accountSettingPage',
          });
          break;
        case 8:
          this.$router.push({
            name: 'myMembersListPage',
          });
          break;
        default:
          break;
      }
    },
    addRecord() {
      this.$router.push({
        name: 'addRecordPage',
      });
    },
    viewDeatil(record) {
      this.$router.push({
        name: 'recordDetailPage',
        query: {
          id: record.Id,
        },
      });
    },
    edit(record) {
      this.$router.push({
        name: 'addRecordPage',
        query: {
          id: record.Id,
        },
      });
    },
  },
};
</script>

<style lang="less">
.myRecordsListPage {
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
  .addBtn {
    padding: 10px 0;
    .addBtnImg {
      flex: 1;
      text-align: right;
      .img {
        width: 44px;
        height: 44px;
        padding-right: 10px;
      }
    }
    .text {
      flex: 1;
      color: #1989fa;
      font-weight: 600;
      font-size: 14px;
      line-height: 44px;
      text-align: left;
    }
  }
  .listTitle {
    background: rgba(232, 232, 232, 0.5);
    color: rgba(155, 155, 155, 1);
    font-size: 14px;
    padding: 10px 0;
    .item {
      flex: 3;
    }
  }
  .listContent {
    color: rgba(74, 74, 74, 1);
    font-size: 14px;
    .item {
      flex: 3;
      padding: 0 10px;
      line-height: 39px;
    }
  }
}
</style>
