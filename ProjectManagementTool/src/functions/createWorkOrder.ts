import { CreateWorkorderRequest } from '../requests/CreateWorkorderRequest'
import { Workorder } from '../models/Workorder'
import * as uuid from 'uuid'
import { WorkorderAccess } from './workorderAccess'

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