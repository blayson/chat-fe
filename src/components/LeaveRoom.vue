<template>
    <div>
        <v-btn right fixed top style="margin-top: 50px" color="red" @click="leaveRoom">
            Leave from room
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "LeaveRoom",
        props: {
            user: Object,
            roomId: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            }
        },
        methods: {
            async leaveRoom() {
                try {
                    const response = await this.$http.delete(`/auth/usersInRoom/${this.roomId}/${this.userId}`);
                    {
                        if (response.status === 204) {
                            this.$emit("onLeaveRoom");
                        }
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