<template>
  <div  id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        index="1"
        targer="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/process' })
          }
        "
        >流程中心</el-menu-item
      >
      <el-menu-item
        index="2"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/organization' })
          }
        "
        >组织架构</el-menu-item
      >
      <el-menu-item
        index="3"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/systemmanagement' })
          }
        "
        >系统管理</el-menu-item
      >
      <el-menu-item
        index="4"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/processmanagement' })
          }
        "
        >流程管理</el-menu-item
      >
      <el-menu-item
        index="5"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/pages/personcenter' })
          }
        "
        >个人中心</el-menu-item
      >
      <el-menu-item
        index="6"
        target="_blank"
        @click="
          () => {
            this.$router.push({ path: '/' })
          }
        "
        >安全退出</el-menu-item
      >

      <div>
        <div>
          <img class="user-header" :src="userImg" :onerror="errorImg" /> 
          
       <span>{{ userName }}</span>
        <br />
        <span @click="showTime">{{ date }}</span>

        </div>
 
      
      </div>
 
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
 
export default {
  data() {
    return {
      theme_moel: false,
      errorImg: '',
      userName: 'lisa.zeng',
      userImg: '',
      date: '2020/12/04'
    };
  },
  created(){
      // this.showTime();
  },
  methods:{
       showTime() {
      var week = new Array(
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      );
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var second = date.getSeconds();
      this.date =
        year +
        "." +
        (month < 10 ? "0" + month : month) +
        "." +
        (day <10 ? "0" + day : day)+
        "" +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        (second < 10 ? "0" + second : second) +
        " " +
        (week[date.getDay() - 1] || "");
       }
  }
};
</script>
<style lang="less" scoped>
  
.user-header {
  background: #99647e;
  height: 40px;
  width: 52px;
  border-radius: 50%;
  margin-right: 0px;
  top: 4px;
  position: relative;
  border: 1px solid #dfdfdf;
}
.user {
  padding: 12px;
  position: relative;
  display: inline-block;
 
}
</style>
