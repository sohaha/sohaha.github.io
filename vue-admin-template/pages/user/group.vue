<template>
  <div>
    <div class="view-title float-clear">
      <div class="view-title-right">
        <el-form @submit.prevent.stop.native inline class="tip-top">
          <el-form-item>
            <el-button type="primary" size="mini" @click="useAddRowStatus" icon="el-icon-plus" :disabled="isAddRow">添加
            </el-button>
            <el-button type="info" size="mini" @click="ml_reloadLists" icon="el-icon-refresh">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside v-loading="ml_listsLoading" class="group-table">
        <el-table :data="ml_data" style="width: 100%" size="mini">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column show-overflow-tooltip label="角色名称" min-width="120">
            <template slot-scope="scope">
              <div v-if="scope.row._isEdit">
                <el-input v-model="scope.row.name" placeholder="角色名称" size="mini"></el-input>
              </div>
              <div v-else class="text-nowrap" :title="scope.row.name">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="角色简介" min-width="120">
            <template slot-scope="scope">
              <div v-if="scope.row._isEdit">
                <el-input v-model="scope.row.remark" placeholder="角色简介" size="mini"></el-input>
              </div>
              <div v-else class="text-nowrap" :title="scope.row.remark">{{ scope.row.remark }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <div class="btns-operating">
                <el-button :disabled="scope.row._isEdit" @click="useOpenRuleView(scope)" slot="reference" size="mini"
                           type="success" title="查看规则" icon="icon-person-done">角色规则
                </el-button>
                <el-button v-bind="useGetEditBtnAttrs(scope)" size="mini" @click="useEditRow(scope)">
                  {{ useGetEditBtnAttrs(scope).title }}
                </el-button>
                <el-button v-if="scope.row._isEdit" title="放 弃" @click="useQuitRow(scope)" size="mini"
                           icon="el-icon-close">放 弃
                </el-button>
                <template>
                  <el-popover placement="top" width="160" v-model="scope.row._isPopover">
                    <p>确定删除吗？</p>
                    <div>
                      <el-button size="mini" @click="scope.row._isPopover = false" type="info" plain>取 消</el-button>
                      <el-button type="danger" size="mini" @click="useDeleteRow(scope)" plain>确 定</el-button>
                    </div>
                    <el-button v-show="!scope.row._isEdit" slot="reference" size="mini" type="danger"
                               icon="el-icon-delete" title="删 除">删除
                    </el-button>
                  </el-popover>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </aside>
    </fieldset>

    <!-- <el-dialog
      class="dialog-view"
      title="权限编辑"
      :visible.sync="viewDialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      center
    >
      <components_rule-view  @submit=""></components_rule-view>
    </el-dialog>-->
  </div>
</template>
<script>
const {ref, reactive, computed, onMounted, watch} = vue;
const {useRouter, useStore, useCache, useTip, useLoading} = hook;
const {user: userApi, useRequest} = api;
const {useInitTitle, useInitPage, getInfo} = util;

let dataFormat = {title: '', date: '', id: 0};
export default {
  components: {
    userView: VueRun('components/user-view.vue')
  },
  setup(prop, ctx) {
    const {root} = ctx;
    const {title} = useInitTitle(ctx);
    const {ml_change, ml_data, ml_listsLoading, ml_page, ml_pagetotal, ml_pagesize, ml_currentChange, ml_sizeChange, ml_searchKey, ml_searchRow, ml_reloadLists, ml_getLists} = useInitPage();
    ml_searchKey.value = !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
    let searchKey = computed(() => {
      return !useRouter(ctx).route.query.hasOwnProperty('key') ? '' : useRouter(ctx).route.query.key;
    })
    watch(searchKey, (val) => {
      ml_searchKey.value = val;
    })

    onMounted(() => {
      ml_reloadLists();
    })

    watch(ml_change, (val) => {
      getLists();
    })

    function getLists() {
      let param = {page: ml_page.value, pagesize: ml_pagesize.value};
      if (ml_searchKey.value) {
        param['key'] = ml_searchKey.value;
      }
      isAddRow.value = false;
      ml_listsLoading.value = true;
      const {loading, error, data, run} = useRequest(userApi.groupLists(param));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          ml_data.value = JSON.parse(JSON.stringify(val.data.map((e) => {
            e._isEdit = false;
            e._isPopover = false;
            return e;
          })))
          useStore(ctx).commit('setGroups', ml_data.value)
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (err) => {
        useTip().message('warning', err);
      })
      watch([data, error], () => {
        ml_listsLoading.value = false;
      })
    }

    let tmpData = ref([]);
    let isAddRow = ref(false);
    let viewDialogVisible = ref(true);

    function useOpenRuleView(e) {
      useRouter(ctx).replace('/main/user/rules?key=' + e.row.id)
    }

    function useAddRowStatus() {
      isAddRow.value = true;
      ml_data.value.unshift(Object.assign({_isEdit: true, _isPopover: false, _isAdd: true}, dataFormat))
    }

    function useQuitRow(e) {
      let index = e.$index;
      if (!e.row._isAdd) {
        vue.set(ml_data.value, e.$index, Object.assign({}, (tmpData.value)[index]))
      } else {
        isAddRow.value = false;
        ml_data.value.splice(e.$index, 1);
      }
    }

    function useDeleteRow(e) {
      const {loading, error, data, run} = useRequest(userApi.deleteGroup({id: e.row}));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          ml_data.value.splice(e.$index, 1);
          ml_pagetotal.value--;
          root.$nextTick(() => {
            if (ml_data.length <= 0) getLists;
          })
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (err) => {
        useTip().message('warning', err);
      })
    }

    function useAddRow(e) {
      const {loading, error, data, run} = useRequest(userApi.createGroup(e.row));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          e.row._isEdit = false;
          e.row._isAdd = false;
          isAddRow.value = false;
          vue.set(ml_data.value, e.$index, Object.assign({}, e.row, val.data));
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (err) => {
        useTip().message('warning', err);
      })
    }

    function useEditRow(e) {
      if (e.row._isAdd) {
        useAddRow(e);
        return;
      }
      if (e.row._isEdit) {
        const {loading, error, data, run} = useRequest(userApi.updateGroup(e.row));
        watch(data, (val) => {
          if (val.data && val.code < 400) {
            e.row._isEdit = false;
            vue.set(ml_data.value, e.$index, Object.assign({}, e.row, val.data));
          } else {
            useTip().message('warning', val.msg);
          }
        })
        watch(error, (err) => {
          useTip().message('warning', err);
        })
      } else {
        vue.set(tmpData.value, e.$index, Object.assign({}, e.row));
        e.row._isEdit = !e.row._isEdit;
      }
    }

    function useGetEditBtnAttrs(e) {
      return e.row._isEdit
        ? {
          title: '提 交',
          type: 'primary',
          icon: 'el-icon-check'
        }
        : {
          title: '编 辑',
          type: 'info',
          icon: 'el-icon-edit'
        };
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
      useEditRow,
      useDeleteRow,
      viewDialogVisible,
      isAddRow,
      useAddRowStatus,
      useGetEditBtnAttrs,
      useQuitRow,
      useOpenRuleView
    };
  }
};
</script>

<style scoped>
.group-table {
  padding-bottom: 30px;
}
</style>
