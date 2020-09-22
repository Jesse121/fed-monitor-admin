<template>
  <div class="errPage-container">
    <el-table
      :data="tableData"
      stripe
      :default-sort="{ prop: 'lodt', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column prop="resourceUrl" label="链接地址"> </el-table-column>
      <el-table-column prop="time" sortable label="发生时间"> </el-table-column>
      <el-table-column prop="type" sortable label="错误类型"> </el-table-column>
      <el-table-column prop="msg" sortable label="错误提示"> </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getErrorData } from "@/api/error";
import moment from "moment";

interface IErrorData {
  time: number;
  type: string;
  msg: string;
  resourceUrl: string;
}

@Component({
  name: "ErrorLog"
})
export default class extends Vue {
  private tableData: IErrorData[] = [];
  private total = 0;
  private currentPage = 1;
  private pageSize = 10;

  created() {
    this.getErrorList(1);
    throw new Error("b");
  }

  private async getErrorList(page: number) {
    const { data } = await getErrorData({
      page: page,
      pageSize: this.pageSize
    });
    data.result.forEach((item: any) => {
      item.time = moment(item.time).format("YYYY-MM-DD HH:mm:ss");
    });

    this.tableData = data.result;
    this.total = data.total;
  }

  private indexMethod = (index: number) => {
    return this.pageSize * (this.currentPage - 1) + index + 1;
  };

  private handleCurrentChange = (val: number) => {
    this.currentPage = val;
    this.getErrorList(val);
  };
}
</script>

<style lang="scss" scoped>
.errPage-container {
  padding: 30px;
}
</style>
