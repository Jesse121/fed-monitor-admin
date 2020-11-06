<template>
  <div class="dashboard-container">
    <div class="monitor-project">
      <h3>已监控项目</h3>
    </div>
    <hr />
    <div class="add-new-project">
      <h3>新增监控项目</h3>
      <el-form
        :model="projectNameValidateForm"
        class="object-name-rule-form"
        label-width="100px"
        ref="projectNameValidateForm"
      >
        <el-form-item
          :rules="[
            { required: true, message: '项目名称不能为空' },
            { type: 'string', message: '项目名称必须为数字，字母或下划线' }
          ]"
          label="项目名称"
          prop="name"
        >
          <el-input
            autocomplete="off"
            type="text"
            placeholder="请输入项目名称"
            v-model="projectNameValidateForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目简介" prop="desc">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入项目简介"
            v-model="projectNameValidateForm.desc"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submitForm('projectNameValidateForm')"
            type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addNewProject, getHaveProject } from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    return {
      projectNameValidateForm: {
        name: "",
        desc: ""
      },
      projectList: []
    };
  },
  created() {
    this.getProjectList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const name = this.projectNameValidateForm.name;
          const desc = this.projectNameValidateForm.desc;
          addNewProject({ name, desc })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getProjectList() {
      console.log(await getHaveProject());
      // const [res, err] = await getHaveProject();
      // if (err) console.error(err);
      // this.projectList = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    .object-name-rule-form {
      width: 400px;
    }
  }
}
</style>
