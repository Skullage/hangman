export interface Notification {
    type: 'error' | 'info' | 'warning' | 'success' | 'default';
    msg: string;
    disappearTime: number;
}
  
export interface NotificationState {
    notifications: Notification[];
    timer?: number;
}