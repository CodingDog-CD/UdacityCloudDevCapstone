import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda"
import { Jwt } from "src/auth/Jwt"
import { JwtPayload } from "src/auth/JwtPayload"
import {verify, decode } from 'jsonwebtoken'

const jwksUrl = 'https://dev-qvu-29oi.us.auth0.com/.well-known/jwks.json'

export const handler = async (
    event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
    console.log('Authorizing a user ', event.authorizationToken)
    try {
        const jwtToken = await verifyToken(event.authorizationToken)
        console.log('User was authorized', jwtToken)
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        }
    } catch (e) {
        console.log('User not authorized', { error: e.message })
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        }
    }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {

    // get token
    const token = getToken(authHeader)

    // get signing key using jwksClient by passing the kid property of jwt token header
    const jwt: Jwt = decode(token, { complete: true}) as Jwt
    const kidPropJwt = jwt.header.kid
    
    const jwksClient = require('jwks-rsa')
    const jwksClientObject = jwksClient({
        strictSsl: true,
        jwksUri: jwksUrl
    })

    const key = await jwksClientObject.getSigningKey(kidPropJwt)
    const signingKey = key.getPublicKey()

    // verify user
    const verifiedToken = verify(token, signingKey, {algorithms: ['RS256']}) as JwtPayload
    console.log(verifiedToken)

    return verifiedToken
}

function getToken(authHeader: string): string {
    // verify the authentication header
    if (!authHeader) throw new Error('No authentication header')

    if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')
    
    // the token is the second element of the auth header when it is split by space.
    const split = authHeader.split(' ')
    const token = split[1]
    
    return token
}

