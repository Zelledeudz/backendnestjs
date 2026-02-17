export const AUTH_USER_REGISTERED_EVENT = 'auth.user.registered'
export class userRegisteredEvent {
    static eventName = AUTH_USER_REGISTERED_EVENT;

    static create(payload: any) {
        return{
            name: userRegisteredEvent.eventName,
            payload
        }
    }
}