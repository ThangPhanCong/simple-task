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
  height: 360px;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 4px 0px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
`;

const ButtonAdd = styled.button`
  background-color: rgb(90, 172, 68);
  padding: 0px 16px;
  height: 32px;
  width: 100px;
  font-size: 14px;
  border-radius: 3px;
  color: rgb(255, 255, 255);
  border-style: none;
  &:hover {
    cursor: pointer;
  }
`;

const ItemRemove = styled.img`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const InputCard = styled.input`
  border: none;
  margin: 10px;
  font-size: 14px;
  padding: 10px;
  height: 84px;
  background: papayawhip;
`;

const TitleNewCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
  height: 74px;
  &:hover {
    cursor: pointer;
    background-color: #C0C1C3;
  }
`;

const ImgNewCard = styled.img`
  margin-right: 10px;
`;

const TitleNewCard = styled.div`
  font-size: 15px;
`;

class App extends Component {
  state = {
    data: data.tasks,
    isShowAddCard: false
  };

  _showInputForm() {
    this.setState({isShowAddCard: true});
  }

  _hideInputForm() {
    this.setState({isShowAddCard: false});
  }

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

  _renderInputCard() {
    return(
      <InputContainer>
        <InputCard placeholder="Enter a title for this card..." />
        <InputButton>
          <ButtonAdd>Add</ButtonAdd>
          <ItemRemove src={require('./assets/delete.png')} height="15" width="15" onClick={() => this._hideInputForm()} />
        </InputButton>
      </InputContainer>
    )
  }

  _renderTitleNewCard() {
    return(
      <TitleNewCardContainer onClick={() => this._showInputForm()}>
        <ImgNewCard src={require('./assets/add.png')} height="15" width="15" />
        <TitleNewCard>Add another card</TitleNewCard>
      </TitleNewCardContainer>
    )
  }

  render() {
    const { data, isShowAddCard } = this.state;

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
              {isShowAddCard ? this._renderInputCard() : this._renderTitleNewCard()}
            </Container>
          )}
        </Droppable>
        
      </DragDropContext>
    );
  }
}

export default App;
