<template>
  <div class="addLowIncomePersonPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="title">基本信息</div>
    <van-form ref="addLowIncomePersonForm" class="addLowIncomePersonInputTable">
      <van-field
        v-model="name"
        label="户主"
        placeholder="请输入户主"
        size="large"
        input-align="right"
        name="validator"
        required
        :error-message="nameErrText"
      />
      <van-field
        v-model="gender"
        readonly
        label="性别"
        placeholder="请选择"
        size="large"
        input-align="right"
        name="validator"
        @click="showPick(1)"
        required
        :error-message="genderErrText"
      />
      <van-field
        v-model="idNumber"
        label="身份证号码"
        placeholder="请输入身份证号码 "
        size="large"
        input-align="right"
        name="validator"
        required
        :error-message="idNumberErrText"
      />
      <van-field
        v-model="address"
        label="住址"
        placeholder="xx市xx县xx镇（区）xx村（必填） "
        size="large"
        input-align="right"
      />
      <van-field
        v-model="lowIncomeType"
        label="低保类型 "
        placeholder="请输入低保类型"
        size="large"
        input-align="right"
      />
      <van-field
        v-model="familyMonthIncome"
        label="家庭月中收入 "
        placeholder="请输入家庭月中收入"
        size="large"
        input-align="right"
      />
      <van-field
        v-model="contactInfo"
        label="联系方式 "
        placeholder="请输入联系方式"
        size="large"
        input-align="right"
      />
      <van-field
        readonly
        clickable
        label="保障起始年月"
        :value="activityDate"
        placeholder="请选择保障起始年月"
        size="large"
        input-align="right"
        @click="showPick(2)"
      />
      <van-field
        v-model="applyReason"
        type="textarea"
        rows="3"
        label="申请原因 "
        placeholder="请输入申请原因"
        size="large"
        input-align="right"
      />
    </van-form>
    <div style="padding:20px;">
      <div v-if="showEdit">
        <van-button style="width:100%;" type="warning" @click="edit">修改信息</van-button>
      </div>
      <div v-else>
        <van-button type="primary" style="width:100%;" @click="add">新建成员</van-button>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom" round :style="{ height: '50%' }">
      <div v-if="currentPick===1">
        <van-picker
          show-toolbar
          :columns="genderList"
          @cancel="showPicker = false"
          @confirm="onConfirmGenderList"
        />
      </div>
      <div v-else-if="currentPick===2">
        <van-datetime-picker
          v-model="beginDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showPicker = false"
          @confirm="onConfirmDate"
        />
      </div>
    </van-popup>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  addSubsistence,
  getSubsistenceDetail,
  editSubsistence,
} from '@/api/home';

