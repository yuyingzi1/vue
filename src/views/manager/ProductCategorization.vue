<template>
  <div style="width: 100%;height: 1000px;padding: 40px 40px; background-color: white;border-radius: 4px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图-->
    <el-card>
      <el-row>
          <el-col>
            <el-button type="primary">添加分类</el-button>
          </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table :data="cateList" :columns="columns" :selection-table="false" :expand-type="false" show-index index-text="#">
      </tree-table>
    </el-card>
  </div>
</template>

<style lang="less">

</style>

<script>
import request from "@/utils/request";
export default {

  data() {
    return {
      // 商品分类的数据，默认为空
      cateList: [],
      //查询条件
      queryInfo:{
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //总条数
      total: 0,
      //为table指定列的定义
      columns: [
        { label: '分类名称', prop: 'cat_name' },
        { label: '是否有效', prop: 'cat_deleted', type: 'template', template: 'isok' },
        { label: '排序', prop: 'cat_level', type: 'template', template: 'order' },
        { label: '操作', type: 'template', template: 'opt' }
      ]
    }
  },

  created() {
    this.getCateList()
  },

  methods: {
    // 获取商品分类数据
    getCateList() {

    }
  }
}
</script>