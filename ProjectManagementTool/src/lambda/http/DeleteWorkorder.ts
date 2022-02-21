import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { removeWorkOrder } from '../../functions/removeWorkOrder'
import { getUserId } from "../utils"

export const handler = middy (
    async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const assignedTo = getUserId(event)
        const woId = event.pathParameters.woId
        let information: string
        const removedItemNumber = await removeWorkOrder(assignedTo, woId)
        if (removedItemNumber === 0) {
            information = 'the item doesn\'t belong to this user or the item doesn\'t exist.'
        } else {
            information = `the item ${woId} has been removed`
        }
        return {
            statusCode: 200,
            body: information
        }
    }
)

handler.use(
    cors({
        credentials: true
    })
)