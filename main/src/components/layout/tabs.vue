<template>
  <div class="tabBar">
    <div class="tabs">
      <div
        v-for="(item, index) in tabsList"
        :key="index"
        :class="{ tab: true, active: item.path === activeTab.path }"
        @click.stop="changeTab(item)"
      >
        <div class="tab-wrap">
          <el-tooltip
            :show-after="400 "
            :content="item.title"
            placement="bottom"
            effect="customized"
            :show-arrow="false"
          >
            <span class="tab-title">{{ item.title }}</span>
          </el-tooltip>
          <el-icon v-if="tabsList.length > 1">
            <Close @click.stop="removeTab(item, index)" />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex'
import tabs from '@/qiankun/tabs.js'

export default {
  components: {
    Close,
  },
  computed: {
    ...mapGetters({
      tabsList: 'tabs/tabsList',
      activeTab: 'tabs/activeTab',
    }),
  },
  methods: {
    changeTab(item) {
      this.$router.push(item.fullPath)
    },
    removeTab(item) {
      if (this.tabsList.length === 1) {
        return
      }
      tabs.closeTab(item)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabBar {
  display: block;
  height: 42px;
  margin: 0 -20px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #f2f2f2;
  margin-bottom: 24px;
  .tabs {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 12px;
    .tab {
      position: relative;
      background: #f2f2f2;
      transition: all 0.2s ease;
      width: 193px;
      min-width: 60px;
      .tab-wrap {
        position: relative;
        display: flex;
        align-items: center;
        user-select: none;
        text-align: center;
        font-size: 14px;
        height: 42px;
        line-height: 42px;
        padding: 0 12px;
        text-align: center;
        cursor: pointer;
        overflow: hidden;
        .tab-title {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1;
          white-space: nowrap;
          flex: 1;
        }

        i {
          margin-left: auto;
          color: #999999;
          font-weight: 600;
          font-size: 0px;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &:hover {
            color: #096dd9;
          }
        }
      }

      &:hover {
        overflow: initial;
        background: #f8f8f8;
        z-index: 1;
        transition: all 0.2s ease;
        i {
          font-size: 16px;
        }
      }

      &.active {
        color: #096dd9;
        overflow: initial;
        background: #ffffff;
        z-index: 1;
        transition: all 0.2s ease;
        i {
          font-size: 16px;
          color: #096dd9;
        }
      }
    }
  }
}
</style>