export default {
  name: 'addLowIncomePerson',
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      activityDate: this.getDate(new Date()),
      genderList: ['男', '女'],
      showPicker: false,
      showOverlay: false,
      currentPick: '',
      name: '',
      gender: '',
      idNumber: '',
      address: '',
      lowIncomeType: '',
      familyMonthIncome: '',
      contactInfo: '',
      applyReason: '',
      beginDate: '',
      showEdit: false,
      nameErrText: '',
      genderErrText: '',
      idNumberErrText: '',
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token;
    },
    SocialStationId() {
      return this.$store.state.common.SocialStationId;
    },
  },
  watch: {
    name(vale) {
      if (vale === '') {
        this.nameErrText = '请输入';
      } else {
        this.nameErrText = '';
      }
    },
    gender(vale) {
      if (vale === '') {
        this.genderErrText = '请选择';
      } else {
        this.genderErrText = '';
      }
    },
    idNumber(vale) {
      if (vale === '') {
        this.idNumberErrText = '请输入';
      } else {
        this.idNumberErrText = '';
      }
    },
  },
  mounted() {
    if (this.$route.query.SubsistenceID) {
      this.showEdit = true;
      getSubsistenceDetail(this.$route.query.SubsistenceID).then((res) => {
        console.log('getSubsistenceDetail', res);
        this.name = res.data.subsistence.Name;
        this.gender = res.data.subsistence.Sex;
        this.idNumber = res.data.subsistence.IdNumber;
        this.address = res.data.subsistence.Address;
        this.lowIncomeType = res.data.subsistence.SubsistenceType;
        this.familyMonthIncome = res.data.subsistence.Income;
        this.contactInfo = res.data.subsistence.Contact;
        this.activityDate = res.data.subsistence.BeginDate;
        this.applyReason = res.data.subsistence.Reason;
      });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'socialWorkstationDetail',
      });
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    showPick(index) {
      this.showPicker = true;
      this.currentPick = index;
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
    onConfirmGenderList(value) {
      this.gender = value;
      this.showPicker = false;
    },
    onConfirmDate(value) {
      this.showPicker = false;
      this.activityDate = this.getDate(value);
    },
    checkData() {
      if (this.name === '') {
        this.nameErrText = '请输入';
        this.showOverlay = false;
        return false;
      }
      this.nameErrText = '';

      if (this.gender === '') {
        this.genderErrText = '请选择';
        this.showOverlay = false;
        return false;
      }
      this.genderErrText = '';

      if (this.idNumber === '') {
        this.idNumberErrText = '请输入';
        this.showOverlay = false;
        return false;
      }
      this.idNumberErrText = '';

      return true;
    },
    add() {
      this.showOverlay = true;
      const $this = this;
      if (!this.checkData()) return;
      addSubsistence({
        token: this.Token,
        socialStationId: this.SocialStationId,
        name: this.name,
        sex: this.gender,
        idNumber: this.idNumber,
        address: this.address, // 非必填
        subsistenceType: this.lowIncomeType, // 非必填
        income: this.familyMonthIncome, // 非必填
        contact: this.contactInfo, // 非必填
        beginDate: this.activityDate, // 非必填
        reason: this.applyReason, // 非必填
      })
        .then((res) => {
          console.log('addSubsistence', res);
          this.showOverlay = false;
          if (res.data.code > 1) {
            this.$notify({
              type: 'warning',
              message: res.data.error,
              duration: 500,
            });
          } else {
            this.$notify({
              type: 'success',
              message: res.data.msg,
              duration: 500,
            });
            setTimeout(() => {
              this.showOverlay = false;
              this.$router.push({
                name: 'socialWorkstationDetail',
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('addSubsistence', err);
          this.showOverlay = false;
        });
    },
    edit() {
      this.showOverlay = true;
      const $this = this;
      if (!this.checkData()) return;
      editSubsistence({
        token: this.Token,
        id: this.$route.query.SubsistenceID,
        socialStationId: this.SocialStationId,
        name: this.name,
        sex: this.gender,
        idNumber: this.idNumber,
        address: this.address, // 非必填
        subsistenceType: this.lowIncomeType, // 非必填
        income: this.familyMonthIncome, // 非必填
        contact: this.contactInfo, // 非必填
        beginDate: this.activityDate, // 非必填
        reason: this.applyReason, // 非必填
      })
        .then((res) => {
          console.log('editSubsistence', res);
          this.showOverlay = false;
          if (res.data.code > 1) {
            this.$notify({
              type: 'warning',
              message: res.data.error,
              duration: 500,
            });
          } else {
            this.$notify({
              type: 'success',
              message: res.data.msg,
              duration: 500,
            });
            setTimeout(() => {
              this.showOverlay = false;
              this.$router.push({
                name: 'socialWorkstationDetail',
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('addSubsistence', err);
          this.showOverlay = false;
        });
    },
  },
};
</script>

<style lang="less">
.addLowIncomePersonPage {
  .title {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  .addLowIncomePersonInputTable {
    .van-cell {
      padding: 15px 20px;
    }
    .van-field__label {
      width: 120px;
    }
    .pick {
      .van-cell__title {
        text-align: left;
        font-size: 16px;
        width: 120px;
      }
      .van-cell__value {
        text-align: left;
      }
    }
  }
}
</style>
