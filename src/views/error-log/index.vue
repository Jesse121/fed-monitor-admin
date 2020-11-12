<template>
  <div class="errPage-container">
    <el-row class="choose">
      <el-col :span="5">请选择项目：</el-col>
      <el-col :span="5"></el-col>
      <el-col :span="5">请选择平台：</el-col>
      <el-col :span="5"></el-col>
      <el-col :span="5">请选择日期：</el-col>
      <el-col :span="5"></el-col>
      <!-- <el-col :span="10">
        <el-dropdown size="medium" split-button type="primary">
          中等尺寸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>-->
    </el-row>
    <el-table :data="tableData" @cell-click="errorDetail" stripe>
      <el-table-column
        :index="indexMethod"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column
        label="发生时间"
        prop="time"
        width="200"
      ></el-table-column>
      <el-table-column
        label="错误类型"
        prop="type"
        width="100"
      ></el-table-column>
      <el-table-column label="页面链接" prop="url">
        <!-- <template slot-scope="scope" >
          <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
        </template>-->
      </el-table-column>
      <el-table-column label="错误提示" prop="data.msg"></el-table-column>
      <!-- <el-table-column class="stack" label="堆栈信息" prop="data.stack"></el-table-column> -->
    </el-table>
    <el-pagination
      :page-size="15"
      :total="total"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
    ></el-pagination>
    <el-dialog
      :visible.sync="showErrorDialog"
      class="error-detail-dialog"
      title="日志详情"
    >
      <el-form :model="errorDetailData">
        <el-form-item label="发生时间:">{{
          errorDetailData.time | formatTime
        }}</el-form-item>
        <el-form-item label="错误类型:">{{
          errorDetailData.type
        }}</el-form-item>
        <el-form-item label="客户端ua:">{{
          errorDetailData.useragent
        }}</el-form-item>
        <el-form-item label="页面链接:">
          <a :href="errorDetailData.url" target="_blank">{{
            errorDetailData.url
          }}</a>
        </el-form-item>
        <div v-if="errorDetailData.data">
          <el-form-item label="错误提示:">{{
            errorDetailData.data.msg || ""
          }}</el-form-item>
          <el-form-item label="错误文件:">{{
            errorDetailData.data.source || ""
          }}</el-form-item>
          <el-form-item label="错误行数:">{{
            errorDetailData.data.line || 0
          }}</el-form-item>
          <el-form-item label="错误列数:">{{
            errorDetailData.data.col || 0
          }}</el-form-item>
          <el-form-item label="错误堆栈:">{{
            errorDetailData.data.stack || ""
          }}</el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getErrorData, getErrorDetail } from "@/api/error";
export default {
  name: "ErrorLog",
  data() {
    return {
      errorDetailData: {},
      showErrorDialog: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 15
    };
  },
  created() {
    this.getErrorList(1);
    throw new Error("a");
  },
  methods: {
    async getErrorList(page) {
      const { data } = await getErrorData({
        page: page,
        pageSize: this.pageSize
      });
      data.result.forEach(item => {
        item.time = this.$options.filters.formatTime(item.time);
      });
      this.tableData = data.result;
      this.total = data.total;
    },

    async errorDetail(row) {
      // console.log(row);
      const { data } = await getErrorDetail({ id: row._id });
      if (data.result) {
        this.showErrorDialog = true;
        this.errorDetailData = data.result;
      }
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
  position: relative;
  .choose {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
  }
  .stack {
    white-space: nowrap;
  }
  .el-pagination {
    float: right;
  }
}
.error-detail-dialog {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
