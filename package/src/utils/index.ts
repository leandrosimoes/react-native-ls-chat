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

export const formatDate = (date: Date, format?: string) => {
    if (!format) return date.toDateString()

    const d = date.getDate()
    const dd = d < 10 ? `0${d}` : `${d}`
    const M = date.getMonth() + 1
    const MM = M < 10 ? `0${M}` : `${M}`
    const yyyy = `${date.getFullYear()}`
    const hour = date.getHours()
    const h = hour > 12 ? hour - 12 : hour
    const hh = h < 10 ? `0${h}` : `${h}`
    const H = hour
    const HH = H < 10 ? `0${H}` : `${H}`
    const m = date.getMinutes()
    const mm = m < 10 ? `0${m}` : `${m}`
    const s = date.getSeconds()
    const ss = s < 10 ? `0${s}` : `${s}`

    let output = format

    output = output.replace(/dd/g, dd)
    output = output.replace(/d/g, d.toString())
    output = output.replace(/MM/g, MM)
    output = output.replace(/M/g, M.toString())
    output = output.replace(/YYYY/g, yyyy)
    output = output.replace(/YYY/g, yyyy)
    output = output.replace(/YY/g, yyyy.substr(yyyy.length - 2))
    output = output.replace(/yyyy/g, yyyy)
    output = output.replace(/yyy/g, yyyy)
    output = output.replace(/yy/g, yyyy.substr(yyyy.length - 2))
    output = output.replace(/HH/g, HH)
    output = output.replace(/H/g, H.toString())
    output = output.replace(/hh/g, hh)
    output = output.replace(/h/g, h.toString())
    output = output.replace(/mm/g, mm)
    output = output.replace(/m/g, m.toString())
    output = output.replace(/ss/g, ss)
    output = output.replace(/s/g, s.toString())

    return output
}

export const getTimeProperly = (date: Date) => {
    return formatDate(date, 'HH:ss')
}
