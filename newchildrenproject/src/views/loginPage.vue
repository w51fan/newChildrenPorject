<template>
  <div class="loginPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="navTitle">{{ pageTitle }}</div>
      </template>
    </van-nav-bar>
    <img class="logoImg" src="../assets/img_logo_denglu@2x.png" alt />
    <van-form class="inputList">
      <van-field
        v-model="tel"
        placeholder="请输入手机号码"
        :error-message="phoneErr"
        input-align="left"
      >
        <template #left-icon>
          <van-icon name="phone" />
        </template>
      </van-field>
      <van-field
        v-model="code"
        placeholder="请输入验证码"
        :error-message="codeErr"
        input-align="left"
        v-if="loginType === 1"
      >
        <template #left-icon>
          <van-icon name="lock" />
        </template>
        <template #right-icon>
          <!-- <div class="codeText" @click="getCode" :disabled="disabledBtn">获取验证码</div> -->
          <van-button
            size="small"
            type="default"
            class="codeText"
            @click="getCode"
            :disabled="disabledBtn"
            >{{ codeText }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="password"
        placeholder="请输入密码"
        input-align="left"
        :error-message="passwordErr"
        v-else
      >
        <template #left-icon>
          <van-icon name="lock" />
        </template>
      </van-field>
    </van-form>
    <div class="fix" @click="login">
      <div>立 即 登 录</div>
    </div>
    <div class="flex space-between">
      <div
        v-if="loginType === 1"
        style="padding: 0 45px; color: #9b9b9b"
        @click="switchLoginType"
      >
        密码登录
      </div>
      <div
        v-else
        style="padding: 0 45px; color: #9b9b9b"
        @click="switchLoginType"
      >
        验证码登录
      </div>
      <div style="padding: 0 45px; color: #9b9b9b">注册</div>
    </div>
  </div>
</template>

<script>
import { getVerifyCode, login, getUserInfo } from '@/api/home';

export default {
  name: 'loginPage',
  data() {
    return {
      pageTitle: '验证码登陆',
      code: '',
      tel: '13824404816',
      loginType: 1,
      password: '',
      phoneErr: '',
      passwordErr: '',
      codeErr: '',
      disabledBtn: false,
      timer: null,
      count: '',
      codeText: '发送验证码',
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'guidePage',
      });
    },
    go() {
      this.$store.commit('common/getCurrentPage', 'homePage');
      this.$router.push({
        name: 'homePage',
      });
    },
    switchLoginType() {
      this.loginType = this.loginType === 1 ? 2 : 1;
      this.pageTitle = this.loginType === 1 ? '验证码登陆' : '密码登陆';
      this.phoneErr = '';
    },
    // eslint-disable-next-line consistent-return
    login() {
      // eslint-disable-next-line no-return-assign
      if (this.tel === '') return (this.phoneErr = '手机号不能为空');
      this.phoneErr = '';
      if (this.loginType === 1) {
        // eslint-disable-next-line no-return-assign
        if (this.code === '') return (this.codeErr = '验证码不能为空');
        // eslint-disable-next-line no-return-assign
      } else if (this.password === '') { return (this.passwordErr = '密码不能为空'); }
      this.passwordErr = '';
      this.codeErr = '';
      this.showOverlay = true;
      login(this.tel, this.code)
        .then((res) => {
          console.log('login', res);
          if (res.data.code > 1) {
            this.$notify({
              type: 'warning',
              message: res.data.msg,
              duration: 2000,
            });
            this.showOverlay = false;
          } else {
            this.$store.commit('common/getToken', res.data.token);
            this.$store.commit('common/SET_TOKEN', res.data.token);
            getUserInfo(res.data.token)
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
          }
        })
        .catch((err) => {
          console.log('err', err);
          this.showOverlay = false;
        });
    },
    // eslint-disable-next-line consistent-return
    getCode() {
      // eslint-disable-next-line no-return-assign
      if (this.tel === '') return (this.phoneErr = '不能为空');
      if (this.checkPhone()) {
        const TIME_COUNT = 60;
        this.disabledBtn = true;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              // eslint-disable-next-line no-plusplus
              this.count--;
              this.codeText = `${this.count}s后重发`;
            } else {
              this.disabledBtn = false;

              clearInterval(this.timer);
              this.codeText = '重新发送验证码';
              this.timer = null;
            }
          }, 1000);
        }
        getVerifyCode(this.tel).then((res) => {
          console.log('code', res);
          this.$notify({
            type: 'success',
            message: '发送成功',
            duration: 1000,
          });
        });
      }
    },
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.phoneErr = '手机号码有误，请重填';
        return false;
      }
      this.phoneErr = '';
      return true;
    },
  },
};
</script>

<style lang="less">
.loginPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .logoImg {
    width: 146px;
    margin-top: 32px;
  }
  .inputList {
    padding: 30px;
    .codeText {
      border: 1px solid #d21e19;
      // padding: 0 5px;
      border-radius: 6px;
      color: #d21e19;
      cursor: pointer;
      margin: -2px 0;
      height: 24px;
    }
  }
  .fix {
    text-align: center;
    margin: auto;
    width: 300px;
    padding: 10px;
    background: url("../assets/btn_jinrupingtai@2x.png") no-repeat center;
    // background: rgba(197, 53, 42);
    color: white;
    font-size: 18px;
    // font-weight: 600;
    margin-bottom: 20px;
    &:hover {
      background: rgba(197, 53, 42, 0.5);
    }
  }
  .flex {
    display: flex;
  }
  .space-around {
    justify-content: space-around;
  }
  .space-between {
    justify-content: space-between;
  }
}
</style>
