<template>
  <div class="errPage-container">
    <el-table :data="tableData" :default-sort="{ prop: 'lodt', order: 'descending' }" stripe style="width: 100%">
      <el-table-column :index="indexMethod" label="序号" type="index"></el-table-column>
      <el-table-column label="链接地址" prop="resourceUrl"></el-table-column>
      <el-table-column label="发生时间" prop="time" sortable></el-table-column>
      <el-table-column label="错误类型" prop="type" sortable></el-table-column>
      <el-table-column label="错误提示" prop="msg" sortable></el-table-column>
    </el-table>
    <el-pagination :page-size="10" :total="total" @current-change="handleCurrentChange" layout="prev, pager, next"></el-pagination>
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
