import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import { getWorkOrder } from '../../functions/getWorkOrder'
import { getUserId } from '../utils'
import cors from '@middy/http-cors'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const assignedTo = getUserId(event)
        const woId = event.pathParameters.woId
        const woItem = await getWorkOrder(assignedTo, woId)

        return {
            statusCode: 200,
            body: JSON.stringify({
                items: woItem
            })
        }
    }
)

handler.use(
    cors({
        credentials: true
    })
)