<template>
  <div>
    <div class="view-title float-clear">
      <div class="view-title-right">
        <el-form @submit.prevent.stop.native inline class="tip-top">
          <el-form-item>
            <el-button type="info" size="mini" @click="ml_reloadLists" icon="el-icon-refresh">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tip-area">温馨提示: 这个一个示例页面</div>
    <fieldset>
      <legend>{{ title }}</legend>
      <aside v-loading="ml_listsLoading">
        <el-table :data="ml_data" style="width: 100%" size="mini">
          <el-table-column show-overflow-tooltip label="标题" width="170">
            <template slot-scope="scope">
              <div>{{ scope.row.title || ' - ' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">{{ scope.row.__ || '--' }}</template>
          </el-table-column>
        </el-table>
        <div class="tip-page" v-if="!!ml_pagetotal">
          <el-pagination
              :current-page.sync="ml_page"
              @size-change="ml_sizeChange"
              @current-change="ml_currentChange"
              background
              layout="prev, pager, next, sizes, total"
              :total="ml_pagetotal"
              :page-size.sync="ml_pagesize"
          ></el-pagination>
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
export default {
  components: {},
  setup(prop, ctx) {
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
      ml_listsLoading.value = true;
      const {loading, error, data, run} = useRequest(() => {
        return Promise.resolve({code: 200, data: [1]});
      });
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          let fakeData = {
            data: {
              items: [
                {title: "demo1", date: "2020-01-01"},
                {title: "demo2", date: "2020-01-01"},
                {title: "demo3", date: "2020-01-01"}
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
      ml_getLists
    };
  }
};
</script>

<style scoped>
</style>
