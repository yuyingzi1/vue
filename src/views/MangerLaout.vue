<template>
  <div id="app">
    <el-container style="height: 1000px">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="my-aside">
        <div style="height: 70px; display: flex; justify-content: center; align-items: center">
          <img src="@/assets/商家头像.jpeg" style="width: 10%" />
          <span v-if="!isCollapse" class="external-white-text">商家后台管理</span>
        </div>
        <el-menu
            class="el-menu"
            :default-active="$route.path"
            router
            :collapse="isCollapse"
            :collapse-transition="false"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span v-if="!isCollapse">系统首页</span>
            </template>
            <el-menu-item index="/manager/home">系统首页</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span v-if="!isCollapse">用户管理</span>
            </template>
            <el-menu-item index="/manager/user">用户管理</el-menu-item>
            <el-menu-item index="/manager/admin">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span v-if="!isCollapse">订单管理</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span v-if="!isCollapse">资源列表</span>
            </template>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容区域 -->
      <el-container class="right-container">
        <!-- 顶部栏 -->
        <el-header class="my-header">
          <!-- 左侧区域 -->
          <div class="header-left">
            <!-- 添加图标按钮 -->
            <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                style="font-size: 24px; cursor: pointer; margin-right: 20px;"
                @click="toggleCollapse"
            ></i>
          </div>
          <!-- 右侧区域 -->
          <div class="header-right">
            <img :src="user.avatar" style="width: 40px; border-radius: 50%; margin-right: 10px" />
            <span class="external-white-text">{{ user.userName }}</span>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <div @click="logout"><el-dropdown-item >退出登录</el-dropdown-item></div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主要内容区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      // 默认展开
      isCollapse: false,
      // 定义User对象，从缓存里取值
      user: JSON.parse(localStorage.getItem("user") || {}),
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse; // 切换侧边栏的折叠状态
    },
    // 退出登录方法
    logout() {
      // 清除缓存
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
};
</script>

<style>

</style>