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
          <span class="tab-title">{{ item.title || item.path }}</span>
          <el-icon>
            <Close @click.stop="removeTab(item)" />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'
// import { onMounted, watch } from 'vue'
// import { createMicroApp } from '@/qiankun/index.js'
import tabs from '@/qiankun/tabs'

export default {
  components: {
    Close,
  },
  computed: {
    ...mapGetters({
      tabsList: 'tabsList',
      activeTab: 'activeTab',
    }),
  },
  setup() {
    // let store = useStore()
    let router = useRouter()

    let changeTab = (item) => {
      // tabs.switchTab(item)
      router.push(item.fullPath)
    }

    let removeTab = (item) => {
      tabs.closeTab(item)
    }

    return {
      removeTab,
      changeTab,
      //   selectTabs
    }
  },
}
</script>

<style lang="scss" scoped>
.tabBar {
  display: block;
  width: 100%;
  height: 32px;

  position: relative;
  overflow: hidden;
  &::before {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .tabs {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 24px;
    .tab {
      position: relative;
      background: #d6dae0;
      border-radius: 4px 4px 0px 0px;
      transition: all 0.2s ease;
      width: 160px;
      min-width: 50px;
      &:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom-right-radius: 100%;
        left: -10px;
        bottom: -4px;
        transition: all 0.2s ease;
      }
      &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        border-bottom-left-radius: 100%;
        right: -10px;
        bottom: -4px;
        z-index: 1;
        transition: all 0.2s ease;
      }
      .tab-wrap {
        position: relative;
        display: flex;
        align-items: center;
        user-select: none;
        text-align: center;
        font-size: 14px;
        padding: 6px 4px;
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
        }
      }

      &:not(.active):not(:hover) {
        .tab-wrap {
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 0.5px;
            height: 12px;
            opacity: 0.5;
            background: #a2a4a6;
          }
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 0.5px;
            height: 12px;
            opacity: 0.5;
            background: #a2a4a6;
          }
        }
      }
      &:first-of-type {
        .tab-wrap {
          &:before {
            opacity: 0 !important;
          }
        }
      }
      &:last-of-type {
        .tab-wrap {
          &:after {
            opacity: 0 !important;
          }
        }
      }
      &.active,
      &:hover {
        overflow: initial;
        background: #f0f0f0;
        color: #2979ff;
        border-radius: 4px 4px 0px 0px;
        transform: scaleX(1.009);
        z-index: 1;
        transition: all 0.2s ease;
      }
      &.active,
      &:hover {
        &:before {
          border-bottom: 4px solid #f0f0f0;
          border-right: 4px solid #f0f0f0;
        }
        &:after {
          border-bottom: 4px solid #f0f0f0;
          border-left: 4px solid #f0f0f0;
        }
      }
    }
  }
}
</style>