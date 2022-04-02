import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getDrivers } from "store/defaultStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { submitPicks } from "store/actions/picksActions";
import { toDateTimeDisplayString } from "utils/time";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 6;

const getItemStyle = (isDragging, draggableStyle, index) => ({
  userSelect: "none",
  padding: `${grid * 1}px ${grid * 2}px`,
  margin: `0 0 ${grid}px 0`,
  background: index > 9 ? "grey" : "white",
  display: "flex",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  border: isDraggingOver ? "1px dotted red" : "none",
  padding: grid,
  // width: '75%',
  // paddingLeft: '25%',
});

export default function Picks(props) {
  const dispatch = useDispatch();
  const picksSubmittedState = useSelector((state) => state.picksSubmittedAt);
  const { loading, error, submittedAt } = picksSubmittedState;

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
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      let request = {
        league_id: props.leagueId,
        race_id: props.raceId,
        user_id: values.email,
        picks: drivers.slice(0, 10),
      };
      dispatch(submitPicks(request));
    },
  });

  return (
    <Grid container style={{ width: "75%", paddingLeft: "25%" }}>
      <Grid item xs={12}>
        {submittedAt != "" ? (
          <Typography variant="caption">
            Picks submitted on {toDateTimeDisplayString(submittedAt)}
          </Typography>
        ) : null}
        {error ? <Typography variant="caption">{error}</Typography> : null}
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email Address"
            {...formik.getFieldProps("email")}
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
          {formik.touched.email && formik.errors.email ? (
            <Typography style={{ color: "red" }}>
              {formik.errors.email}
            </Typography>
          ) : null}
        </form>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: "2em" }}>
        <div>
          <Typography variant="h5">
            Click and drag to choose your top 10 drivers.
          </Typography>
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
                          )}
                        >
                          <span style={{ flexBasis: "5%" }}>{index + 1}.</span>
                          <span
                            style={{ textAlign: "center", flexBasis: "90%" }}
                          >
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
  );
}

const PickerSelector = withStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}))(TextField);
