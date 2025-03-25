<template>
  <div style="width: 100%;height: 1000px;padding: 40px 40px; background-color: white;border-radius: 4px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/manager/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统公告</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="flex: 10;text-align: left">
      <el-input placeholder="请输入查询内容" size="small"  v-model="search.userName" style="width: 20%; margin-right: 20px" ><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
      <el-button type="primary" size="small" style="border-radius: 1px;width: 100px;text-align: center" @click="load()" >查询</el-button>
    </div>
    <div style="flex:2;text-align: right">
      <el-button type="primary" size="small" style="border-radius:1px;width:100px;text-align:center" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" :fit="true" stripe :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
      <el-table-column prop="title" label="公告标题"></el-table-column>
      <el-table-column prop="content" label="公告内容"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="confirmDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      input: '',
      pageNum: 1,
      total: 0,
      search: {},
      tableData: []
    }
  },
  methods: {
    load() {
      request.get("/notice/list", {
        params: {
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          titel: data.titel
        }
      }).then(res => {
        if (res.code === '0') {
          data.tableData = res.data.list
          data.total = res.data.total
        }
      })
    }
  }
}
</script>