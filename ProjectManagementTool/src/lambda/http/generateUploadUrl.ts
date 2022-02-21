import { createAttachmentPresignedUrl } from "@functions/createAttachmentPresignedUrl";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from "@middy/http-error-handler";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const woId = event.pathParameters.woId
        const url = await createAttachmentPresignedUrl(woId)
        return {
            statusCode: 201,
            body: JSON.stringify({
                uploadUrl: url
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