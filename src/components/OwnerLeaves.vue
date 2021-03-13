<template>
    <div>
        <v-btn right fixed top style="margin-top: 50px"
               color="red"
               @click="leaveRoom">
            Leave from room
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "OwnerLeaves",
        data(){
            return{
                randomId: null
            }
        },
        props: {
            user: Object,
            roomId: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
            usersInRoom: {
                type:  Array,
                required: true
            }


        },
        methods: {
            async leaveRoom() {
                try {
                    if (this.usersInRoom.length > 1) {
                        this.getRandomUser();
                    }
                    await this.changeOwner();
                    const response = await this.$http.delete(`/auth/usersInRoom/${this.roomId}/${this.userId}`);
                    {
                        if (response.status === 204) {
                            this.$emit("onLeaveRoom");
                        }

                    }
                } catch (err) {
                    await this.$router.push({name: "notFound"});
                }
            },
            async changeOwner() {
                try {
                    this.getRandomUser();
                    await this.$http.put(`/auth/updateOwner/${this.roomId}`,
                        {
                            id_users_owner: this.randomId
                        }
                    );
                } catch (err) {
                    await this.$router.push({name: "notFound"});

                }
            },
            getRandomUser() {
                try {
                    this.randomId = this.userId;
                    while (this.userId === this.randomId) {
                        let chosenNumber = Math.floor(Math.random() * this.usersInRoom.length);
                        this.randomId = (this.usersInRoom[chosenNumber]).id_users;
                    }
                } catch (err) {
                    //
                }
            },
        }
    }
</script>

<style scoped>

</style>