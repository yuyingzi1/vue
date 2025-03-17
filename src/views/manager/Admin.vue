<template>
  <div style="width: 100%;height: 1000px;padding: 40px 40px; background-color: white;border-radius: 4px">
    <div style="margin-bottom:40px;font-size:18px;font-weight:530;">维修员管理</div>
    <div style="margin-bottom: 20px; display: flex">
      <div style="flex: 10;text-align: left">
        <el-input placeholder="请输入查询内容" size="small" v-model="input" style="width: 20%; margin-right: 20px"><i slot="suffix" class="el-input__icon el-icon-search"></i></el-input>
      </div>
      <div style="flex:2;text-align: right">
        <el-button type="success" size="small" style="border-radius:1px;width:100px;text-align:center" @click="add">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" :fit="true" stripe :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="confirmDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: right;margin-top: 50px">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>
    <el-dialog title="请填写信息" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" label-position="right" label-width="100px" style="padding-right: 40px">
        <el-form-item label="用户名">
          <el-input size="small" v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group size="small" v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input size="small" v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input size="small" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/request";
import {post} from "axios";
export default {
  created() {
    this.load()
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    load() {
      request.get('/admin/alldata').then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
    add() {
      this.form = {};
      this.dialogVisible = true;
    },
    save(){
      if (!this.form.id){ //如果没有id 走新增接口
        request.post("/admin",this.form).then(res =>{ //post请求把form对象传到后端，后端写逻辑把form存到数据库里
          if (res.code === '0'){ //如果接口调用成功，则把模态框关闭，重新加载一下数据库的数据
            this.$notify.success("新增成功");
            this.dialogVisible = false;
            this.load();
          } else {
            this.$notify.error(res.msg); // 如果不成功，返回报错信息
          }
        })
      } else {
        request.put("/admin/update",this.form).then(res =>{
          if (res.code === '0'){
            this.$notify.success("修改成功");
            this.dialogVisible = false;
            this.load();
          } else {
            this.$notify.error(res.msg); // 如果不成功，返回报错信息
          }
        })
      }
    },

    //删除弹窗
    confirmDelete(row) {
      this.$confirm('确定要删除该记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRecord(row.id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //调接口，删除要用delete请求
    deleteRecord(id) {
      request.delete(`/admin/${id}`).then(res => {
        if (res.code === '0') {
          this.$notify.success("删除成功");
          this.load();
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
    //点击编辑，打开模态框，回显当前对象的信息
     update(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    }
  },
  data() {
    return {
      input: '',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [],
      dialogVisible: false,
      form: {}
    }
  }
}
</script>