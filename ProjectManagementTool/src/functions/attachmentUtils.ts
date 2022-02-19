import * as AWS from 'aws-sdk'

const bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = + process.env.SIGNED_URL_EXPIRATION

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

export async function AttachmentUtils(woId: string): Promise<string>{
    const url = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: woId,
        Expires: urlExpiration
    })

    return url
}