<template>
  <div class="errPage-container">
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'time', order: 'descending' }"
      stripe
    >
      <el-table-column
        :index="indexMethod"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column
        label="发生时间"
        prop="time"
        width="150"
      ></el-table-column>
      <el-table-column
        label="错误类型"
        prop="type"
        width="80"
      ></el-table-column>
      <el-table-column label="页面链接" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.data.url" target="_blank">
            {{ scope.row.data.url }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="错误提示"
        prop="data.msg"
        width="200"
      ></el-table-column>
      <el-table-column
        class="stack"
        label="堆栈信息"
        prop="data.stack"
      ></el-table-column>
    </el-table>
    <el-pagination
      :page-size="10"
      :total="total"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { getErrorData } from "@/api/error";
import moment from "moment";
export default {
  name: "ErrorLog",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.getErrorList(1);
  },
  methods: {
    async getErrorList(page) {
      const { data } = await getErrorData({
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
      this.getErrorList(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.errPage-container {
  .stack {
    white-space: nowrap;
  }
}
</style>
