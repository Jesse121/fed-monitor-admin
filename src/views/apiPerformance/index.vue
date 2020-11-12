<template>
  <div class="performance-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :index="indexMethod"
        label="序号"
        type="index"
      ></el-table-column>
      <el-table-column
        label="请求时间"
        prop="time"
        width="200"
      ></el-table-column>
      <el-table-column label="页面链接">
        <template slot-scope="scope">
          <a :href="scope.row.pageUrl" target="_blank">{{
            scope.row.pageUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="接口地址" prop="url"></el-table-column>
      <el-table-column
        label="状态码"
        prop="statusCode"
        sortable
        width="100"
      ></el-table-column>
      <el-table-column
        label="响应耗时"
        prop="timeConsuming"
        sortable
        width="100"
      ></el-table-column>
      <el-table-column
        label="错误信息"
        prop="responseMsg"
        sortable
      ></el-table-column>
    </el-table>
    <el-pagination
      :page-size="15"
      :total="total"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { getApiPerformanceData } from "@/api/performance";
import moment from "moment";
export default {
  name: "ApiPerformance",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15
    };
  },
  created() {
    this.getApiPerformance(1);
  },
  methods: {
    async getApiPerformance(page) {
      const { data } = await getApiPerformanceData({
        page: page,
        pageSize: this.pageSize
      });
      data.result.forEach(item => {
        item.time = moment(item.time).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data.result;
      this.total = data.total;
    },
    indexMethod(index) {
      return this.pageSize * (this.currentPage - 1) + index + 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApiPerformance(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  float: right;
}
</style>
