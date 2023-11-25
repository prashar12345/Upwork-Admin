const list = [
    { id: 'active', name: 'Active' },
    { id: 'deactive', name: 'Inactive' },
]
const loginfrom = [
    { id: 'main', name: 'main' },
    { id: 'front', name: 'front' },
]

const find = (key) => {
    let ext = list.find(itm=>itm.id == key)
    return ext
}

const name = (key) => {
    let ext = list.find(itm=>itm.id == key)
    return ext?ext.name:key
}

const statusModel = { list, find,name,loginfrom }
export default statusModel