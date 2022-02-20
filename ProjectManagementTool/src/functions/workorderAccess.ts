
import { Workorder } from '../models/Workorder'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
import { UpdateWorkorder } from 'src/models/UpdateWorkOrder'
import { UpdateWorkorderRequest } from '../requests/UpdateWorkorderRequest'

export class WorkorderAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly workOrderTable = process.env.WORKORDER_TABLE){
    }
    async createWorkorder(workOrderItem: Workorder): Promise<Workorder> {
        console.log(`creating new work order with id ${workOrderItem.woId}`)
        try {
            await this.docClient.put({
                TableName: this.workOrderTable,
                Item: workOrderItem
            }).promise()
        } catch (err) {
            console.log(err);
        }
        
        console.log(`creating new work order finished`)
        return workOrderItem
    }
    async getWorkorders(assignedTo: string): Promise<Workorder[]> {
        
        const result = await this.docClient.query({
            TableName: this.workOrderTable,
            KeyConditionExpression: 'assignedTo = :user',
            ExpressionAttributeValues: {
                ':user': assignedTo
            }
        }).promise()

        const woItems = result.Items
        return woItems as Workorder[]
    }

    async copyWorkorder(assignedTo: string, woId: string): Promise<Workorder> {
        
        const result = await this.docClient.query({
            TableName: this.workOrderTable,
            KeyConditionExpression: 'assignedTo = :user AND woId = :woId',
            ExpressionAttributeValues: {
                ':user': assignedTo,
                ':woId': woId
            }
        }).promise()

        const woItem = result.Items[0]
        return woItem as Workorder
    }

    async verifyDeletion(assignedTo: string, woId: string): Promise<Workorder[]> {
        
        const result = await this.docClient.query({
            TableName: this.workOrderTable,
            KeyConditionExpression: 'assignedTo = :user AND woId = :woId',
            ExpressionAttributeValues: {
                ':user': assignedTo,
                ':woId': woId
            }
        }).promise()

        const itemTobeRemoved = result.Items
        return itemTobeRemoved as Workorder[]
    }

    async removeWorkorder(assignedTo: string, woId: string) {
        const params = {
            TableName: this.workOrderTable,
            Key: {
                "assignedTo": assignedTo,
                "woId": woId
            }
        }
        await this.docClient.delete(params, function(err,data){
            if (err) {
                console.log("Unable to delete item. Error JSON: ", JSON.stringify(err,null,2))
            } else {
                console.log("DeleteItem succeeded: ", JSON.stringify(data, null, 2))
            }
        }).promise()
    }

    async updateWorkorder(assignedTo: string, woId: string, updateRequest: UpdateWorkorderRequest){
        const params = {
            TableName: this.workOrderTable,
            Key: {
                "assignedTo": assignedTo,
                "woId": woId
            },
            UpdateExpression: "set #na=:na, #des = :des, #dD = :dD, #don = :don",
            ExpressionAttributeNames: {
                '#na' : 'name',
                '#des' : 'description',
                '#dD' : 'dueDate',
                '#don' : 'done',
            },
            ExpressionAttributeValues: {
                ':na' : updateRequest.name,
                ':des' : updateRequest.description,
                ':dD' : updateRequest.dueDate,
                ':don' : updateRequest.done,
            },
            ReturnValues: "UPDATED_NEW"
        }
        const updatedItem = await this.docClient.update(params, function(err, data){
            if (err) {
                console.log("Unable to update item. Error JSON:", JSON.stringify(err, null, 2))
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
            }
        }).promise()
        return updatedItem.Attributes as UpdateWorkorder
    }


}