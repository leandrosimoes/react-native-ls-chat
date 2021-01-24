import { guid, delay } from '.'

describe('Testing UTILS', () => {
    it('Should "guid" method return a uuid string', () => {
        const uuid = guid()

        expect(uuid).not.toBeNull()
        expect(uuid).not.toBeFalsy()
        expect(uuid.length).toBe(36)
    })

    it('Should "delay" method wait for the right amount of time', async (done) => {
        const timeout = 1000
        const timeBefore = new Date().getTime()

        await delay(timeout)

        const timeAfter = new Date().getTime()
        const rest = timeAfter - timeBefore

        expect(rest).toBeGreaterThanOrEqual(timeout)

        done()
    })
})
