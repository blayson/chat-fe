<template>
    <div>
        <v-list>
            Number of users: {{number}}
            <v-list-item v-for="user in usersInRoom" :key="user.id_users">
                <v-list-item-content>
                    <v-list-item v-text="user.login"></v-list-item>
                </v-list-item-content>
<!--                <v-list-item-icon v-if="currentUserId===userOwner">-->
                    <!--                    <delete-user-from-room :userIdInRoom="user.id_users" :currentUserId="currentUserId"-->
                    <!--                                           :roomId="roomId"-->
                    <!--                                           @onDeleteUserFromRoom="deleteUserFromRoom"></delete-user-from-room>-->
<!--                </v-list-item-icon>-->


            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import {UPDATE_USERS_IN_ROOM_INTERVAL} from "../code/constants";

    export default {
        name: "RoomUsers",
        data() {
            return {
                usersInRoom: [],
                number: 0,
                open: false,
                dialog: false,
                block: false
            }
        },
        props: {
            user: Object,
            roomId: {
                type: String,
                required: true
            },
            currentUserId: {
                type: String,
                required: true
            },
            userOwner: {
                type: String,
                required: true
            },

        },
        methods: {
            async loadAllUsersInRoom() {
                const response = await this.$http.get(`/auth/usersInRoom/${this.roomId}`);
                this.usersInRoom = response.data;
                this.number = response.data.length;
                console.log(this.usersInRoom)
                this.$emit("onUsersInRoom", response.data);
            },

            deleteUserFromRoom(user) {
                this.block = true;
                this.$emit("onBlockUser", user);

                // this.usersInRoom.splice(this.usersInRoom.indexOf(user), 1);
                //

            },
            redirect() {
                this.dialog = false;
                window.location.href = '/rooms';
            }

        },
        mounted() {
            this.loadAllUsersInRoom();
            this.timer = setInterval(this.loadAllUsersInRoom, UPDATE_USERS_IN_ROOM_INTERVAL);
        },


        beforeDestroy() {
            clearInterval(this.timer);
        }

    }
</script>

<style scoped>

</style>