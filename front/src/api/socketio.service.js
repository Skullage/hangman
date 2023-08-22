import { io } from 'socket.io-client';
import {VUE_APP_SOCKET_ENDPOINT} from '../config/config.js'
import store from '../store/index.js'

class SocketioService {
    socket;
    constructor() {}

    setupSocketConnection() {
        // @ts-ignore
        this.socket = io(VUE_APP_SOCKET_ENDPOINT);
        this.socket.on('UPDATE_ROOMS', data => {
            store.state.rooms = data
        })
    }

    restartGame() {
        this.socket.emit('restartGame')
    }

    newUser(data) {
        this.socket.emit('NEW_USER', {
            username: data.name
        })
    }
    showRooms(callback) {
        this.socket.emit('showRooms', callback)
    }
    leaveRoom(callback) {
        this.socket.emit('LEAVE_ROOM', callback)
    }
    joinRoom(roomId, callback) {
        this.socket.emit('JOIN', roomId, callback)
        store.commit('setRoomId', roomId)
    }
    checkChar(char, callback) {
        this.socket.emit('checkChar', char, callback)
    }
    hostRoom(data, callback) {
        this.socket.emit('HOST', data, callback)
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketioService();