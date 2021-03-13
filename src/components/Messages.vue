<template>
    <div class="chat-messages">
        <v-row>
            <div class="chat-container">
                <div v-for="message in messages" :key="message.id_messages" class="message"
                     :class="{'my': message.id_users_from === currentUserId}">
                    <b>{{message.id_users_from}}</b>: {{message.message}}
                </div>
            </div>
        </v-row>
        <v-row style="padding: 10px">
            <send-message :room-id="roomId" :current-user-id="currentUserId" @onNewMessage="addNewMessage"/>
        </v-row>
    </div>
</template>

<script>
    import {MESSAGES_UPDATE_INTERVAL} from "../code/constants";
    import SendMessage from "./SendMessage";

    export default {
        components: {
            SendMessage
        },
        data() {
            return {
                messages: [],
                timer: null
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
            async loadMessages() {
                try {
                    const response = await this.$http.get(`/auth/rooms/${this.roomId}/messages`)
                    this.messages = response.data
                } catch (e) {
                    // TODO
                }
            },
            addNewMessage(newMessage) {
                this.messages.push(newMessage)
            }
        },
        mounted() {
            this.loadMessages()
            this.timer = setInterval(this.loadMessages, MESSAGES_UPDATE_INTERVAL)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>
    .chat-container {
        height: calc(80vh - 17rem);
        overflow-y: auto;
        overflow-x: auto;
        padding: 10px;
        width: 95%;
        margin-left: 3%;
        background-color: white;
    }

    .chat-container .username {
        font-size: 18px;
        font-weight: bold;
    }

    .chat-container .content {
        padding: 8px;
        background-color: #a5c3fa;
        display: inline-block;
        max-width: 50%;
        word-wrap: break-word;
    }

    .message {
        padding: 8px;
        margin-right: 51%;
        background-color: #a5c3fa;
    }

    .message.my {
        padding: 8px;
        margin-left: 51%;
        margin-right: 10%;
        background-color: #60f1bf;
        width: 50%;
    }

    .scrollable {
        overflow-y: auto;
        height: 90vh;
    }

    .typer {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        bottom: 0;
        height: 4.9rem;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, .2);
    }

    .typer input[type=text] {
        position: absolute;
        left: 2.5rem;
        padding: 1rem;
        width: 80%;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1.25rem;
    }

    .chat-container .content.own {
        background-color: green;
    }

    .account {
        text-align: left;
        font-size: 13px;
    }

    .account.own {
        text-align: right;
        margin-left: 10%;
        font-size: 13px;
    }

</style>