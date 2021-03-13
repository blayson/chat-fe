<template>
    <v-app-bar app dense color="indigo" dark>
        <router-link :to="{name: 'home'}" tag="button" active-class="active" class="home-btn" exact>
            <v-toolbar-title>WA Chat</v-toolbar-title>
        </router-link>
        <v-spacer/>
        <div v-if="isUserLogged">Hello <b>{{user.userId}}</b>!
            <router-link :to="{name: 'rooms'}" tag="button" exact>
                <v-btn outlined>
                    rooms
                </v-btn>
            </router-link>
            <router-link :to="{name: 'profile', params:{id: user.userId}}" tag="button" exact>
                <v-btn outlined>
                    profile
                </v-btn>
            </router-link>
            <a href="" @click.prevent="logoutFunction" v-if="isUserLogged" style="color: whitesmoke; margin-left: 5px">Logout</a></div>

        <div v-else class="actions">
            <router-link :to="{name: 'login'}" tag="button" exact>
                <v-btn outlined>
                    login
                </v-btn>
            </router-link>
            <router-link :to="{name: 'register'}" tag="button" exact>
                <v-btn outlined>
                    Register
                </v-btn>
            </router-link>
        </div>
    </v-app-bar>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: false
            },
            logoutFunction: Function
        },
        computed: {
            isUserLogged() {
                return this.user != null
            }
        },
        name: "Header",

    }
</script>

<style scoped>

</style>