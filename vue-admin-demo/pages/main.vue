<template>
  <div class="bg-[#f5f7f9] h-screen w-screen overflow-auto">
    <nav-top></nav-top>
    <div class="el-main content-box content-view-main container m-auto">
      <nav-breadcrumb
        :class="{ 'wrap-breadcrumb': isWrapBreadcrumb }"
      ></nav-breadcrumb>
      <component
        class="content-main"
        v-bind:is="childView"
        v-if="!routeMeta.keepAlive"
      ></component>
    </div>
  </div>
</template>

<script>
const { ref, reactive, computed, onMounted, onUnmounted, watch } = vue;
const { useRouter, useStore, useCache, useWindowSize, useWindowSizeRealTime } =
  hook;
export default {
  components: {
    navTop: VueRun("components/demo-nav.vue"),
    navBreadcrumb: VueRun("components/breadcrumb.vue"),
  },
  setup(prop, ctx) {
    const isWrapBreadcrumb = ref(false);
    const routeMeta = computed(() => ctx.root.$route.meta);
    function getRouter(router, cPath) {
      for (let i in router) {
        if (!router.hasOwnProperty(i)) continue;
        if (
          router[i]["path"] === cPath &&
          router[i].hasOwnProperty("component")
        ) {
          return router[i];
        }
        if (router[i].hasOwnProperty("children") && router[i]["children"]) {
          let c = getRouter(router[i]["children"], cPath);
          if (c) {
            return c;
          }
        }
      }
    }
    const childView = computed(() => {
      let router =
          useRouter(ctx)["router"]["options"]["routes"][2]["children"] || [],
        cPath = useRouter(ctx).route.path || "",
        cRouter = getRouter(router, cPath) || {};
      if (
        JSON.stringify(cRouter) !== "{}" &&
        cRouter.hasOwnProperty("component") &&
        cRouter.hasOwnProperty("meta")
      ) {
        return cRouter.component;
      } else {
        if (["/login"].indexOf(cPath) === -1) {
          useTip().message("warning", "权限不足");
        }
      }
    });
    return {
      routeMeta,
      childView,
      isWrapBreadcrumb,
    };
  },
};
</script>

<style>
.main_scrollbar {
  min-height: calc(100vh - 50px);
}

.el-main.content-box.content-view-main {
  padding: 15px 15px 10px 15px;
}

.header {
  color: #ffffff;
  line-height: 60px;
  padding: 0 10px;
  z-index: 9;
}

@-webkit-keyframes opacity {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes opacity {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.8;
  }
}

.nav-left.is-collapse .el-menu.el-menu--inline {
  display: none;
}

.nav-left {
  will-change: auto;
}

.nav-left.is-collapse {
  width: 74px !important;
}

.nav-left.not-collapse {
  width: 220px !important;
}

.aside-nav-bg {
  -webkit-transition: all 0.2s linear 0s !important;
  transition: all 0.2s linear 0s !important;
}

.mask-layer {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9000;
  display: none !important;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
}

:focus {
  outline: 0; /* Not friendly */
}

::-webkit-inner-spin-button {
  display: none;
}

svg[hidden] {
  display: none;
}

