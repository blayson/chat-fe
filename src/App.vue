<template>
    <v-app id="app">
        <my-header :user="userId" :logoutFunction="doLogout"></my-header>
        <v-content>
            <v-container>
                <router-view @userLogged="onUserLog" :user="userId"></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import MyHeader from "./components/Header";
    import {tokenManager} from "./main";

    export default {
        name: 'App',
        components: {
            MyHeader,
        },
        data() {
            return {
                userId: null,
            }
        },
        methods: {
            doLogout() {
                this.userId = null;
                tokenManager.logout()
                this.$router.push({name: "home"})
            },
            onUserLog(data) {
                this.userId = data
            }
        },
        mounted() {
            this.userId = tokenManager.getPayload()
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .form-item {
        margin: 10px;
    }
    .form-error {
        color: crimson;
    }
    .form-item label {
        width: 150px;
        display: inline-block;
    }
    form .form{
        display: inline-block;
        text-align: left;
    }
    .form-submit {
        text-align: center;
    }
    .form-submit-btn {
        padding: 8px 16px;
        width: 50%;
        border-radius: 5px;
    }
</style>
