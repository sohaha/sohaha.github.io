<template>
  <div class="page-sys-logs">
    <div class="view-title float-clear no">
      <span>{{ title }}</span>
      <div class="view-title-right">
        <el-form @submit.prevent.stop.native inline class="tip-top">
          <el-form-item>
            <el-select clearable size="mini" v-model="logType" placeholder="请选择状态">
              <el-option
                v-for="item in logTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="info" size="mini" @click="ml_reloadLists" icon="el-icon-refresh">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :key="k" v-for="(v,k) in tabs" :label="v" :name="k"></el-tab-pane>
    </el-tabs>
    <fieldset>
      <legend>{{ tabTitle }}</legend>
      <div v-loading="ml_listsLoading">
        <el-table
          empty-text="暂无对应消息"
          @selection-change="handleSelectionChange"
          :data="ml_data"
          style="width: 100%"
          size="mini"
        >
          <el-table-column :selectable="isUnreadMessageTab" type="selection" width="55"></el-table-column>
          <el-table-column prop="create_time" label="日期" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip prop="username" label="触发用户" width="100"></el-table-column>
          <el-table-column label="日志" min-width="220">
            <template slot-scope="scope">
              <div class="text-nowrap" :title="scope.row.content">{{ scope.row.content }}</div>
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <el-tag
                size="mini"
                v-bind="getTagAttrs(scope.row.type)"
                v-text="getTagAttrs(scope.row.type).title"
              ></el-tag>
            </template>
          </el-table-column>
          <el-table-column min-width="100" label="操作">
            <template slot-scope="scope">
              <div class="text-nowrap">
                <el-button
                  type="primary"
                  v-if="isUnreadMessageTab(scope.row)"
                  title="标记已读"
                  size="mini"
                  @click="readSelection(scope.row.id)"
                >标记已读
                </el-button>
                <span v-else>--</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="tip-page" v-if="!!ml_pagetotal">
          <div class="panel-left" v-show="showColumnBtn">
            <el-button
              @click="readSelection()"
              size="mini"
              type="primary"
              icon="icon-inbox"
              title="标记已读"
            ></el-button>
          </div>
          <el-pagination
            :current-page.sync="ml_page"
            @size-change="ml_sizeChange"
            @current-change="ml_currentChange"
            background
            layout="prev, pager, next, sizes"
            :total="ml_pagetotal"
            :page-size.sync="ml_pagesize"
          ></el-pagination>
        </div>
      </div>
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
      if (ml_listsLoading.value) {
        return;
      }
      let param = {
        page: ml_page.value,
        pagesize: ml_pagesize.value,
        unread: +(activeName.value === "unreadMessage"),
        type: logType.value
      };
      ml_listsLoading.value = true;
      const {loading, error, data, run} = useRequest(userApi.sysUserLogs(param));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          let items = val.data.items.map((v) => {
            v.username = !!v.username ? v.username : "游客";
            return v;
          })
          ml_getLists(items, val.data.page);
          // ml_getLists(JSON.parse(JSON.stringify(res)), page);
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

    let activeName = ref("unreadMessage");
    const tabs = reactive({
      unreadMessage: "未读消息",
      allMessage: "全部消息"
    });

    const logTypes = reactive([
      {label: "普通日志", value: 1, type: ""},
      {label: "警告日志", value: 2, type: "warning"},
      {label: "错误日志", value: 3, type: "danger"}
    ]);
    let logType = ref("");
    watch(logType, (val) => {
      ml_reloadLists();
    })

    const tabTitle = computed(() => {
      return tabs[activeName.value];
    })

    let selectIds = ref([]);
    const showColumnBtn = computed(() => {
      return selectIds.value.length > 0;
    })

    function getTagAttrs(i) {
      for (let j = 0, length = logTypes.length; j < length; j++) {
        if (logTypes[j]["value"] === i) {
          return {
            title: logTypes[j].label,
            type: logTypes[j].type,
          };
        }
      }
      return {};
    }

    function readSelection(e) {
      let paramData = {ids: []};
      if (!e) {
        paramData.ids = selectIds.value;
      } else {
        paramData.ids = [e];
      }
      const {loading, error, data, run} = useRequest(userApi.updateMessageStatus(paramData));
      watch(data, (val) => {
        if (val.data && val.code < 400) {
          window["SysGetUnreadMessageCount"] &&
          window["SysGetUnreadMessageCount"]();
          ml_reloadLists();
        } else {
          useTip().message('warning', val.msg);
        }
      })
      watch(error, (err) => {
        useTip().message('warning', err);
      })
    }

    function handleSelectionChange(e) {
      selectIds.value = e.map((e) => {
        return e.id;
      })
    }

    function isUnreadMessageTab(row) {
      return row.status === 1;
    }

    function handleClick(tab, event) {
      ml_page.value = 1;
      root.$nextTick(() => {
        getLists();
      })
    }

    return {
      title,
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
      logType,
      logTypes,
      activeName,
      tabs,
      tabTitle,
      showColumnBtn,
      handleClick,
      handleSelectionChange,
      isUnreadMessageTab,
      getTagAttrs,
      readSelection
    };
  }
};
</script>

<style scoped>
.page-sys-logs .el-form-item {
  max-width: 120px;
}
</style>
