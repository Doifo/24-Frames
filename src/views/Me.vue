<template>
  <div id="me">
    <div id="container" class="blur" v-loading="loading">
      <div id="me-top-container">
        <common-header @showMenu="toShowMenu"></common-header>
        <p id="greet">Hey , {{username}}</p>
      </div>
      <div id="me-data-container">
        <div id="data-container" v-show="dataCont">
          <el-row
            v-for="(data,index) in myUploads"
            :key="data.id"
            :class=" index%2 == 0 ? 'data-box-left' : 'data-box-right' "
          >
            <el-col :span="10" class="data-pic-box" :style="imgUrl(data.url)" >
              
            </el-col>
            <el-col :span="14" class="data-infor-box">
              <p class="title"><router-link :to="'/detail/'+data._id" target='_blank' style="cursor:pointer;">{{data.title}}</router-link></p>
              <p class="desc">{{data.description}}</p>
            </el-col>
          </el-row>
        </div>

        <div id="no-data-container" v-show="!dataCont">
          <p class="nothing">
            <img src="/static/nothing.png"> 您还没有进行过分享
          </p>
          <p style="font-weight:bold;cursor:pointer;">
            <router-link to="/upload">前去分享</router-link>
          </p>
        </div>
      </div>
    </div>

    <header-menu ref="menu"></header-menu>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import CommonHeader from "@/components/CommonHeader";
import axios from "axios";
import global from "@/global/index.js";

export default {
  name: "",
  data() {
    return {
      myUploads: [],
      loading: false,
      dataCont: true,
      username: localStorage.username
    };
  },
  components: {
    HeaderMenu,
    CommonHeader
  },
  methods: {
    toShowMenu() {
      this.$refs.menu.showMenu();
    },
    detail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  computed: {
    imgUrl() {
      return function(url) {
        return "background-image:url('" + url + "')";
      };
    },
    isLeft() {
      return function(index) {
        return index % 2 == 0;
      };
    }
  },
  mounted() {
    this.loading = true
    axios
      .get(
        global.baseURL +
          "/findByEmail?email=" +
          localStorage.email +
          "&token=" +
          localStorage.token
      )
      .then(response => {
        if(response.data.message == 'checkUser error'){
          this.$message.error('登录状态过期，请重新登录')
          this.$router.push('/')
        }
        this.myUploads = response.data.data;
        this.loading = false;
        if (this.myUploads.length == 0) {
          this.dataCont = false;
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  outline: none;
  color: #38646f;
}

#greet {
  color: #fff;
  font-size: 50px;
  text-align: center;
  margin-top: 150px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#me {
  position: relative;
}

#container {
  height: 100vh;
  overflow: auto;
  
  background-color: #bccece;
}

#container::-webkit-scrollbar {
  width: 5px;
  height: 1px;
}
#container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #38646f;
}
#container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

#me-top-container {
  background-image: url("/static/me.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 600px;
}

#me-data-container {
  text-align: center;
}

#data-container {
  border-radius: 2px;
  width: 70%;
  background-color: #fff;
  text-align: left;
  position: relative;
  top: -100px;
  margin: 0 auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

#no-data-container {
  border-radius: 2px;
  width: 70%;
  background-color: #fff;
  height: 200px;
  position: relative;
  top: -100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #38646f;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}

.data-box-left {
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
}

.data-box-right {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 50px;
}

.data-pic-box {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  position: relative;
}

.data-pic-box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.data-pic-box:hover::before {
  background: rgba(0, 0, 0, 0);
}

.data-infor-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  padding-left: 70px;
  padding-right: 70px;
  font-family: PMingLiU;
}

.title {
  font-size: 23px;
  color: #999;
  margin-bottom: 10px;
  
}

.date {
  font-size: 15px;
}

.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  font-size: 13px;
}

.nothing {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.nothing img {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
</style>
