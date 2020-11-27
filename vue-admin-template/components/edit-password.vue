<style>
</style>
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="80px">
    <el-form-item label="原密码" prop="oldPass">
      <el-input v-model="ruleForm.oldPass" type='password'></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input v-model="ruleForm.pass" type='password'></el-input>
    </el-form-item>
    <el-form-item label="确定密码" prop="pass2">
      <el-input v-model="ruleForm.pass2" type='password'></el-input>
    </el-form-item>
    <div class='center'>
      <el-button type="primary" @click="submitForm">修 改</el-button>
      <el-button @click="resetForm">放 弃</el-button>
    </div>
  </el-form>
</template>
<script>
const {useRouter, useStore, useTip} = hook;
const {reactive, toRef, ref, watch, computed, onMounted} = vue;
const {user: userApi, useRequest} = api;

let initRuleForm = {
  pass: '',
  pass2: '',
  oldPass: '',
};

export default {
  name: 'editPassword',
  props: {},
  setup(prop, ctx) {
    const {root} = ctx;
    const ruleFormRef = ref(null);
    let ruleForm = ref(Object.assign({}, initRuleForm))

    const userid = computed(() => {
      return useStore(ctx).getters.userid;
    })

    const rules = computed(() => {
      let validatePass = (rule, value, callback) => {
        if (value !== ruleForm.value.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        oldPass: [
          {required: true, message: '请输入旧密码', trigger: 'blur'},
        ],
        pass: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          // { min: 0, max: 200, message: '密码长度不对', trigger: 'blur' },
        ],
        pass2: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'},
        ]
      }
    })

    function submitForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          const {loading, error, data, run} = useRequest(userApi.editPassword(Object.assign({userid: userid.value}, ruleForm.value)));
          watch(data, (val) => {
            if (val.code === 200) {
              resetForm();
              ctx.emit('success', val.data);
              useTip().message('success', '密码修改成功');
            } else {
              useTip().message('warning', val.msg);
            }
          })
          watch(error, (err) => {
            useTip().message('warning', err);
          })
        } else {
          return false;
        }
      })
    }

    function resetForm() {
      ruleForm.value = Object.assign({}, initRuleForm);
      root.$nextTick(() => {
        ruleFormRef.value.clearValidate();
        ctx.emit('success');
      })
    }


    return {
      ruleFormRef,
      ruleForm,
      userid,
      rules,
      submitForm,
      resetForm
    };
  }
};
</script>
