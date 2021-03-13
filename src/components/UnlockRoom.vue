<template>
    <div  @click="unlockRoom">Unlock</div>
</template>

<script>
    export default {
        name: "UnlockRoom",
        data() {
            return {
                lock: "",

            }
        },
        props: {
            currentRoomId: {
                type: String,
                required: true
            },
        },
        methods: {
            async unlockRoom() {
                try {
                    const response = await this.$http.put(`/auth/lock/${this.currentRoomId}`,
                        {
                            lock: 'false'
                        }
                    );
                    if (response.status === 204) {
                        this.$emit("onUnlockUpdate");

                    }
                } catch (err) {
                    this.$router.push({name: "notFound"});
                }
            },

        }
    }
</script>

<style scoped>

</style>