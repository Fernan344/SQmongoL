import flat from 'flat'

export const getObjectKeyValues = (obj = {}) => {
    const flatObj = flat(obj)
    return { keys: Object.keys(flatObj), values: Object.values(flatObj) }
}