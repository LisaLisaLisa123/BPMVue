<template>
  <div class="user-info">
    <div class="left">
      <!-- <img class="header-img" :src="userinfo.img" :onerror="errorImg"/> -->
      <div class="text">
        <p class="name">
          <span>姓名</span>
        </p>
        <p class="date">
          <span>注册日期</span>
        </p>
        <p>
          <button
            style="padding:3px 16px;"
            @click="modifyImg"
            type="info"
            size="small"
          >
            修改头像
          </button>
        </p>
      </div>
      <el-divider style="width: 320px;">信息绑定</el-divider>
     
      <el-card>
        <div slot="header">
          <div>
            <span>手机：</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="success"
              @click="modifyPhone"
              icon="el-icon-phone"
              >修改手机</el-button
            >
          </div>

          <div>
            <span>邮箱：</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="info"
              @click="modifyEmail"
              icon="el-icon-message"
              >绑定邮箱</el-button
            >
          </div>
          <div style="padding: 17px;">
            <Button
              type="error"
              @click="dialogFormVisible = true"
              size="large"
              icon="md-lock"
              long
              >修改密码</Button
            >
          </div>
        </div>
      </el-card>
    </div>

    <div class="right">
      <el-form ref="form" :model="form" label-width="80px">
        <el-divider style="width: 320px;">个人信息</el-divider>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    modifyImg() {
      this.$message.info('修改头像')
    },
    modifyEmail() {
      this.$message.info('修改邮箱')
    },
    modifyPhone() {
      this.$message.info('修改电话')
    },

    modifyInfo() {
      this.$message.info('修改个人信息')
    }
  }
}
</script>
<style lang="less" scoped>
.user-info {
  box-shadow: rgb(214, 214, 214) 0px 4px 21px;
  position: absolute;
  transform: translateY(-40%);
  top: 40%;
  position: relative;
  margin: 0 auto;
  left: 0;
  width: 895px;
  right: 0;
  text-align: center;
  padding: 0px;
  .text {
    padding: 5px;
    .name {
      font-weight: bolder;
      font-size: 15px;
      font-weight: 900;
    }
    > p {
      padding-top: 5px;
    }
  }
  > div {
    float: left;
    padding-top: 10px;
  }
  .left {
    width: 200px;
    border-right: 1px solid #eee;
  }
  .right {
    padding-left: 30px;
    width: 570px;
  }
}
</style>
