<template>
  <div id="out-container">
    <div id="upload" class="blur">
      <common-header @showMenu="toShowMenu"></common-header>

      <el-tabs
        class="tabs"
        v-model="activeName"
        type="border-card"
        v-if="!submitted"
        v-loading="loading"
      >
        <el-tab-pane label="信息" name="first" class="base">
          <el-input v-model="title" maxlength="20" show-word-limit style="margin-bottom:20px;">
            <template slot="prepend">标题</template>
          </el-input>

          <el-input
            v-model="desc"
            type="textarea"
            placeholder="简单描述一下你的推荐吧..."
            class="textarea"
            :rows="10"
            maxlength="100"
            show-word-limit
            style="margin-bottom:20px;"
          ></el-input>

          <el-upload
            ref="upload"
            action
            class="uploadPic"
            list-type="picture"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :auto-upload="false"
            :limit="1"
            :multiple="false"
            :http-request="uploadImg"
            v-show="showUpload"
            :file-list="fileList"
          >
            <el-button size="small" ref="uploadBtn">选择封面</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="推文" name="second">
          <mavon-editor
            ref="mavonEditor"
            v-model="evaluation"
            class="mavon-editor"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
        </el-tab-pane>
      </el-tabs>

      <p class="button-p" v-if="!submitted">
        <button class="submit-btn" @click="submitUpload">发表</button>
      </p>

      <div v-if="submitted">
        <div class="success-box">
          <img src="/static/yes.png" alt class="success-icon"> 推荐成功
        </div>
        <p style="text-align:center">
          <button @click="submitAgain" class="submit-btn">发表下一篇</button>
        </p>
      </div>
    </div>

    <header-menu ref="menu"></header-menu>
  </div>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import HeaderMenu from "@/components/HeaderMenu";
import axios from "axios";
import global from "@/global/index.js";

export default {
  name: "Upload",
  data() {
    return {
      activeName: "first",
      fileList: [],
      evaluation: "",
      showUpload: true,
      title: "",
      desc: "",
      submitted: false,
      loading: false,
      img_file: {}
    };
  },
  methods: {
    toShowMenu() {
      this.$refs.menu.showMenu();
    },
    $imgAdd(pos, $file) {
      // 缓存图片信息
      // console.log(pos, $file);
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadImg(params) {
      let formdata = new FormData();
      this.loading = true;
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img]);
      }

      axios
        .post(
          global.baseURL +
            "/upload-article-pic?email=" +
            localStorage.email +
            "&token=" +
            localStorage.token,
          formdata
        )
        .then(response => {
          console.log(response.data)
          if (response.data.message == "checkUser error") {
            this.$message.error("登录状态过期，请重新登录");
            this.$router.push("/");
          }
          let data = response.data.data;
          for (var key in data) {
            this.$refs.mavonEditor.$img2Url(key, data[key]);
          }
          return "success";
        })
        .then(data => {
          this.upload(params);
        })
    },
    handleChange(file, fileList) {
      this.fileList.push(file);
    },
    handleRemove(file, fileList) {
      this.fileList.pop();
    },
    submitUpload() {
      if (
        this.title == "" ||
        this.desc == "" ||
        this.fileList.length == 0 ||
        this.evaluation == ""
      ) {
        this.$message.warning("请完善发表内容");
        return;
      }
      this.$refs.upload.submit();
    },
    submitAgain() {
      this.$router.go(0);
    },
    upload(params) {
      let date = new Date(Date.now());
      let today =
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

      let param = new FormData();
      param.append("pic", params.file);
      param.append("title", this.title);
      param.append("description", this.desc);
      param.append("evaluation", this.evaluation);
      param.append("username", localStorage.username);
      param.append("email", localStorage.email);
      param.append("date", today);

      axios
        .post(
          global.baseURL +
            "/upload?email=" +
            localStorage.email +
            "&token=" +
            localStorage.token,
          param
        )
        .then(response => {
          console.log(response.data);
          if (response.data.message == "Upload Succeed") {
            this.submitted = true;
            this.loading = false;
          } else if (response.data.message == "checkUser error") {
            this.$message.error("登录状态过期，请重新登录");
            this.$router.push("/");
          }
        })
    }
  },
  components: {
    CommonHeader,
    HeaderMenu
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#out-container {
  position: relative;
}
#upload {
  background: #bccece;
  height: 100vh;
  overflow: auto;

  *:focus {
    outline: 0;
  }

  .base {
    display: flex;
    flex-direction: column;
  }

  .tabs {
    margin: 0 auto;
    height: 580px;
    border-radius: 4px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 20px;
  }

  .mavon-editor {
    height: 480px;
  }

  .button-p {
    margin: 0 auto;
    text-align: right;
    margin-top: 20px;
    margin-right: 50px;
  }

  .submit-btn {
    border: none;
    background: none;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    opacity: 0.6;
    font-size: 18px;
  }

  .submit-btn:hover {
    opacity: 1;
  }

  .success-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .success-box {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

  .is-active {
    color: #bccece;
    font-weight: bold;
  }

  .el-tabs__item:hover {
    color: #bccece;
  }

  .el-tabs,
  .el-tabs__nav-scroll {
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
