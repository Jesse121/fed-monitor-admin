<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      stripe
      :default-sort="{ prop: 'lodt', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column prop="url" label="链接地址" width="180">
      </el-table-column>
      <el-table-column prop="dnst" sortable label="DNS解析耗时">
      </el-table-column>
      <el-table-column prop="tcpt" sortable label="TCP连接耗时">
      </el-table-column>
      <el-table-column prop="wit" sortable label="白屏时间"> </el-table-column>
      <el-table-column prop="domt" sortable label="dom渲染完成耗时">
      </el-table-column>
      <el-table-column prop="lodt" sortable label="页面onload耗时">
      </el-table-column>
      <el-table-column prop="andt" sortable label="解析dom耗时">
      </el-table-column>
      <el-table-column prop="radt" sortable label="页面准备耗时">
      </el-table-column>
      <el-table-column prop="rdit" sortable label="页面重定向耗时">
      </el-table-column>
      <el-table-column prop="reqt" sortable label="request请求耗时">
      </el-table-column>
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
import { getPerformanceData } from "@/api/performance";

interface IPerformanceState {
  url: string;
  dnst: number;
  tcpt: number;
  wit: number;
  domt: number;
  lodt: number;
  radt: number;
  rdit: number;
  uodt: number;
  reqt: number;
  andt: number;
}

@Component({
  name: "Performance"
})
export default class extends Vue {
  private tableData: IPerformanceState[] = [];
  private total = 0;
  private currentPage = 1;
  private pageSize = 10;

  created() {
    this.getPerformance(1);
  }

  private async getPerformance(page: number) {
    const { data } = await getPerformanceData({
      page: page,
      pageSize: this.pageSize
    });
    this.tableData = data.result;
    this.total = data.total;
  }

  private indexMethod = (index: number) => {
    return this.pageSize * (this.currentPage - 1) + index + 1;
  };

  private handleCurrentChange = (val: number) => {
    this.currentPage = val;
    this.getPerformance(val);
  };
}
</script>

<style lang="scss" scoped>
.el-pagination {
  float: right;
}
</style>
