import middy from '@middy/core'
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateWorkorder } from 'src/models/UpdateWorkOrder'
import { UpdateWorkorderRequest } from 'src/requests/UpdateWorkorderRequest'
import { updateWorkOrder } from '../../functions/workorders'
import { getUserId } from '../utils'

export const handler = middy(
    async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const assignedTo = getUserId(event)
        const woId = event.pathParameters.woId
        const updateRequest: UpdateWorkorderRequest = JSON.parse(event.body)
        const updatedItem = await updateWorkOrder(assignedTo, woId, updateRequest)
        const noPermissionCode: UpdateWorkorder = {
            name: "#No",
            description: "#Your",
            dueDate: "#Wo",
            done: false
        }
       
        if (JSON.stringify(updatedItem) === JSON.stringify(noPermissionCode)) {
            console.log("not use's work order")
            return {
                statusCode: 400,
                body: "This work order doesn't belong to you. Update failed."
            }
        } 
        return {
            statusCode: 200,
            body: JSON.stringify({
                items: updatedItem
            })
        }
    
        
    }
)

handler.use(
    cors({
        credentials: true
    })
)