import { AttachmentUtils } from './attachmentUtils'

export async function createAttachmentPresignedUrl(woId: string) : Promise<string> {
    return AttachmentUtils(woId)
}