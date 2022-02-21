import { WorkorderAccess } from './workorderAccess'

const workorderAccess = new WorkorderAccess()

export async function removeWorkOrder(assignedTo: string, woId: string): Promise<number>{
    const itemTobeRemoved = await workorderAccess.verifyDeletion(assignedTo, woId)
    console.log(itemTobeRemoved)
    console.log('array length ', itemTobeRemoved.length)
    if (itemTobeRemoved.length === 0) {
        console.log("No matched item.")
    } else {
        await workorderAccess.removeWorkorder(assignedTo, woId)
    }
    return itemTobeRemoved.length

}