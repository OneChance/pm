import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import cookie from 'vue-cookie';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Print from '../plugin/print/print'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import dayjs from 'dayjs'
import _ from 'lodash'

//路由模块
import Sign from '../components/Sign.vue';
import Index from '../components/Index.vue';
import SysRole from "../components/sys/SysRole";
import SysUser from "../components/sys/SysUser";
import SysComponent from "../components/SysComponent";

//网络工具
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

// ElementUI
Vue.use(ElementUI);

//图片预览插件
Vue.use(preview)

// 设置COOKIE工具
Vue.use(cookie)

// 使用路由插件
Vue.use(VueRouter);

//日期插件
Vue.prototype.dayjs = dayjs

//lodash
Vue.prototype._ = _

//消除重复路由控制台错误提示
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//打印插件
Vue.use(Print)

export default {
    vueG: null,  //全局Vue对象
    init() {
        if (!this.vueG) {
            const routes = [
                {path: '/', redirect: '/sign'},
                {path: '/sign', component: Sign},
                {
                    path: '/index',
                    component: Index,
                    children: [
                        {
                            path: 'sys',
                            component: SysComponent,
                            children: [
                                {path: 'user', component: SysUser},
                                {path: 'role', component: SysRole},
                            ]
                        },
                    ]
                },
            ];

            const router = new VueRouter({
                routes,
            });

            this.vueG = new Vue({
                router,
                data: function () {
                    return {
                        loginUser: {},
                    }
                }
            });
        }
    },
};
