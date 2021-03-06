import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/pmt-api'
import Auth from '../auth/Auth'
import { Workorder } from '../types/Workorders'

interface TodosProps {
  auth: Auth
  history: History
}

interface TodosState {
  todos: Workorder[]
  newTodoName: string
  loadingTodos: boolean
  description: string
  project: string
  userId: string
}

export class Todos extends React.PureComponent<TodosProps, TodosState> {
  state: TodosState = {
    todos: [],
    newTodoName: '',
    loadingTodos: true,
    description: '',
    project: '',
    userId: ''
  }

  getUserId(): string {
    const idToken = this.props.auth.getIdToken()
    let jwt = require("jsonwebtoken")
    const tokenPayload = jwt.decode(idToken)
    const userId = tokenPayload.sub
    return userId
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ project: event.target.value })
  }

  onUploadButtonClick = (woId: string) => {
    this.props.history.push(`/todos/${woId}/upload`)
  }

  onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const dueDate = this.calculateDueDate()
      const newWorkorder = await createTodo(this.props.auth.getIdToken(), {
        name: this.state.newTodoName,
        dueDate: dueDate,
        description: this.state.description,
        project: this.state.project
      })
      this.setState({
        todos: [...this.state.todos, newWorkorder],
        newTodoName: '',
        description: '',
        project: ''
      })
    } catch (error){
      alert(`Todo creation failed ${error}`)
    }
  }

  onTodoDelete = async (woId: string) => {
    try {
      await deleteTodo(this.props.auth.getIdToken(), woId)
      this.setState({
        todos: this.state.todos.filter(todo => todo.woId !== woId)
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  onTodoCheck = async (pos: number) => {
    try {
      const todo = this.state.todos[pos]
      await patchTodo(this.props.auth.getIdToken(), todo.woId, {
        name: todo.name,
        dueDate: todo.dueDate,
        done: !todo.done,
        description: todo.description,
        assignedTo: todo.assignedTo
      })
      this.setState({
        todos: update(this.state.todos, {
          [pos]: { done: { $set: !todo.done } }
        })
      })
    } catch {
      alert('Todo deletion failed')
    }
  }

  onEditButtonClick = async (woId: string) => {
    this.props.history.push(`/todos/${woId}/edit`)
  }

  async componentDidMount() {
    try {
      const todos = await getTodos(this.props.auth.getIdToken())
      const userId = this.getUserId()
      this.setState({
        todos,
        loadingTodos: false,
        userId
      })
    } catch (e) {
      alert(`Failed to fetch workorders: ${e}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">TODOs</Header>
        <h2>Welcome! Your user ID is: {this.state.userId}</h2>

        {this.renderCreateTodoInput()}

        {this.renderTodos()}
      </div>
    )
  }

  renderCreateTodoInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: this.onTodoCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
          <Input
            fluid
            actionPosition = "left"
            placeholder = "Add description..."
            onChange={this.handleDescriptionChange}
          />
          <Input
            fluid
            actionPosition = "left"
            placeholder = "Add project name..."
            onChange={this.handleProjectChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderTodos() {
    if (this.state.loadingTodos) {
      return this.renderLoading()
    }

    return this.renderTodosList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    )
  }

  renderTodosList() {
    return (
      <Grid padded>
        {this.state.todos?.map((todo, pos) => {
          return (
            <Grid.Row key={todo.woId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onTodoCheck(pos)}
                  checked={todo.done}
                />
              </Grid.Column>
              <Grid.Column width={9} verticalAlign="middle">
                {todo.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {todo.dueDate}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onUploadButtonClick(todo.woId)}
                >
                  <Icon name="upload" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(todo.woId)}
                > 
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onTodoDelete(todo.woId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {todo.attachmentUrl && (
                <Image src={todo.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
              <Grid.Column width={4} verticalAlign="middle">
                Project: {todo.project}
              </Grid.Column>
              <Grid.Column width={12} verticalAlign="middle">
                description: {todo.description}
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
