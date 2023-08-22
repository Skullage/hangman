import { createStore } from 'vuex'
import SocketioService from "../api/socketio.service.js";

const store = createStore({
    state () {
        return {
            roomId: '',
            rooms: [],
            username: localStorage.getItem('username') || null,
        }
    },
    getters: {
        isLogined(state) {
            return state.username !== null
        },
        getUsers(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].clients : null
        },
        getWord(state) {
            if(state.rooms[state.roomId] !== undefined) {
                let buffer = ''
                state.rooms[state.roomId].word.split('').forEach(el => {
                    if(!state.rooms[state.roomId].openedChars.includes(el)) {
                        buffer += " "
                    } else {
                        buffer += el
                    }
                })
                return buffer
            } else {
                return null
            }

        },
        getRoomTitle(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].title : null
        },
        getCharSlots(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].alphabet.filter(el => !state.rooms[state.roomId].openedChars.includes(el)) : null
        },
        getLivesLast(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].leftLives : null
        },
        getLivesClass(state) {
            let lives = state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].leftLives : null
            return `step-${lives}`
        },
        isGamePaused(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].gameStatus !== '' : null
        },
        getGameStatus(state) {
            return state.rooms[state.roomId] !== undefined ? state.rooms[state.roomId].gameStatus : null
        }
    },
    mutations: {
        logout(state) {
            state.username = null
            localStorage.removeItem('username')
        },
        getRooms(state, rooms) {
            state.rooms = rooms
        },
        setUsername(state, name) {
            state.username = name
            localStorage.setItem('username', state.username)
            SocketioService.newUser({name: store.state.username, color: 'black'})
        },
        setRoomId(state, id) {
            state.roomId = id
        },
        updateRoom(state, data) {
            state.rooms[state.roomId] = data
        }
    }
})

export default store