.iconfont,
[class^="icon-"],
[class*=" icon-"] {
  font-family: "font_family", serif !important;
  font-size: inherit;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-submenu [class^="icon-"],
.el-menu-item [class^="icon-"] {
  vertical-align: middle;
  margin-right: 10px;
  width: 24px;
  text-align: center;
  font-size: 25px;
}

html {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.float-clear:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.text {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.tap {
  pointer-events: auto;
  cursor: pointer;
}

.text-nowrap {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

body,
a {
  color: rgb(53, 53, 53);
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
dl,
dd,
fieldset,
textarea {
  margin: 0;
}

img {
  max-width: 100%;
}

[class^="czs-"],
[class^="icon-"] {
  display: inline-block;
}

.loading-group {
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #f5f7f9;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100000;
  -webkit-transition: opacity 1s;
  transition: opacity 1s;
}

.loading-group .title {
  color: #495060;
  font-weight: bold;
  font-size: 14px;
  margin-top: 50px;
  margin-bottom: 10px;
  letter-spacing: 0.2em;
}

.loading-group .sub-title {
  color: #495060;
  font-size: 10px;
}

.loading-group .sk-cube-grid {
  width: 30px;
  height: 30px;
}

.loading-group .sk-cube-grid .sk-cube {
  width: 10px;
  height: 10px;
  background-color: #495060;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
  border-top-left-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  border-top-right-radius: 4px;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  border-bottom-left-radius: 4px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  border-bottom-right-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }

  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }

  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.el-main::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #cccccc;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #999999;
}

::-webkit-scrollbar-thumb:active {
  background-color: #cccccc;
}

.content-container {
  position: relative;
  height: calc(100vh - 60px);
  -webkit-box-flex: 1;
  -ms-flex: auto;
  flex: auto;
  border-radius: 10px 10px 0 0;
  background-color: #f5f7f9;
  margin-right: 4px;
}

.el-menu--vertical .el-menu--popup.el-menu--popup-right-start {
  min-width: 100px;
}

.el-button {
  font-weight: normal;
}

.el-button.min {
  min-width: 98px;
}

.el-button.block {
  width: 100%;
}

.el-textarea__inner {
  padding: 15px;
}

.el-pagination {
  font-weight: normal;
}

.el-popover p {
  margin: 10px;
  text-align: center;
}

.el-popover > div {
  text-align: center;
}

.el-form-item__content {
  text-align: left;
}

.tip-top.el-form--inline .el-button + span:not(.class) {
  margin-left: 10px;
}

.el-button [class*="czs-"] + span,
.el-button [class^="icon-"] + span,
i[class^="icon-"] + span {
  margin-left: 5px;
}

/* color #2c6eb1 */
.el-submenu.is-active .el-submenu__title,
.el-submenu.is-active .el-submenu__title i {
  color: #ffffff !important;
}

.el-menu-item i,
.el-submenu__title i {
  color: #b3becd;
}

.btns-operating > .el-button + .el-button {
  margin-left: 0;
}

.el-table__empty-block {
  line-height: 60px;
}

.tip-page .panel-left {
  position: absolute;
  left: 0;
}

.el-tooltip__popper.is-light {
  border-color: rgb(228, 232, 235);
}

.el-message-box {
  margin-top: -10%;
}

.el-notification.custom-notify-class .el-notification__content {
  margin-top: 2px;
  padding-right: 10px;
}

.el-notification.custom-notify-class.right {
  width: auto;
}

.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.24);
}

.el-input__suffix {
  overflow: hidden;
}

/*UI END*/
#main {
  min-height: 100%;
  min-height: 100vh;
  min-width: 320px;
}

.content-box {
  padding: 10px 20px 20px 5px;
  /* overflow-y: auto; */
  /* overflow: hidden; */
  position: relative;
}

.footer {
  text-align: center;
}

.panel {
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  padding: 14px 20px;
}

.view-title {
  font-size: 26px;
  font-weight: 400;
  line-height: 1;
  min-height: 35px;
  position: relative;
}

.view-title.float-clear > span:first-child {
  display: none;
}

.view-title.no {
  margin-bottom: 0;
}

.view-title > span {
  vertical-align: middle;
  margin-bottom: 10px;
  display: inline-block;
}

.view-title-right {
  float: right;
  min-height: 35px;
  overflow: auto;
  white-space: nowrap;
  max-width: 100%;
}

.view-title-right.view-title-right__alone {
  margin: 30px 0 5px;
}

.view-title-right .el-form--inline .el-form-item__content {
  line-height: 14px;
}

.view-title-right .el-form--inline .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}

.view-title-right .el-form--inline .el-form-item ~ .el-form-item {
  margin-left: 10px;
}

.view-title-right .el-form--inline + .el-form--inline {
  margin-top: 5px;
}

.popover-form {
  padding: 0 20px;
}

.popover-form .el-popover__title {
  margin-bottom: 8px;
  font-size: 18px;
}

.popover-form .el-form-item {
  margin-bottom: 16px;
}

.popover-form .el-form-item .el-form-item__error {
  padding-top: 1px;
}

.popover-form .el-form-item__label {
  padding: 0;
  line-height: 20px;
}

