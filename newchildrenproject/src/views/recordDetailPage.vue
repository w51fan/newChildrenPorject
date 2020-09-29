<template>
  <div class="recordDetailPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">走访记录详情</div>
      </template>
    </van-nav-bar>
    <div>
      <van-cell-group>
        <van-field
          readonly
          clickable
          label="走访时间"
          :value="activityDate"
          placeholder="请输入走访时间"
          @click="showPick()"
          name="validator"
          required
          :error-message="activityDateErrText"
        />
        <van-field
          v-model="childrenName"
          readonly
          required
          label="儿童姓名"
          placeholder="请输入儿童姓名"
          :error-message="childrenNameErrText"
        />
        <van-field
          v-model="phone"
          readonly
          required
          label="联系电话"
          placeholder="请输入联系电话"
          :error-message="phoneErrText"
        />
        <van-field
          v-model="address"
          readonly
          required
          label="儿童家庭地址"
          placeholder="请输入儿童家庭地址"
          :error-message="addressErrText"
        />
        <van-field
          v-model="objective"
          readonly
          label="走访目的"
          placeholder="请输入走访目的"
        />
      </van-cell-group>
    </div>
    <div class="submitTitle">走访过程简要记录：</div>
    <van-field
      v-model="recordMessage"
      readonly
      rows="6"
      autosize
      type="textarea"
      placeholder="输入您的意见或建议…"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      round
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
      />
    </van-popup>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getVisitDetail } from '@/api/home';

export default {
  name: 'recordDetailPage',
  data() {
    return {
      childrenName: '',
      phone: '',
      address: '',
      objective: '',
      recordMessage: '',
      // activityDate: this.getDate(new Date()),
      activityDate: '',
      showPicker: false,
      showOverlay: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      activityDateErrText: '',
      childrenNameErrText: '',
      phoneErrText: '',
      addressErrText: '',
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token
        ? this.$store.state.common.Token
        : window.localStorage.getItem('Token');
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
  },
  mounted() {
    getVisitDetail(this.$route.query.id)
      .then((res) => {
        console.log('getVisitDetail', res);
        // this.childrenName = res.data.visit.Name;
        this.$set(this, 'childrenName', res.data.visit.Name);
        this.phone = res.data.visit.Phone;
        this.address = res.data.visit.Address;
        this.objective = res.data.visit.Objective;
        this.recordMessage = res.data.visit.Record;
        this.activityDate = this.getDate(res.data.visit.CreateTime);
      })
      .catch((err) => {
        console.log('getVisitDetail', err);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'myRecordsListPage',
      });
    },
    getDate(date) {
      const activityDate = new Date(date);
      const year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      let day = activityDate.getDate();
      if (day < 10) day = `0${day}`;
      return `${year}-${month}-${day}`;
    },
    showPick() {
      this.showPicker = !this.showPicker;
      // this.currentPick = index;
    },
    onConfirmDate(value) {
      this.activityDate = this.getDate(value);
      this.showPicker = false;
    },
  },
};
</script>

<style lang="less">
.recordDetailPage {
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
  .submitTitle {
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    padding: 10px 16px;
    color: #646566;
  }
  .submitBtn {
    text-align: center;
    margin: auto;
    width: 240px;
    padding: 10px 20px;
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
