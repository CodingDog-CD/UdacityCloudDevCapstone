import { WorkorderAccess } from './workorderAccess'
import { UpdateWorkorder } from '../models/UpdateWorkOrder'
import { UpdateWorkorderRequest } from 'src/requests/UpdateWorkorderRequest'

const workorderAccess = new WorkorderAccess()

export async function updateWorkOrder(assignedTo: string, woId: string, updateRequest: UpdateWorkorderRequest): Promise<UpdateWorkorder>{
    if (assignedTo === updateRequest.assignedTo) {
        const updatedItem: UpdateWorkorder = await workorderAccess.updateWorkorder(assignedTo, woId, updateRequest)
        return updatedItem    
    } else {
        const itemTobeRemoved = await workorderAccess.verifyDeletion(assignedTo, woId)
        if (itemTobeRemoved.length === 0) {
            console.log("No matched item.")
            return {
                name: "#No",
                description: "#Your",
                dueDate: "#Wo",
                done: false
            }
        } else {
            console.log("recreate item due to reassigned person")
            const copyWorkorder = await workorderAccess.copyWorkorder(assignedTo, woId)
            await workorderAccess.removeWorkorder(assignedTo, woId)
            const newWorkOrderItem = {
                woId: woId,
                name: updateRequest.name,
                description: updateRequest.description,
                dueDate: updateRequest.dueDate,
                createdAt: copyWorkorder.createdAt,
                done: updateRequest.done,
                project: copyWorkorder.project,
                assignedTo: updateRequest.assignedTo,
                attachmentUrl: copyWorkorder.attachmentUrl
            }
            await workorderAccess.createWorkorder(newWorkOrderItem)
            const updatedItem: UpdateWorkorder = {
                name: updateRequest.name,
                description: updateRequest.description,
                dueDate: updateRequest.dueDate,
                done: updateRequest.done
            }
            console.log("updated workorder: ", newWorkOrderItem)
            return updatedItem
        }
        
    }
}