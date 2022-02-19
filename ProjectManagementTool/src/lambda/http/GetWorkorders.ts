import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import { getWorkOrder } from '../../functions/workorders'
import { getUserId } from '../utils'
import cors from '@middy/http-cors'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const assignedTo = getUserId(event)
        const woItems = await getWorkOrder(assignedTo)

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