<template id="login">
    <div>
        <div class="center">
            <el-card class="box-card login-card">
                <div slot="header" class="header">
                    <span class="sign-title">项目管理系统</span>
                </div>
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="sign-btn sign-local-btn" @click="signIn">登陆</el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>

import Account from '../script/server/account.js'

export default {
    data: function () {
        return {
            form: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ],
            },
        }
    },
    methods: {
        signIn: function () {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    Account.signIn({
                        username: this.form.name,
                        password: this.form.password
                    }).then(this.signCallback);
                }
            });
        },
        signCallback: function (res) {
            if (res) {
                //保存token
                localStorage.setItem("pm_token", res.token);
                this.$cookie.set('pm_token', res.token);
                this.$router.push('index').catch(err => err)
            }
        },
    },
    mounted: function () {
    },
}
</script>

<style scoped>

.login-card {
    width: 300px;
    margin-top: 30vh;
}

.sign-title {
    font-size: x-large;
    color: #347dd6;
    font-weight: 700;
}

.header {
    text-align: center;
}

.sign-btn {
    width: 100%;
    margin-left: 0 !important;
}

.center {
    background-size: cover;
    background-color: #f7f3f3;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: flex-start;
}

</style>
