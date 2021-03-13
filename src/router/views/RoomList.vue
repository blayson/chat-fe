<template>
    <div>
        <h1>Rooms</h1>
        <v-btn fab fixed bottom right color="blue" @click="createRoom = !createRoom">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="createRoom" max-width="600px">
            <v-card>
                <v-card-text>
                    <h1 style="padding-top: 15px">Create room</h1>
                    <v-spacer></v-spacer>
                    <create-room @onNewRoom="addNewRoom"></create-room>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="createRoom = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="rooms">
            <div v-for="room in rooms" :key="room.id_rooms" class="room">
                <v-card class="mx-auto" max-width="357">
                    <v-card-subtitle class="pb-0"><strong>{{room.title || "No room name" | capitalize }}</strong></v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div>Room owner: {{room.id_users_owner}}</div>
                        <div>Created: {{room.created}}</div>
                        <div v-show="room.lock==='false' ">Room unlocked</div>
                        <div v-show="room.lock==='true' ">Room locked</div>
                    </v-card-text>
                    <div v-if="room.id_users_owner===user.userId">
                        <v-btn color=#7E57C2 text outlined small v-if="room.lock==='true'"
                               class="roomCard" @click="room.lock='false'">
                            <unlockRoom :current-room-id="room.id_rooms"
                                        @onUnlockUpdate="room.lock='false'"></unlockRoom>
                        </v-btn>
                        <v-btn color=#7E57C2 text outlined small class="roomCard" @click="room.lock='true'"
                               v-else>
                            <lockRoom :current-room-id="room.id_rooms"
                                      @onLockUpdate="room.lock='true'"></lockRoom>
                        </v-btn>
                    </div>
                    <div v-if="allow">
                        <v-btn color=#7E57C2 text outlined small class="roomCard" style="margin-bottom: 10px"
                               v-if="room.lock==='false'" :to="{name:'room', params:{id: room.id_rooms}}"
                        >Enter
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateRoom from "../../components/CreateRoom";
    import LockRoom from "../../components/LockRoom";
    import UnlockRoom from "../../components/UnlockRoom";
    import {UPDATE_INTERVAL_ROOMS} from "../../code/constants";

    export default {
        components: {
            CreateRoom,
            LockRoom,
            UnlockRoom
        },
        name: "RoomList",
        data() {
            return {
                createRoom: false,
                rooms: [],
                hover: false,
                allow: true,

            }
        },
        props: {
            user: Object
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        methods: {
            async loadAllRooms() {
                const response = await this.$http.get("/auth/rooms")
                this.rooms = response.data
            },
            addNewRoom(newRoom) {
                this.rooms.push(newRoom)
            }
        },
        mounted() {
            this.loadAllRooms()
            this.timer = setInterval(this.loadAllRooms, UPDATE_INTERVAL_ROOMS);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped>
    .rooms {
        display: flex;
        flex-wrap: wrap;
    }

    .rooms .room {
        padding: 10px 15px;
        margin: 5px;
    }
</style>