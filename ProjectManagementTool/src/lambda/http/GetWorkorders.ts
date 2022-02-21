import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import { getWorkOrders } from '../../functions/getWorkOrders'
import { getUserId } from '../utils'
import cors from '@middy/http-cors'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const assignedTo = getUserId(event)
        const woItems = await getWorkOrders(assignedTo)

        return {
            statusCode: 200,
            body: JSON.stringify({
                items: woItems
            })
        }
    }
)

handler.use(
    cors({
        credentials: true
    })
)