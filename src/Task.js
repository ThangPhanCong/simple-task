import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 10px;
  border: solid 1px none;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 74px;
  background-color: #FFF;
  color: #000;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 2px 4px 0px;

  &:hover {
  cursor: pointer;
  background-color: #ECEEF0;
  }
`;
const TaskItem = styled.div`
`;

class Task extends React.PureComponent {
  render() {
    const { task } = this.props;

    return (
      <Draggable draggableId={task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     isDragging={snapshot.isDragging}
                     innerRef={provided.innerRef}>
            <TaskItem>
              {task.content}
            </TaskItem>
          </Container>
        )}

      </Draggable>
    )
  }
}

export default Task;