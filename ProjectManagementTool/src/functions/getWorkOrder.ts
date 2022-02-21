import { Workorder } from '../models/Workorder'
import { WorkorderAccess } from './workorderAccess'

const workorderAccess = new WorkorderAccess()

export async function getWorkOrder(assignedTo: string, woId: string): Promise<Workorder>{
    const specificItem = await workorderAccess.copyWorkorder(assignedTo, woId)
    return specificItem
}