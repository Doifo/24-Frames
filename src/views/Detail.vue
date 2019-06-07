<template>
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="top" :style="picImg">
      <div class="detail">
        <p class="title">{{data.title}}</p>
        <p class="date">{{data.date}}</p>
        <p class="description">{{data.description}}</p>
      </div>
    </div>
    <div class="bottom">
      <article id="evaluation" ref="movieEval" v-html="compiledMarkdown"></article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global from "@/global/index.js";
import CommonHeader from "@/components/CommonHeader";
import marked from "marked";

export default {
  name: "Detail",
  data() {
    return {
      id: this.$route.params.id,
      data: {},
      loading: true
    };
  },

  computed: {
    picImg() {
      return "background-image:url('" + this.data.url + "')";
    },
    compiledMarkdown() {
      return marked(this.data.evaluation || "", { sanitize: true });
    }
  },
  components: {
    CommonHeader
  },
  updated() {
    let imgs = this.$refs.movieEval.getElementsByTagName("img");
    for (let img of imgs) {
      img.style.width = "100%";
      img.style.height = "auto";
    }
  },
  mounted() {
    axios.get(global.baseURL + "/findById?id=" + this.id).then(response => {
      this.data = response.data.data;
      this.loading = false;
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
.top {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}
.top::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.detail {
  width: 650px;
  z-index: 0;
  margin-left: 100px;
  bottom: 0;
  position: absolute;
  margin-bottom: 50px;
}

.description {
  color: #fff;
  font-size: 14px;
  font-family: 微软雅黑 Light;
  margin-bottom: 20px;
}

.date {
  color: #cea5c7;
  font-size: 20px;
  font-family: 微软雅黑 Light;
  margin-bottom: 10px;
}

.title {
  font-size: 30px;
  font-family: Segoe UI Black;
  color: #fff;
  margin-bottom: 10px;
}

.bottom {
  box-sizing: border-box;
  display: inline-block;
  background-color: #000;
  padding: 80px 100px 100px 100px;
}

#evaluation {
  color: #ccc;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  line-height: 1.8rem;
}

#evaluation p {
  line-height: 1.5rem;
}
</style>
