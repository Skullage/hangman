export interface User {
    id: string;
    isConnected: boolean
    isHost: boolean;
    isReady: boolean;
    name: string;
    room: string;
    uniqueId: string;
}
  
export interface Room {
    title: string;
    clients: User[];
    hostID: string;
    id: string;
    maxPlayers: number;
    blacklist: string[];
    turnUserID: string;
    game: string;
}
  
export interface RoomState {
    roomId: string | null;
    rooms: Record<string, Room> | null;
    turnTimer: number;
    timer?: number;
}