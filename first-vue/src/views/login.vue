<template>
  <div>
    <div>账号登陆</div>
    <div>
    <label>
        <el-Icon type="ios-people" :size="20" />用户名：
    </label> 
      <input type="text" v-model="userInfo.userName" placeholder="输入用户" />
    </div>
    <div>
       <label>
          <el-Icon type="ios-lock" :size="25" />密码：
        </label>
      <input type="text" v-model="userInfo.passWord" placeholder="输入密码" />
    </div>
    <div>
      <button @click="login">
        <span>登陆</span>
      </button>
    </div>
    <div>
      <a href="#">注册</a>
      <a>忘记密码</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        userName: "",
        passWord: ""
      }
    };
  },
  methods: {
    login() {
      if (this.userInfo.userName == "" || this.userInfo.userName.trim() == "")
        return this.$message.error("请输入用户名");

      if (this.userInfo.passWord == "" || this.userInfo.passWord.trim() == "")
        return this.$message.error("请输入密码");
      //校验用户是否正确
      this.$message.info("登陆成功，正在跳转！");
      this.$router.push({ path: "/views" });
    }
  }
};
</script>
