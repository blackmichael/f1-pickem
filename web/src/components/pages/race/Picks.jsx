import { Grid, MenuItem, Paper, TextField, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getDrivers } from 'store/store';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, index) => ({
    userSelect: "none",
    padding: `${grid * 2}px ${grid * 3}px`,
    margin: `0 0 ${grid}px 0`,
    background: index > 9 ? 'grey' : 'white',
    display: 'flex',
    ...draggableStyle
});
  
const getListStyle = isDraggingOver => ({
    border: isDraggingOver ? '1px dotted red' : 'none',
    padding: grid,
    // width: '75%',
    // paddingLeft: '25%',
});

export default function Picks(props) {

    const allPicks = props.allPicks || [];

    const [picker, setPicker] = useState(props.default);
    const handlePickerChange = (event) => {
        setPicker(event.target.value);
    }

    const [drivers, setDrivers] = useState(getDrivers());

    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
        
        let newOrder = reorder(
            drivers,
            result.source.index,
            result.destination.index
        );

        setDrivers(newOrder);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    select
                    id="select-picker"
                    label="Picks For"
                    value={picker}
                    onChange={handlePickerChange}
                >
                    {allPicks.map((picker) => (
                        <MenuItem key={picker.name} value={picker.name}>{picker.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <div style={{width: '75%', paddingLeft: '25%'}}>
                    <Typography variant='h5'>Click and drag to choose your top 10 drivers.</Typography>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {drivers.map((driver, index) => (
                                <Draggable key={driver} draggableId={driver} index={index}>
                                {(provided, snapshot) => (
                                    <Paper
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        elevation={3}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            index
                                        )}>
                                            <span style={{flexBasis: '5%'}}>
                                                {index + 1}.
                                            </span>
                                            <span style={{textAlign: 'center', flexBasis: '90%'}}>
                                                {driver}
                                            </span>
                                    </Paper>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Grid>
        </Grid>
    )
}



const PickerSelector = withStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))(TextField);