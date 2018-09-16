import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";
import data from "./initial-data";
import Task from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  border: solid 1px none;
  width: 281px;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  background-color: #E1E3E5;
  height: 240px;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 4px 0px;
`;


class App extends Component {
  state = {
    data: data.tasks
  };

  _onDragEnd = (result, provided) => {
    const { destination, source, draggableId } = result;
    const { data } = this.state;

    if(!destination) {
      return;
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const findTask = data.find(d => d.id === draggableId);

    data.splice(sourceIndex, 1);
    data.splice(destinationIndex, 0 , findTask);
    this.setState({data});
    return;
  };

  render() {
    const { data } = this.state;

    return (
      <DragDropContext
        onDragStart={this._onDragStart}
        onDragUpdate={this._onDragUpdate}
        onDragEnd={this._onDragEnd}
      >
        <Droppable droppableId={'all-columns'}>
          {(provided, snapshot) => (
            <Container className="App" {...provided.droppableProps}  innerRef={provided.innerRef}>
              {data.map((task, index) => <Task task={task} index={index} key={task.id} />)}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