.dialog-view .el-dialog--center {
  min-width: 318px;
  max-width: 500px;
}

.tip-top {
  text-align: right;
  position: relative;
  /* overflow: hidden; */
}

.tip-page {
  padding: 10px 0 0;
  text-align: center;
  position: relative;
}

.tip-area {
  font-size: 12px;
  color: rgb(153, 153, 153);
  padding-bottom: 10px;
}

.btns-operating .el-button {
  margin-right: 6px;
}

.btns-operating .el-button + span:not(.class) {
  display: inline-block;
}

.center {
  text-align: center;
}

.text-grey {
  color: #c0c4cc;
}

/* 竖排表单 移除 */
.form-vertical {
  padding: 10px 10px 0;
}

.form-vertical.el-form--label-top .el-form-item__label {
  padding-bottom: 0;
  line-height: 14px;
}

.form-form-vertical .el-form-item:first-child {
  margin-top: 10px;
}

.form-vertical > .el-form-item:last-child {
  margin-bottom: 0;
}

.form-vertical .el-textarea {
  padding: 5px 0;
}

.form-vertical .el-form-item__content .el-select {
  width: 100%;
}

.form-create-mini .el-row > .el-col:last-child,
.form-create-mini .el-form > .el-col:last-child {
  text-align: center;
}

.form-create-mini .el-form-item__content > .el-row > .el-col:last-child {
  text-align: left;
}

.form-create-mini > .el-row > .el-col,
.form-create-mini > .el-form > .el-row > .el-col {
  overflow: hidden;
}

.form-create-mini > .el-row > .el-col:last-child > .el-col,
.form-create-mini > .el-form > .el-row > .el-col:last-child > .el-col {
  text-align: center;
  display: inline-block;
  width: auto;
  float: none;
}

.form-create-mini {
  overflow: auto;
}

.form-create-mini .el-date-editor.el-input {
  display: block;
  width: 100%;
}

.form-create-mini .el-select {
  width: 100%;
}

.form-create-mini .el-col:last-child > .el-col:last-child {
  left: 0;
  margin-left: 10px;
}

.form-create-mini .el-col:last-child > .el-col:first-child {
  margin-right: 10px;
}

/* 竖排表单 END */

.list-avatar {
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid rgb(228, 232, 235);
  vertical-align: middle;
}

.list-avatar-tooltip {
  width: 120px;
}

.list-avatar-tooltip img {
  width: 120px;
}

#nprogress .spinner {
  right: 42px !important;
  top: 20px !important;
}

fieldset {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: 14px;
  min-inline-size: auto;
}

fieldset .el-form--inline .el-form-item {
  margin-bottom: 0;
}

fieldset > aside {
  padding: 5px;
}

fieldset aside > li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 30px;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  word-break: keep-all;
}

fieldset aside > li:last-child {
  border: 0;
}

fieldset aside > li span {
  padding: 5px;
}

fieldset aside > li span:last-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: right;
}

legend {
  background-color: #ffffff;
  padding: 3px 10px;
  font-size: 13px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.wrap-breadcrumb.breadcrumb {
  display: inline-block;
  position: static !important;
}

.float-nav-btn {
  display: none;
}

/* Mobile phone */
#app .set-mob .nav_scrollbar {
  max-height: 100vh;
  margin-bottom: 0 !important;
  padding: 0;
}

.set-mob #navIcon {
  display: none;
}

.set-mob .view-title:empty {
  min-height: 5px;
}

.set-mob .content-container {
  margin-left: 4px;
}

.set-mob .aside-nav {
  display: block;
  height: 100%;
  position: fixed;
  top: 0;
  left: -200%;
  z-index: 666;
}

.set-mob .aside-nav.open {
  left: 0;
}

.set-mob .aside-nav-bg.open {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 660;
}

.set-mob .tip-page {
  overflow: auto;
}

.set-mob .breadcrumb {
  position: static !important;
}

.set-mob .float-nav-btn {
  display: block;
  position: fixed;
  bottom: 0;
  font-size: 20px;
  z-index: 1;
  padding: 3px 5px;
  left: -2px;
  border-radius: 0 5px;
  color: #ffffff;
  background-color: #3c495d;
}

/* Mobile phone end */
</style>