<template>
  <div class="performance-container">
    <el-table :data="tableData" :default-sort="{ prop: 'lodt', order: 'descending' }" stripe style="width: 100%">
      <el-table-column :index="indexMethod" label="序号" type="index"></el-table-column>
      <el-table-column label="链接地址" prop="url" width="180"></el-table-column>
      <el-table-column label="DNS解析耗时" prop="dnst" sortable></el-table-column>
      <el-table-column label="TCP连接耗时" prop="tcpt" sortable></el-table-column>
      <el-table-column label="白屏时间" prop="wit" sortable></el-table-column>
      <el-table-column label="dom渲染完成耗时" prop="domt" sortable></el-table-column>
      <el-table-column label="页面onload耗时" prop="lodt" sortable></el-table-column>
      <el-table-column label="解析dom耗时" prop="andt" sortable></el-table-column>
      <el-table-column label="页面准备耗时" prop="radt" sortable></el-table-column>
      <el-table-column label="页面重定向耗时" prop="rdit" sortable></el-table-column>
      <el-table-column label="request请求耗时" prop="reqt" sortable></el-table-column>
    </el-table>
    <el-pagination :page-size="10" :total="total" @current-change="handleCurrentChange" layout="prev, pager, next"></el-pagination>
  </div>
</template>

<script>
  import { getPerformanceData } from "@/api/performance";
  export default {
    name: "PagePerformance",
    data() {
      return {
        tableData: [],
        total: 0,
        currentPage: 1,
        pageSize: 10
      };
    },
    created() {
      this.getPerformance(1);
    },
    methods: {
      async getPerformance(page) {
        const { data } = await getPerformanceData({
          page: page,
          pageSize: this.pageSize
        });
        this.tableData = data.result;
        this.total = data.total;
      },
      indexMethod(index) {
        return this.pageSize * (this.currentPage - 1) + index + 1;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getPerformance(val);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-pagination {
    float: right;
  }
</style>
