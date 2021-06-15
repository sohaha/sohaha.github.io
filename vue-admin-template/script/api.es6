export function useRequestPage(fn, p = {}, o = {}) {
  return apiUtil.useRequestPage(fn, p, o);
}

export function useRequestWith(fn, o = {}) {
  return apiUtil.useRequestWith(fn, o);
}

export function useRequest(fn, o = {}) {
  return apiUtil.useRequest(fn, o);
}

export const user = {
  demo(data) {
    return app.request.get('/Manage/UserApi/demo.go?');
  },
  demoUpload() {
    return config.baseURL + '/Manage/UserApi/upload.go';
  },
  current(data) {
    return ['get', '/Manage/UserApi/UseriInfo.go', data];
  },
  userInfo: ['get', '/Manage/UserApi/UseriInfo.go'],
  login(data) {
    return app.request.post('/Manage/UserApi/GetToken.go', data);
  },
  logout() {
    return app.request.post('/Manage/UserApi/ClearToken.go');
  },
  list(data) {
    return app.request.get('/Manage/UserManageApi/UserLists.go', data);
  },
  uploadAvatar() {
    return config.baseURL + '/Manage/UserApi/UploadAvatar.go';
  },
  updateUser(data) {
    return app.request.put('/Manage/UserApi/Update.go', data);
  },
  createUser(data) {
    return app.request.post('/Manage/UserManageApi/User.go', data);
  },
  deleteUser(data) {
    return app.request.delete('/Manage/UserManageApi/User.go', data);
  },
  unreadMessageCount() {
    return app.request.get('/Manage/UserApi/UnreadMessageCount.go');
  },
  updateMessageStatus(data) {
    return app.request.put('/Manage/UserApi/MessageStatus.go', data);
  },
  sysUserLogs(data) {
    return app.request.get('/Manage/UserApi/Logs.go', data);
  },
  editPassword(data) {
    return app.request.put('/Manage/UserApi/EditPassword.go', data);
  },
  logs(data) {
    return app.request.get('/Manage/SystemApi/SystemLogs.go', data);
  },
  logsDelete(data) {
    return app.request.delete('/Manage/SystemApi/SystemLogs.go', data);
  },
  getSystemConfig(data) {
    return app.request.get('/Manage/SystemApi/SystemConfig.go', data);
  },
  setSystemConfig(data) {
    return app.request.put('/Manage/SystemApi/SystemConfig.go', data);
  },
  groupLists(data) {
    return app.request.get('/Manage/UserManageApi/Groups.go', data);
  },
  createGroup(data) {
    return app.request.post('/Manage/UserManageApi/Groups.go', data);
  },
  updateGroup(data) {
    return app.request.put('/Manage/UserManageApi/Groups.go', data);
  },
  deleteGroup(data) {
    return app.request.delete('/Manage/UserManageApi/Groups.go', data);
  },
  groupInfo(data) {
    return app.request.get('/Manage/UserManageApi/GroupInfo.go', data);
  },
  ruleLists(data) {
    return app.request.get('/Manage/UserManageApi/Rules.go', data);
  },
  addRule(data) {
    return app.request.post('/Manage/UserManageApi/Rules.go', data);
  },
  editRule(data) {
    return app.request.put('/Manage/UserManageApi/Rules.go', data);
  },
  updateUserRuleStatus(data) {
    return app.request.put('/Manage/UserManageApi/UpdateUserRuleStatus.go', data);
  },
  deleteRule(data) {
    return app.request.delete('/Manage/UserManageApi/Rules.go', data);
  }
};

export const sys = {
  sysUpdateGroupMenu(data) {
    return app.request.post('/Manage/MenuApi/UpdateGroupMenu.go', data);
  },
  sysUserMenu(data) {
    return app.request.post('/Manage/MenuApi/UserMenu.go', data);
  },
  sysMenuCreate(data) {
    return app.request.post('/Manage/MenuApi/Create.go', data);
  },
  sysMenuDelete(data) {
    return app.request.post('/Manage/MenuApi/Delete.go', data);
  },
  sysMenuUpdate(data) {
    return app.request.post('/Manage/MenuApi/Update.go', data);
  },
  sysMenuSort(data) {
    return app.request.post('/Manage/MenuApi/Sort.go', data);
  },
  getSetting() {
    return ['get', '/Manage/SystemApi/Setting.go'];
  },
  setSetting(data) {
    return ['put', '/Manage/SystemApi/Setting.go', data];
  },
};
