import { JwtPayload } from "./JwtPayload";
import { decode } from 'jsonwebtoken'

export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtPayload
    return decodedJwt.sub
}