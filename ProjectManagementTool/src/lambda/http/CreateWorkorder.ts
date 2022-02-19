import middy from '@middy/core'
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateWorkorderRequest } from '../../requests/CreateWorkorderRequest'
import { createWorkOrder } from '../../functions/workorders'
import httpErrorHandler  from '@middy/http-error-handler'
import { getUserId } from '../utils'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const workOrderRequest: CreateWorkorderRequest = JSON.parse(event.body)
        const assignedTo = getUserId(event)
        const newWorkOrder = await createWorkOrder(assignedTo, workOrderRequest)

        return {
            statusCode: 201,
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                items: newWorkOrder
            })
        }
    }
)

handler
    .use(httpErrorHandler())    
    .use(
        cors({
            credentials: true
        })
    )
    