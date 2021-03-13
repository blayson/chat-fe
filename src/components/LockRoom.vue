<template>
    <div  @click="lockRoom">Lock</div>
</template>

<script>
    export default {
        name: "LockRoom",
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
            async lockRoom() {
                try {
                    const response = await this.$http.put(`/auth/lock/${this.currentRoomId}`,
                        {
                            lock: 'true'
                        }
                    );
                    if (response.status === 204) {
                        this.$emit("onLockUpdate");

                    }
                } catch (err) {
                    await this.$router.push({name: "notFound"});

                }
            },

        }
    }
</script>

<style scoped>

</style>