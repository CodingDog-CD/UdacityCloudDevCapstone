import { CreateWorkorderRequest } from '../requests/CreateWorkorderRequest'
import { Workorder } from '../models/Workorder'
import * as uuid from 'uuid'
import { WorkorderAccess } from './workorderAccess'
import { UpdateWorkorder } from '../models/UpdateWorkOrder'
import { UpdateWorkorderRequest } from 'src/requests/UpdateWorkorderRequest'
import { AttachmentUtils } from './attachmentUtils'

const bucketName = process.env.ATTACHMENT_S3_BUCKET
const workorderAccess = new WorkorderAccess()
export async function createWorkOrder(assignedTo: string, createWorkOrderRequest: CreateWorkorderRequest): Promise<Workorder> {
    const workorderId = uuid.v4()
    const newWorkOrderItem = {
        woId: workorderId,
        name: createWorkOrderRequest.name,
        description: createWorkOrderRequest.description,
        dueDate: createWorkOrderRequest.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
        project: createWorkOrderRequest.project,
        assignedTo: assignedTo,
        attachmentUrl: `http://${bucketName}.s3.amazonaws.com/${workorderId}`
    }
    await workorderAccess.createWorkorder(newWorkOrderItem)
    return newWorkOrderItem
}

export async function getWorkOrder(assignedTo: string): Promise<Workorder[]>{
    const readItem = await workorderAccess.getWorkorder(assignedTo)
    return readItem
}

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
                createdAt: copyWorkorder[0].createdAt,
                done: updateRequest.done,
                project: copyWorkorder[0].project,
                assignedTo: updateRequest.assignedTo,
                attachmentUrl: copyWorkorder[0].attachmentUrl
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

export async function createAttachmentPresignedUrl(woId: string) : Promise<string> {
    return AttachmentUtils(woId)
}