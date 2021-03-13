<template>
    <div class="newRoom">
        <v-form ref="form" v-model="valid" @submit.prevent="createRoom" class="form" lazy-validation>
            <v-text-field v-model="title" label="Title" :rules="titleRules" required>
            </v-text-field>
            <v-btn color="success"
                   type="submit"
                   class="form-submit"
                   :disabled="!valid"
            >Create
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "CreateRoom",
        data() {
            return {
                title: "",
                titleRules: [
                    v => !!v || "Title je povinny!"
                ],
                valid: true
            }
        },
        methods: {
            async createRoom() {
                try {
                    this.$refs.form.validate()
                    const response = await this.$http.post("/auth/rooms", {title: this.title})
                    this.title = ""
                    this.isFormShow = false
                    this.$emit("onNewRoom", response.data)
                } catch (e) {
                    await this.$router.push({name: "notFound"});
                }
            }
        }
    }
</script>

<style scoped>
    .newRoom {
        margin-top: 50px;
    }
</style>