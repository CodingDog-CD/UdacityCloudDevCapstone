export interface Workorder {
    woId: string
    name: string
    description: string
    dueDate: string
    createdAt: string
    done: boolean
    project: string
    assignedTo: string
    attachmentUrl: string
}