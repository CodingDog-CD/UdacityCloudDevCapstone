import { apiEndpoint } from '../config'
import { Workorder } from '../types/Workorders'
import { CreateWorkorderRequest } from '../types/CreateWorkorderRequest'
import Axios from 'axios'
import { UpdateWorkorderRequest } from '../types/UpdateWorkorderRequest'

export async function getTodos(idToken: string): Promise<Workorder[]> {
  console.log('Fetching work orders')

  const response = await Axios.get(`${apiEndpoint}/workorder`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Workorders:', response.data)
  return response.data.items
}

export async function getTodo(idToken: string, woId: string): Promise<Workorder> {
  console.log('Fetching work order')

  const response = await Axios.get(`${apiEndpoint}/workorder/${woId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Workorder:', response.data)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newWorkorder: CreateWorkorderRequest
): Promise<Workorder> {
  const response = await Axios.post(`${apiEndpoint}/createworkorder`,  JSON.stringify(newWorkorder), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.items
}

export async function patchTodo(
  idToken: string,
  woId: string,
  updatedWorkorder: UpdateWorkorderRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/workorder/${woId}`, JSON.stringify(updatedWorkorder), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteTodo(
  idToken: string,
  woId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/workorder/${woId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  woId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/workorder/${woId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
