<template>
  <div class="userFeedbackPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">用户反馈</div>
      </template>
    </van-nav-bar>
    <van-field v-model="message" rows="6" autosize type="textarea" placeholder="输入您的意见或建议…" />
    <div class="submitBtn" @click="submitFun">
      <div>提交意见</div>
    </div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { feedback } from '@/api/home';

export default {
  name: 'userFeedbackPage',
  data() {
    return {
      message: '',
      showOverlay: false,
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
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'userCenterPage',
      });
    },
    submitFun() {
      this.showOverlay = true;
      feedback({
        token: this.Token,
        content: this.message,
      }).then((res) => {
        console.log('feedback', res);
        this.$notify({
          type: 'success',
          message: res.data.msg,
          duration: 500,
        });
        setTimeout(() => {
          this.showOverlay = false;
          this.$router.push({
            name: 'userCenterPage',
          });
        }, 1000);
      }).catch((err) => {
        console.log('feedback', err);
        this.showOverlay = false;
      });
    },
  },
};
</script>

<style lang="less">
.userFeedbackPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  /deep/.van-field__body {
    background: #f2f2f2;
    .van-field__control {
      padding: 10px;
    }
  }
  /deep/.van-cell::after {
    border-bottom: none;
  }
  .submitBtn {
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
    margin-top: 20px;
    &:hover {
      background: rgba(197, 53, 42, 0.5);
    }
  }
}
</style>
