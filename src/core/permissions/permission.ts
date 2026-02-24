export const Permission = {
    // User
    USER_READ:     1n << 0n,   // 1
    USER_WRITE:    1n << 1n,   // 2
    USER_DELETE:   1n << 2n,   // 4

    // Coin
    FILM_READ:     1n << 6n,   // 64
    FILM_WRITE:    1n << 7n,   // 128

    ADMIN_ALL:     1n << 63n,   // 256

} as const;

export const DEFAULT_PERMISSIONS = Permission.USER_READ | Permission.FILM_READ;
export const DEFAULT_ADMIN_PERMISSIONS = Permission.USER_READ | Permission.USER_WRITE | Permission.USER_DELETE | Permission.FILM_READ | Permission.FILM_WRITE | Permission.ADMIN_ALL;