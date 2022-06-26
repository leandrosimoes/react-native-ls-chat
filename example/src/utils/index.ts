export const delay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000)
    })
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array)
    }
}
