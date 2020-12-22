<template> 
    <div  >
      
      <div>帐号登陆</div>
      <div class="form-user" @keypress="loginPress($event)">
        <div class="item">
          <div class="f-text">
            <label>  用户名： </label>
          </div>
          <div class="f-input">
            <input
              type="text"
              v-focus
              v-model="userInfo.userName"
              placeholder="输入用户"
            />
          </div>
          <div class="f-remove" @click="userInfo.userName = ''">
            <Icon type="ios-close-circle" />
          </div>
        </div>
        <div class="item">
          <div class="f-text">
            <label>
              <Icon type="ios-lock" :size="20" />密&nbsp;&nbsp;&nbsp;码：
            </label>
          </div>
          <div class="f-input">
            <input
              type="password"
              v-focus
              v-model="userInfo.passWord"
              placeholder="输入密码"
            />
          </div>
          <div v-focus class="f-remove" @click="userInfo.passWord = ''">
            <Icon type="ios-close-circle" />
          </div>
        </div>
        <div class="item">
          <div class="f-text">
            <label>
              <Icon type="md-images" v-focus :size="20" />验证码：
            </label>
          </div>
          <div class="f-input">
            <input
              v-focus
              type="text"
              v-model="userInfo.verificationCode"
              placeholder="输入验证码"
            />
          </div>
          <div
            class="code"
            @click="
              () => {
                getVierificationCode();
              }
            "
          >
            <img v-show="codeImgSrc != ''" :src="codeImgSrc" />
          </div>
        </div>
      </div>
      <div style="loging-btn">
        <Button
          size="large"
          :loading="loading"
          type="info"
          @click="login"
          long
        >
          <span v-if="!loading">登陆</span>
          <span v-else>正在登陆...</span>
        </Button>
      </div>
      <div class="action">
        <a @click="() => {}">注册</a>
        <a @click="() => {}">忘记密码</a>
      </div>
    </div> 
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      codeImgSrc: "",
      userInfo: {
        userName: "",
        passWord: "",
        verificationCode: ""
      }
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    this.getVierificationCode();
  },
  methods: {
   
    loginPress(event) {
      if (event.keyCode == 13) {
        this.login();
      }
    },
    login() {
      if (this.userInfo.userName == "" || this.userInfo.userName.trim() == "")
        return this.$Message.error("请输入用户名");
      if (this.userInfo.passWord == "" || this.userInfo.passWord.trim() == "")
        return this.$Message.error("请输入密码");
      if (
        this.userInfo.verificationCode == "" ||
        this.userInfo.verificationCode.trim() == ""
      )
        return this.$Message.error("请输入验证码");
      this.loading = true;
      this.http
        .post("/api/user/login", this.userInfo, "正在登陆....")
        .then(result => {
          if (!result.status) {
            this.loading = false;
            this.getVierificationCode();
            return this.$Message.error(result.message);
          }
          this.$Message.info("登陆成功,正在跳转!");
          this.$store.commit("setUserInfo", result.data);
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>
 
 