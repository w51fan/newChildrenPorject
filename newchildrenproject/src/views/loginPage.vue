<template>
  <div class="loginPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #title>
        <div class="navTitle">验证码登陆</div>
      </template>
    </van-nav-bar>
    <img class="logoImg" src="../assets/img_logo_denglu@2x.png" alt />
    <van-form class="inputList">
      <van-field
        v-model="phone"
        placeholder="请输入手机号码"
        input-align="left"
        :rules="[{ required: true, message: '请输入手机号码' }]"
      >
        <template #left-icon>
          <van-icon name="phone" />
        </template>
      </van-field>
      <van-field
        v-model="verifyCode"
        placeholder="请输入验证码"
        input-align="left"
        :rules="[{ required: true, message: '请输入验证码' }]"
        v-if="loginType===1"
      >
        <template #left-icon>
          <van-icon name="lock" />
        </template>
        <template #right-icon>
          <div class="codeText">获取验证码</div>
        </template>
      </van-field>
      <van-field
        v-model="password"
        placeholder="请输入密码"
        input-align="left"
        :rules="[{ required: true, message: '请输入密码' }]"
        v-else
      >
        <template #left-icon>
          <van-icon name="lock" />
        </template>
      </van-field>
    </van-form>
    <div class="fix" @click="go">
      <div>立 即 登 录</div>
    </div>
    <div class="flex space-between">
      <div v-if="loginType===1" style="padding:0 45px;color:#9B9B9B;" @click="switchLoginType">密码登录</div>
      <div v-else style="padding:0 45px;color:#9B9B9B;" @click="switchLoginType">验证码登录</div>
      <div style="padding:0 45px;color:#9B9B9B;">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      verifyCode: "",
      phone: "",
      loginType: 2,
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "guidePage"
      });
    },
    go() {
      this.$store.commit("common/getCurrentPage", "homePage");
      this.$router.push({
        name: "homePage"
      });
    },
    switchLoginType() {
      this.loginType = this.loginType === 1 ? 2 : 1;
    }
  }
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
      padding: 0 5px;
      border-radius: 6px;
      color: #d21e19;
      cursor: pointer;
      margin: -2px 0;
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
