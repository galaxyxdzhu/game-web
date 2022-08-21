<template>
  <div class="order-form">
    <div class="title">
      <van-icon name="cross" class="back-btn" @click="back" />
      <h3>请填写您的个人信息</h3>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="phone"
        label="电话"
        placeholder="电话"
        :rules="phoneRules"
      />
      <van-field
        v-model="platform"
        label="主机系统版本"
        placeholder="主机系统版本"
      />
      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { addOrder } from '@/api'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: '',
      platform: '',
      phone: '',
      phoneRules: [
        { required: true, message: '请填写电话' },
        {
          validator: this.phoneValidate,
          message: '请输入正确的手机号码'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['selectGames', 'flashSize', 'platform'])
  },
  methods: {
    ...mapActions({
      setSelectGames: 'setSelectGames',
      setFlashSize: 'setFlashSize'
    }),
    back() {
      this.$emit('back')
    },
    phoneValidate(val) {
      return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        val
      )
    },
    async onSubmit() {
      const ret = await addOrder({
        name: this.username,
        phone: this.phone,
        platform: this.platform,
        games: this.selectGames.map((item) => item.id).join(','),
        size: this.flashSize.normalSize
      })
      if (ret) {
        this.$emit('submitSuccess')
        this.username = ''
        this.phone = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-form {
  .title {
    height: 35px;
    width: 100%;
    background: #f2f2f2;
    line-height: 35px;
    text-align: center;
    position: relative;
    .back-btn {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 35px;
      line-height: 35px;
      font-size: 18px;
    }
  }
}
</style>