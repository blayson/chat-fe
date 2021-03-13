<template>
    <div>
        <v-form @submit.prevent="deleteRoom" class="form">
            <h2 style="padding: 10px; margin-bottom: 10px">Delete room?</h2>
            <v-btn color="error" type="submit" style="margin-top: 10px">
                Yes
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "DeleteRoom",
        data() {
            return {
                title: ""
            }
        },
        props: {
            currentRoomId: {
                type: String,
                required: true
            },
        },
        methods: {
            async deleteRoom() {
                try {
                    const response = await this.$http.delete(`/auth/rooms/${this.currentRoomId}`);
                    if (response.status === 204) {
                        this.$emit("onDeleteRoom");
                    }
                } catch (err) {
                    //
                }
            }
        }
    }
</script>

<style scoped>

</style>