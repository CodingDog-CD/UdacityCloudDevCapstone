import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import {patchTodo, getTodo } from '../api/pmt-api'

enum UpdateState {
  NoUpdate,
  UpdatingWO,
}

interface EditTodoProps {
  match: {
    params: {
      woId: string
    }
  }
  auth: Auth
}

interface EditTodoState {
  name: string,
  description: string,
  dueDate: string,
  done: boolean,
  assignedTo: string,
  updateState: UpdateState
}

export class EditTodo extends React.PureComponent<
  EditTodoProps,
  EditTodoState
> {
  state: EditTodoState = {
    name: '',
    description: '',
    dueDate: '',
    done: false,
    assignedTo: '',
    updateState: UpdateState.NoUpdate
  }

  async componentDidMount() {
    try {
      const getWorkorder = await getTodo(this.props.auth.getIdToken(), this.props.match.params.woId)
      this.setState({
        name: getWorkorder.name,
        description: getWorkorder.description,
        dueDate: getWorkorder.dueDate,
        done: getWorkorder.done,
        assignedTo: getWorkorder.assignedTo
      })
    } catch (e) {
      alert(`Failed to fetch workorders: ${e}`)
    }
  }


  handleOwnerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ assignedTo: event.target.value })
  }

  handleNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  handledueDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dueDate: event.target.value })
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    this.setUpdateState(UpdateState.UpdatingWO)
    try {
        await patchTodo(this.props.auth.getIdToken(), this.props.match.params.woId, {
            name: this.state.name,
            description: this.state.description,
            dueDate: this.state.dueDate,
            done: this.state.done,
            assignedTo: this.state.assignedTo
        })

      alert('Work order was updated!')
    } catch (e) {
      alert('Could not update work order: ' + e)
    } finally {
        this.setUpdateState(UpdateState.NoUpdate)
    }
  }

  setUpdateState(updateState: UpdateState) {
    this.setState({
      updateState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="text"
              defaultValue = {this.state.assignedTo}
              placeholder = "assign to..."
              onChange={this.handleOwnerChange}
            />
            <input
              type = "text"
              defaultValue = {this.state.name}
              placeholder = "work order name..."
              onChange={this.handleNameChange}
            />
            <input
              type = "text"
              defaultValue = {this.state.description}
              placeholder = "work order description..."
              onChange={this.handleDescriptionChange}
            />
            <input
              type = "text"
              defaultValue = {this.state.dueDate}
              placeholder = "work order due Date..."
              onChange={this.handledueDateChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }



  renderButton() {

    return (
      <div>

        <Button
          loading={this.state.updateState !== UpdateState.NoUpdate}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
}
