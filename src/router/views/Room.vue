<template>
    <div>
        <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                v-if="isLoading"
                indeterminate
        ></v-progress-circular>
        <div v-else>
            <h3>{{room.title | capitalize }}</h3>
            <p>Room owner <b>{{room.id_users_owner}}</b></p>
            <v-row>
                <v-col>
                    <div v-if="user.userId !== room.id_users_owner">
                        <leave-room :userId="user.userId"
                                    :roomId="room.id_rooms"
                                    @onLeaveRoom="leaveRoom"></leave-room>
                    </div>
                    <div v-else>
                        <owner-leaves :userId="user.userId"
                                           :roomId="room.id_rooms" :usersInRoom="users"
                                           @onLeaveRoom="leaveRoom">
                        </owner-leaves>
                    </div>

                </v-col>
            </v-row>
            <div>
                <v-btn color=#7E57C2 text outlined small class="myRoomCard"
                       v-if="room.id_users_owner===user.userId || user.userRole === 'admin'"
                       @click="dialog = !dialog">Delete
                </v-btn>
                <v-dialog v-model="dialog" max-width="600px" :retain-focus="false"
                          :current-room-id="room.id_rooms">
                    <v-card>
                        <v-card-text>
                            <div v-if="this.showDelete">
                                <v-spacer></v-spacer>
                                <delete-room :current-room-id="room.id_rooms"
                                             @onDeleteRoom="deleteThisRoom"></delete-room>
                            </div>
                            <div v-else>
                                <v-alert dense outlined type="error">
                                    Users in room still presented
                                </v-alert>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click=redirect>Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <v-container fluid style="padding: 0;">
                <v-row >
                    <v-col class="scrollable" >
                        <v-card class="pa-2" margin="10px" tile>
                            <h2>Users: </h2>
                            <room-users :room-id="room.id_rooms" :user-owner="room.id_users_owner"
                                        :current-user-id="user.userId" :user="user" @onUsersInRoom="usersCount">
                            </room-users>
                        </v-card>

                    </v-col>
                    <v-col sm="9" style="position: relative;">
                        <v-card class="chat" tile>
                            <messages :room-id="room.id_rooms" :current-user-id="user.userId"/>
                        </v-card>

                    </v-col>


                </v-row>

                <v-row>

                    <!--                    <isInRoom :room-id="room.id_rooms" :user-id="user.userId"-->
                    <!--                              @isInRoon="isInThisRoom">-->
                    <!--                    </isInRoom>-->
                </v-row>
            </v-container>
        </div>
<!--        <div v-else>-->
<!--            <h2>Hello in room: <b>{{room.title}}</b>!</h2>-->
<!--            <messages :room-id="room.id_rooms" :current-user-id="user.userId"/>-->
<!--        </div>-->
    </div>
</template>

<script>
    import Messages from "../../components/Messages";
    import DeleteRoom from "../../components/DeleteRoom";
    import RoomUsers from "../../components/RoomUsers";
    import LeaveRoom from "../../components/LeaveRoom";
    import OwnerLeaves from "../../components/OwnerLeaves";

    export default {
        name: "Room",
        components: {
            OwnerLeaves,
            Messages,
            DeleteRoom,
            RoomUsers,
            LeaveRoom
        },
        props: {
            user: Object
        },
        data() {
            return {
                room: null,
                isLoading: true,
                numberOfUsers: 0,
                users: [],
                showDelete: true,
                dialogIsInRoom: false,
                dialog: false,
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        methods: {
            usersCount(users) {
                this.numberOfUsers = users.length;
                this.users = users;
                this.showDelete = users.length <= 1;
            },
            redirect() {
                this.dialog = false;
            },
            async loadRoom() {
                try {
                    const response = await this.$http.get(`/auth/rooms/${this.$route.params.id}`);
                    this.room = response.data;
                } catch (e) {
                    await this.$router.push({name: "notFound"});
                }
                this.isLoading = false;
            },
            deleteThisRoom() {
                // window.location.href = '/rooms';
                this.$router.push({path: '/rooms'})
            },

            leaveRoom() {
                window.location.href = '/rooms';
            }
        },
        mounted() {
            this.loadRoom();
        },
    }

</script>

<style scoped>

</style>