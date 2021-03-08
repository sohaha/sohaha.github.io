<template>
  <div>
    <div class="view-title float-clear"></div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside v-loading="getSetting.loading.value">
        <div id="form" class="form-create-mini"></div>
      </aside>
    </fieldset>
  </div>
</template>
<script>
export default load({js: [VueRun.lib('/form-create/form-create.js')]}).then(async () => {
  return {
    components: {},
    setup(prop, ctx) {
      const {title} = util.useInitTitle(ctx);

      let rules = [
        {
          type: 'input',
          field: 'sitename',
          title: '网站标题',
          value: '',
          props: {
            placeholder: '网站标题',
          },
          validate: [
            {required: true, message: '网站标题不能为空', trigger: 'blur'},
          ],
        },
        {
          type: 'input',
          field: 'domain',
          title: '网站域名',
          value: '',
          props: {
            placeholder: '网站域名，留空则取当前访问域名',
          },
          validate: [
            {type: 'url', message: '网站域名不合法', trigger: 'blur'},
          ],
        },
        {
          type: 'el-row',// 表单自定义布局
          title: '登录相关',
          children: [
            {
              type: 'el-col',
              props: {span: 11},
              children: [
                {
                  type: "select",
                  field: 'login_mode',
                  value: "1",
                  options: [
                    {value: "0", label: "单端登录"},
                    {value: "1", label: "多地登录"},
                  ],
                },
              ]
            },
            {
              type: 'el-col',
              props: {span: 11},
              children: [
                {
                  type: "select",
                  field: 'login_expire_time',
                  value: '3600',
                  options: [
                    {value: "3600", label: "一个小时"},
                    {value: "0", label: "永久在线"},
                  ],
                  validate: [
                    {
                      validator: function (rule, value, callback) {
                        console.log(rule, value, callback);
                        if (!value || value < 0) {
                          callback(new Error('登录超时时间不合法'));
                          return;
                        }
                        callback();
                      }, trigger: 'blur'
                    },
                  ],
                },
              ]
            },
          ],
        },
      ];
      let opts = {
        onSubmit: async (formData) => {
          if (setSetting.loading.value) {
            return;
          }
          $f.submitBtnProps({loading: true});
          const [, err] = await setSetting.run(formData);
          if (err) {
            util.useTip().message('warning', err);
          }
          $f.submitBtnProps({loading: false});
        }
      };
      // 生成表单
      const {$f} = util.formCreate("#form", rules, opts);
      // 获取设置
      const setSetting = api.useRequestWith(api.sys.setSetting, false);
      // 更新设置
      const getSetting = api.useRequestWith(api.sys.getSetting, false);
      (async () => {
        const [data, err] = await getSetting.run();
        if (err) {
          util.useTip().message('warning', err);
          return;
        }
        $f.setValue(data);
      })();

      return {
        title,
        getSetting
      };
    }
  };
});
</script>

<style scoped>
</style>
