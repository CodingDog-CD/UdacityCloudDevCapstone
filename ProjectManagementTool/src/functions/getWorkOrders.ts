import { Workorder } from '../models/Workorder'
import { WorkorderAccess } from './workorderAccess'

const workorderAccess = new WorkorderAccess()
export async function getWorkOrders(assignedTo: string): Promise<Workorder[]>{
    const readItem = await workorderAccess.getWorkorders(assignedTo)
    return readItem
}