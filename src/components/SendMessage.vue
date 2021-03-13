<template>
    <v-col>
        <v-form @submit.prevent="sendMessage" class="from" lazy-validation ref="form" v-model="valid">
            <v-textarea v-model="message" :rules="messageRules" placeholder="Type message.."></v-textarea>
            <v-btn type="submit" class="form-submit-btn" :disabled="!valid">Send</v-btn>
        </v-form>
    </v-col>

</template>

<script>
    export default {
        data() {
            return {
                message: "",
                messageRules: [
                    v => !!v || "Message is empty"
                ],
                valid: false
            }
        },
        props: {
            roomId: {
                type: String,
                required: true
            },
            currentUserId: {
                type: String,
                required: true
            },
        },
        methods: {
            async sendMessage() {
                try {
                    this.$refs.form.validate()
                    const response = await this.$http.post(
                        `/auth/rooms/${this.roomId}/messages`,
                        {
                            id_users_from: this.currentUserId,
                            id_users_to: null,
                            message: this.message
                        }
                    )
                    this.$emit("onNewMessage", response.data)
                    this.message = ""
                } catch (e) {
                    // TODO
                }
            }
        }
    }
</script>

<style scoped>

</style>