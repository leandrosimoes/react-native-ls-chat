export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`
}

type TDelayMS = number | undefined

export const delay = (ms: TDelayMS = 3000): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
