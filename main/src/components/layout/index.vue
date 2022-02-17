<template>
  <el-container class="layout-box">
    <el-header class="clearfix"></el-header>
    <el-container class="layout-main">
      <el-aside id="asideLeft" width="210px">
        <el-menu
          :uniqueOpened="true"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :default-active="$route.path + ''"
          router
        >
          <template v-for="(item, index) in menuDataList" :key="index">
            <el-menu-item :index="item.path" :title="item.title">
              <i v-if="item.icon" :class="['iconfont', item.icon]"></i>
              <template #title>
                <span>{{ item.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main id="mainBox">
        <div>主应用的已缓存的页面有: =====> {{ keepAliveList['iframe'] || '[暂无]' }}</div>
        <tabs></tabs>
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

import tabs from './tabs.vue'
import { menuDataList } from '@/menuData/index.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    tabs,
  },
  data() {
    return {
      microAppConfig,
      menuDataList,
    }
  },
  computed: {
    ...mapGetters({
      keepAliveList: 'tabs/keepAliveList',
      activeTab: 'tabs/activeTab',
    }),
  },
  setup() {},
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

.el-main {
  padding-top: 0 !important;
  position: relative;
}
</style>