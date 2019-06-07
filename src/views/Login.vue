<template>
  <el-row id="main-container">
    <el-col :span="10" id="background">
      <img src="/static/homepage.jpg" alt>
    </el-col>
    <el-col :span="14" id="login-reg">
      <p id="title">24Frames</p>
      <p class="sentence">You know some birds are not meant to be caged</p>
      <p class="sentence">their feathers are just too bright</p>
      <p id="button-p">
        <a class="login-button" :class="{btnactivate:loginActivate}" @click="activateLogin">登录</a>
        <a class="login-button" :class="{btnactivate:regActivate}" @click="activateReg">注册</a>
      </p>
      <div id="login" v-show="loginActivate">
        <p>
          <el-tooltip v-model="emailLogin" placement="right" content="请输入邮箱">
            <input type="text" class="input" maxlength="30" placeholder="邮箱" v-model="emailL">
          </el-tooltip>
        </p>
        <p>
          <el-tooltip v-model="passwordLogin" placement="right" content="请输入密码">
            <input
              type="password"
              class="input"
              maxlength="20"
              placeholder="密码(由数字或英文字母组成，至少6位)"
              v-model="passwordL"
            >
          </el-tooltip>
        </p>
        <p>
          <button v-loading="loading" class="button-normal" @click="login">登录</button>
        </p>
      </div>

      <div id="register" v-show="regActivate">
        <p>
          <el-tooltip v-model="usernameReg" placement="right" content="请输入用户名">
            <input type="text" class="input" maxlength="10" placeholder="用户名" v-model="usernameR">
          </el-tooltip>
        </p>
        <p>
          <el-tooltip v-model="emailReg" placement="right" content="请输入邮箱">
            <input type="text" class="input" maxlength="30" placeholder="邮箱" v-model="emailR">
          </el-tooltip>
        </p>
        <p>
          <el-tooltip v-model="passwordReg" placement="right" content="请输入密码">
            <input
              type="password"
              class="input"
              maxlength="20"
              placeholder="密码(由数字或英文字母组成，至少6位)"
              v-model="passwordR"
            >
          </el-tooltip>
        </p>
        <p>
          <button v-loading="Rloading" class="button-normal" @click="register">注册</button>
        </p>
      </div>
    </el-col>
  </el-row>
</template>


<script>
import axios from "axios";
import global from "@/global/index.js";

export default {
  name: "Homepage",
  data() {
    return {
      loading: false,
      Rloading: false,

      loginActivate: true,
      regActivate: false,
      emailLogin: false,
      passwordLogin: false,
      emailReg: false,
      usernameReg: false,
      passwordReg: false,

      emailL: "",
      passwordL: "",
      usernameR: "",
      emailR: "",
      passwordR: "",

      emailRegExp: new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
      pwdRegExp: new RegExp(/^[A-Za-z0-9]+$/)
    };
  },
  methods: {
    activateLogin() {
      this.loginActivate = true;
      this.regActivate = false;
    },
    activateReg() {
      this.loginActivate = false;
      this.regActivate = true;
    },
    login() {
      if (this.emailL == "" || !this.emailRegExp.test(this.emailL)) {
        this.emailLogin = true;
        return;
      } else if (
        this.passwordL == "" ||
        !this.pwdRegExp.test(this.passwordL) ||
        this.passwordL.length < 6
      ) {
        this.passwordLogin = true;
        return;
      } else {
        this.loading = true;
        let param = new URLSearchParams();
        param.append("email", this.emailL);
        param.append("password", this.passwordL);
        axios
          .post(global.baseURL + "/login", param)
          .then(response => {
            console.log(response.data)
            if (response.data.message == "User Not Existed") {
              this.$message.error("用户名或密码错误");
              this.loading = false;
            } else if (response.data.message == "Login Succeed") {
              this.$message.success("登录成功");
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("username", response.data.username);
              localStorage.setItem("email", response.data.email);

              this.$router.push("/homepage");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    register() {
      if (this.usernameR == "") {
        this.usernameReg = true;
        return;
      } else if (this.emailR == "" || !this.emailRegExp.test(this.emailR)) {
        this.emailReg = true;
        return;
      } else if (
        this.passwordR == "" ||
        !this.pwdRegExp.test(this.passwordR) ||
        this.passwordR.length < 6
      ) {
        this.passwordReg = true;
        return;
      } else {
        this.Rloading = true;
        let param = new URLSearchParams();
        param.append("username", this.usernameR);
        param.append("email", this.emailR);
        param.append("password", this.passwordR);
        axios
          .post(global.baseURL + "/register", param)
          .then(response => {
            this.Rloading = false;
            if (response.data.message == 'Register Succeed') {
              this.$message.success("注册成功");
              this.loginActivate = true;
              this.regActivate = false;
            } else if (response.data.message == "User Existed") {
              this.$message.error("该用户已存在");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login-reg {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  #title {
    color: #026b72;
    font-size: 40px;
    font-family: Bahnschrift Condensed;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .sentence {
    margin: 3px auto;
    font-size: 13px;
    font-weight: 100;
  }
}

.login-button {
  color: #000;
  border: none;
  background: none;
  padding: 0;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 10px;
  font-weight: 300;
  margin-right: 20px;
}

.login-button:hover {
  cursor: pointer;
}

.btnactivate {
  border-bottom: 2px solid #0092fe;
  font-weight: bold;
}

#button-p {
  margin-top: 20px;
  margin-bottom: 30px;
}

.input {
  width: 300px;
  height: 22px;
  padding: 9px 20px;
  border-radius: 6px;
  border: none;
  background: #f7f7f7;
  color: #000;
}

.input:hover {
  background: #eee;
}

.input:focus {
  outline: 0;
  background: #eee;
}

p {
  width: 350px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.button-normal {
  background: #4a91a3;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  padding: 10px 30px;
  cursor: pointer;
}

.button-normal:active {
  background: #38646d;
}

.button-normal:focus {
  outline: 0;
}

@media screen and (max-width: 900px) {
  #login-reg {
    width: 100%;
  }

  #background {
    width: 0;
  }

  #background img {
    width: 0;
  }
}

#background {
  box-sizing: border-box;
  overflow: hidden;

  img {
    height: 100vh;
    width: auto;
    vertical-align: bottom;
  }
}
</style>
