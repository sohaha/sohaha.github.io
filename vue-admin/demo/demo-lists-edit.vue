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
      <aside v-loading="ml_listsLoading">
        <el-table @selection-change="useHandleSelectionChange" :data="ml_data" style="width: 100%" size="mini">
          <el-table-column :selectable="useSelectable" type="selection" width="55"></el-table-column>
          <el-table-column label="标题">
            <template slot-scope="scope">
              <div v-if="scope.row._isEdit">
                <el-input v-model="scope.row.title" placeholder size="mini"></el-input>
              </div>
              <div v-else class="text-nowrap" :title="scope.row.title">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <div class="btns-operating">
                <el-button :loading="scope.row._loading" v-bind="useGetEditBtnAttrs(scope)" size="mini"
                           @click="useEditRow(scope)">{{ useGetEditBtnAttrs(scope).title }}
                </el-button>
                <el-button v-if="scope.row._isEdit" title="放 弃" @click="useQuitRow(scope)" size="mini"
                           :loading="scope.row._loading" icon="el-icon-close">放 弃
                </el-button>
                <template>
                  <el-popover placement="top" width="160" v-model="scope.row._isPopover">
                    <p>确定删除吗？</p>
                    <div>
                      <el-button size="mini" @click="scope.row._isPopover = false" type="info" plain>取 消</el-button>
                      <el-button type="danger" size="mini" @click="useDeleteRow(scope)" plain>确 定</el-button>
                    </div>
                    <el-button v-show="!scope.row._isEdit" slot="reference" size="mini" type="danger"
                               icon="el-icon-delete" title="删 除">删 除
                    </el-button>
                  </el-popover>
                </template>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="tip-page" v-if="!!ml_pagetotal">
          <div class="panel-left" v-show="showColumnBtn">
            <el-button @click="useDeleteSelection" size="mini" type="danger" icon="el-icon-delete"
                       title="删除选中"></el-button>
          </div>
          <el-pagination :current-page.sync="ml_page" @size-change="ml_sizeChange" @current-change="ml_currentChange"
                         background layout="prev, pager, next, sizes, total" :total="ml_pagetotal"
                         :page-size.sync="ml_pagesize"></el-pagination>
        </div>
      </aside>
    </fieldset>
  </div>
</template>
<script>
const {ref, reactive, computed, onMounted, watch} = vue;
const {useRouter, useStore, useCache, useTip, useLoading} = hook;
const {user: userApi, useRequest} = api;
const {useInitTitle, useInitPage, getInfo} = util;

let dataFormat = {title: '', date: '', id: 0};

export default {
  components: {},
  setup(prop, ctx) {
    const {root} = ctx;
    const {title} = useInitTitle(ctx);

    const {ml_change, ml_data, ml_listsLoading, ml_page, ml_pagetotal, ml_pagesize, ml_currentChange, ml_sizeChange, ml_searchKey, ml_searchRow, ml_reloadLists, ml_getLists} = useInitPage();
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
      const {loading, error, data, run} = useRequest(() => {
        return Promise.resolve({code: 200, data: [1]});
      });
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          let fakeData = {
            data: {
              items: [
                {id: 1, title: 'demo1', date: '2020-01-01'},
                {id: 2, title: 'demo2', date: '2020-01-01'},
                {id: 3, title: 'demo3', date: '2020-01-01'}
              ],
              page: {total: 40}
            }
          };
          let res = (fakeData.data.items || []).map((e) => {
            e._isEdit = false;
            e._isPopover = false;
            return e;
          })

          let page = fakeData.data.page;
          ml_getLists(JSON.parse(JSON.stringify(res)), page);
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (val) => {
        if (val) {
          useTip().message('warning', val);
        }
      })
      watch([data, error], () => {
        ml_listsLoading.value = false;
      })
    }

    let tmpData = ref([]);
    let selectIds = ref([]);
    let isAddRow = ref(false);

    const showColumnBtn = computed(() => {
      return (selectIds.value).length > 0;
    })

    function useHandleSelectionChange(e) {
      selectIds.value = e.map((e) => {
        return e.id;
      })
    }

    function useSelectable(row, index) {
      return true;
    }

    function useDeleteSelection() {
      console.log('删除选择', selectIds.value);
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
      const {loading, error, data, run} = useRequest(() => {
        return Promise.resolve({code: 200, data: [1]});
      });
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          ml_data.value.splice(e.$index, 1);
          ml_pagetotal.value--;
          root.$nextTick(() => {
            if ((ml_data.value).length <= 0) getLists();
          })
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (val) => {
        if (val) {
          useTip().message('warning', val);
        }
      })
      watch([data, error], () => {
      })
    }

    function useAddRow(e) {
      e.row._loading = true;
      const {loading, error, data, run} = useRequest(() => {
        return Promise.resolve({code: 200, data: [1]});
      });
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          let v = {data: {}};
          e.row._isEdit = false;
          e.row._isAdd = false;
          e.row._loading = false;
          isAddRow.value = false;
          vue.set(ml_data.value, e.$index, Object.assign({}, e.row, v.data))
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (val) => {
        if (val) {
          e.row._loading = false;
          useTip().message('warning', val);
        }
      })
      watch([data, error], () => {
      })
    }

    function useEditRow(e) {
      if (e.row._isAdd) {
        useAddRow(e);
        return;
      }
      if (e.row._isEdit) {
        const {loading, error, data, run} = useRequest(() => {
          return Promise.resolve({code: 200, data: [1]});
        });
        watch(data, (val) => {
          if (val.data && val.code < 400) {
            let v = {data: {}};
            e.row._isEdit = false;
            vue.set(ml_data.value, e.$index, Object.assign({}, e.row, v.data))
          } else {
            useTip().message('warning', val.msg);
          }
        })
        watch(error, (val) => {
          if (val) {
            useTip().message('warning', val);
          }
        })
        watch([data, error], () => {
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
      ml_change,
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
      isAddRow,
      useAddRowStatus,
      useHandleSelectionChange,
      useSelectable,
      showColumnBtn,
      useDeleteSelection,
      useGetEditBtnAttrs,
      useEditRow,
      useQuitRow,
      useDeleteRow
    };
  }
};
</script>

<style scoped>
</style>
