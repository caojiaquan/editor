<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.init();
    $(".publish-main-list").each(function(index, item) {
      item.bFlag = false;
    });
    $("body").delegate(".publish-main-list", "click", function() {
      if (this.bFlag) {
        $(this).removeClass("select");
        $(this)
          .siblings(".publish-sub-list")
          .css("display", "none");
      } else {
        $(this).addClass("select");
        $(this)
          .siblings(".publish-sub-list")
          .css("display", "block");
      }
      this.bFlag = !this.bFlag;
    });
  },
  methods: {
    init() {
      $(".menu-options").on("click", function() {
        $(this)
          .addClass("selected")
          .siblings()
          .removeClass("selected");
      });
    }
  },
  watch: {
    /*监视路由变化*/
    $route: function() {}
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: PingFangSC-Regular;
  height: 100%;
}
.w1200,
.container-box,
.navlist,
.left,
.right,
.left-menu,
.right-menu,
.category-list {
  height: 100%;
}
.edit-tools {
  height: 280px;
  margin-bottom: 50px;
}
i {
  font-style: normal;
}
.w1200 {
  background: white;
  margin: 0 auto;
  width: 100%;
  position: relative;
}
.right {
  margin-top: 50px;
}
.left {
  position: fixed;
  top: 58px;
  left: 0;
  /* left: 50%; */
  /* margin-left: -640px; */
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background-color: #586174;
}
::-webkit-scrollbar-thumb {
  background-color: #7d8492;
}
</style>
