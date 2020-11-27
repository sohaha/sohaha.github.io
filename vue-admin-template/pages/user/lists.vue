<template>
  <div>
    <div class="view-title float-clear">
      <span>{{ title }}</span>
      <div class="view-title-right float-clear">
        <el-form @submit.prevent.stop.native inline class="tip-top">
          <el-form-item>
            <el-input clearable @keyup.enter.stop.prevent.native="ml_searchRow" v-model="ml_searchKey"
                      placeholder="用户昵称" size="mini">
              <el-button @click="ml_searchRow" type="success" slot="append" size="mini"
                         icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="create" icon="el-icon-plus">添加</el-button>
            <el-button type="info" size="mini" @click="ml_reloadLists" icon="el-icon-refresh">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside v-loading="ml_listsLoading">
        <el-table :data="ml_data" style="width: 100%" size="mini">
          <el-table-column label="头像" width="80">
            <template slot-scope="scope">
              <el-tooltip placement="right-end" effect="light" :visible-arrow="false">
                <div slot="content" class="list-avatar-tooltip">
                  <img :src="scope.row.avatar||$store.state.defaultData.avatar" alt='用户头像'>
                </div>
                <template v-if="scope.row.avatar">
                  <el-image fit="fill" class="list-avatar" :src="scope.row.avatar+ '?t=' + new Date().getTime()">
                    <div slot="error" class="image-slot">
                      <img :src="baseUrl + scope.row.avatar + '?t=' + new Date().getTime()" alt='用户头像'>
                    </div>
                  </el-image>
                </template>
                <template v-else>
                  <el-image fit="cover" class="list-avatar" :src="$store.state.defaultData.avatar"></el-image>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <div class="text-nowrap" :title="scope.row.username">{{ scope.row.username }}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="邮箱" max-width="170">
            <template slot-scope="scope">
              <div>{{ scope.row.email || ' - ' }}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="update_time" label="更新时间" max-width="180"></el-table-column>
          <el-table-column label="状态" min-width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===1" size="mini" type="success">正常</el-tag>
              <el-tag v-else size="mini" type="danger">禁止</el-tag>
              <el-tag v-if="isMe(scope.row.username)" type="warning" size="mini">自己</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="角色" min-width="150">
            <template slot-scope="scope">
              <el-tag v-for="(v,k) in scope.row.group_name" type="info" size="mini" :key='k'>{{ v }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="btns-operating">
                <el-button type="info" size="mini" @click="editRow(scope)" icon="el-icon-edit" title="编辑用户">编 辑
                </el-button>
                <el-popover placement="top" width="160" v-model="scope.row.popover">
                  <p>
                    确定删除？ <br> {{ scope.row.username }} </p>
                  <div>
                    <el-button size="mini" @click="scope.row.popover = false" type="info" plain>取 消</el-button>
                    <el-button type="danger" size="mini" @click="deleteRow(scope)" plain>确 定</el-button>
                  </div>
                  <el-button :disabled="isMe(scope.row.username)" slot="reference" size="mini" type="danger"
                             icon="el-icon-delete" title="删除用户">删 除
                  </el-button>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="tip-page" v-if="!!ml_pagetotal">
          <el-pagination :current-page.sync="ml_page" @size-change="ml_sizeChange" @current-change="ml_currentChange"
                         background layout="prev, pager, next, sizes" :total="ml_pagetotal"
                         :page-size.sync="ml_pagesize"></el-pagination>
        </div>
      </aside>
    </fieldset>
    <el-dialog class="dialog-view" :title="viewDialogtitle" :visible.sync="viewDialogVisible"
               :close-on-press-escape="false" :close-on-click-modal="false" center>
      <user-view :info="info" @submit="userSubmitSucceed"></user-view>
    </el-dialog>
  </div>
</template>
<script>
const {ref, reactive, computed, onMounted, watch} = vue;
const {useRouter, useStore, useCache, useTip, useLoading} = hook;
const {user: userApi, useRequest} = api;
const {useInitTitle, useInitPage, getInfo} = util;
export default {
  components: {
    userView: VueRun('components/user-view.vue')
  },
  setup(prop, ctx) {
    const {title} = useInitTitle(ctx);
    const {ml_change, ml_data, ml_listsLoading, ml_page, ml_pagetotal, ml_pagesize, ml_currentChange, ml_sizeChange, ml_searchKey, ml_searchRow, ml_reloadLists, ml_getLists} = useInitPage();
    // ml_searchKey.value = !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
    const searchKey = computed(() => {
      return !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
    })

    watch(() => [searchKey.value, useRouter(ctx).route.query.v], ([val, val2]) => {
      ml_searchKey.value = val;
      getLists();
    }, {immediate: true})

    onMounted(() => {
      // ml_reloadLists();
    })

    watch(ml_change, (val) => {
      getLists();
    })

    const baseUrl = computed(() => {
      return config.baseURL;
    })

    function getLists() {
      let param = {page: ml_page.value, pagesize: ml_pagesize.value};
      if (ml_searchKey.value) {
        param['key'] = ml_searchKey.value;
      }
      ml_listsLoading.value = true;
      const {loading, error, data, run} = useRequest(userApi.list(param));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          let res = (val.data.items || []).map(function (e) {
            e.group_name = [];
            for (let k in e.groups) {
              if (e.groups.hasOwnProperty(k)) {
                e.group_name.push(e.groups[k]);
              }
            }
            e.level_name = [];
            for (let k in e.levels) {
              if (e.levels.hasOwnProperty(k)) {
                e.level_name.push(e.levels[k]);
              }
            }
            e.popover = false;
            return e;
          });

          let page = val.data.page;
          ml_getLists(JSON.parse(JSON.stringify(res)), page);
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch([data, error], () => {
        ml_listsLoading.value = false;
      })
    }

    let info = ref({});
    let viewDialogVisible = ref(false);
    const viewDialogtitle = computed(() => {
      return !!info.value.id ? '编辑用户' : '添加用户';
    })

    function isMe(name) {
      return name === useStore(ctx).getters.nickname;
    }

    function create() {
      viewDialogVisible.value = true;
      info.value = {};
    }

    function editRow(e) {
      info.value = e.row;
      viewDialogVisible.value = !viewDialogVisible.value;
    }

    function deleteRow(v) {
      const {loading, error, data, run} = useRequest(userApi.deleteUser({id: v.row.id}));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          ml_data.value.splice(v.$index, 1);
          if (ml_data.length <= 0) {
            ml_reloadLists();
          }
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (err) => {
        useTip().message('warning', err);
      })
      watch([data, error], ([d, e]) => {
        v.row.popover = false;
      })
    }

    function userSubmitSucceed(id) {
      viewDialogVisible.value = false;
      ml_reloadLists();
      if (+id === +useStore(ctx).state.user.id) {
        getInfo();
      }
    }

    return {
      title,
      searchKey,
      ml_change,
      ml_searchKey,
      ml_listsLoading,
      ml_page,
      ml_data,
      ml_pagetotal,
      ml_pagesize,
      ml_currentChange,
      ml_sizeChange,
      ml_searchRow,
      ml_reloadLists,
      ml_getLists,
      baseUrl,
      isMe,
      create,
      editRow,
      deleteRow,
      userSubmitSucceed,
      viewDialogtitle,
      viewDialogVisible,
      info
    };
  }
};
</script>

<style scoped>
span.el-tag.el-tag--mini + span.el-tag.el-tag--mini {
  margin-left: 5px;
}
</style>
