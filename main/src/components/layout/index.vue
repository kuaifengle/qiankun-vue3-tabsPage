<template>
  <el-container class="layout-box">
    <el-header class="clearfix"></el-header>
    <el-container class="layout-main">
      <el-aside id="asideLeft" :width="'210px'">
        <!-- <div v-for="(item, index) in linkList" :key="index" @click="openLink(item)">{{item.title}}</div> -->
        <router-link v-for="(item, index) in linkList" :key="index" :to="item.path">{{item.title}}</router-link>
      </el-aside>
      <el-main id="mainBox">
        {{keepAliveList['iframe'] }}
        <pageTabs></pageTabs>
        <div v-show="!$route.name">
          <div
            v-show="item.name === activeTab.appName"
            v-for="item in microAppConfig"
            :key="item.name"
            :id="item.id"
          ></div>
        </div>

        <!-- <div v-show="!$route.name" id="container"></div> -->
        <div v-show="$route.name">
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepAliveList['iframe'] || []">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { microAppConfig } from '@/qiankun/config.js'

import pageTabs from './pageTabs.vue'
import { mapGetters } from 'vuex'
// import { useRouter } from 'vue-router'

// import { createMicroApp } from '@/qiankun/index.js'
import tabs from '@/qiankun/tabs'

export default {
  components: {
    pageTabs,
  },
  data() {
    return {
      microAppConfig,
    }
  },
  computed: {
    ...mapGetters(['keepAliveList', 'activeTab']),
  },
  setup() {
    let linkList = [
      {
        title: 'Home',
        path: '/home',
      },
      {
        title: 'About',
        path: '/about?id=123123123',
      },
      {
        title: 'User',
        path: '/user',
      },
      // {
      //   title: 'to App1 User',
      //   path: '/app1/user',
      // },
      // {
      //   title: 'to App1 About',
      //   path: '/app1/about',
      // },
      {
        title: 'to App2 User',
        path: '/app2/user?page=1&max=10',
      },
      {
        title: 'to App2 About',
        path: '/app2/about',
      },
    ]
    // let router = useRouter()
    let openLink = (item) => {
      tabs.openTab(item)
      // createMicroApp(item)
      // router.replace(item.path)
    }
    return {
      openLink,
      linkList,
    }
  },
}
</script>

<style lang="scss" sopced>
.layout-box {
  height: 100%;
  width: 100%;
}
.layout-main {
  height: calc(100% - 64px);
  width: 100%;
}
.el-header {
  padding-left: 0 !important;
  height: 64px !important;
  background: #393d49;
  .logo {
    color: #fff;
    padding-left: 54px;
    background-size: 54px 54px;
    line-height: 64px;
    height: 64px;
    font-size: 20px;
    font-weight: 400;
  }
  .el-dropdown {
    cursor: pointer;
    margin-right: 6px;
    color: #fff;
    line-height: 64px;
    font-size: 16px;
    height: 64px;
    .el-icon {
      vertical-align: middle;
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
.el-aside {
  background: #ccc;
  position: relative;
  z-index: 11;
  display: flex;
  flex-direction: column;

  .menu-input {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;

    .el-input__inner {
      border-color: #fff;
      border-radius: 20px;
      background: transparent;
      color: #fff;
    }
    .el-input__prefix {
      .el-icon {
        color: #fff;
      }
    }
  }

  #dragBar {
    position: absolute;
    z-index: 10;
    right: 0;
    width: 6px;
    height: 100%;
    background: transparent;
    border-right: 2px dashed transparent;
    cursor: ew-resize;
    &:hover {
      border-right-color: #fff;
    }
  }
}

.el-main {
  padding-top: 0 !important;
  position: relative;
}

.el-dropdown-menu__item.is-disabled {
  cursor: default !important;
  color: #606266 !important;
}
.backtop {
  right: 40px;
  bottom: 75px;
  opacity: 0.75;
}
</style>