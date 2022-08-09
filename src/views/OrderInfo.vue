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
        :rules="[{ required: true, message: '请填写电话' }]"
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
import { Notify } from 'vant'
import { addOrder } from '@/api'
export default {
  props: {
    games: {
      type: Array,
      require: true
    },
    size: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      username: '',
      phone: ''
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    async onSubmit() {
      const ret = await addOrder({
        name: this.username,
        phone: this.phone,
        games: this.games.map((item) => item.id).join(','),
        size: this.size
      })
      if (ret) {
        this.$emit('submitSuccess')
        Notify({ type: 'success', message: '提交成功' })
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