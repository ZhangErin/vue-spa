import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openedTabs: [], //所有打开的路由
    activeIndex: '', //激活状态
    dialogVisible: false,
    subPageHref:'',
    subPageParams: '',
    subPageTitle:'',
    cancelCallback: '',
    confirmCallback: '',
    URLQueryMap:{},
    rightMenuData: [{
      name: '刷新此窗口',
      key:'refresh'
    }, {
        name: '关闭此窗口',
        key: 'close'
      }, {
        name: '关闭全部窗口',
        key: 'closeAll'
      }]
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      global.pageMap[data.route] = true;
      this.state.openedTabs.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openedTabs) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openedTabs.splice(index, 1);
    },
    delete_allTabs() {
      this.state.openedTabs = [];
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
   
      this.state.activeIndex = index;
    },
    set_url_map(state, tab) {
      this.state.URLQueryMap[tab.path] = tab.query
    },
    set_D_visible(state, val) {
      this.state.dialogVisible = val;
    },
    setModalCallback(state, callback) {
      this.state.cancelCallback = callback.cancel;
      this.state.confirmCallback = callback.confirm;
    },
    do_cancel() {
      this.state.cancelCallback();
    },
    do_confirm() {
      this.state.confirmCallback();
    },
    set_subPageHref(state, herf) {
      this.state.subPageHref = herf;
    },
    set_subPageParams(state, params) {
      this.state.subPageParams = params;
    },
    set_subPageTitle(state, title) {
       this.state.subPageTitle = title;
    }
  },
  actions: {

  }
})
