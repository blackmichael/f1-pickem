import { Grid } from "@material-ui/core";
import LinkButton from "components/common/LinkButton";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "store/actions/racesActions";

export default function Races(props) {
  const dispatch = useDispatch();
  const racesState = useSelector((state) => state.races);
  const { loading, error, racesBySeason } = racesState;
  let races = (racesBySeason[props.season] || []);

  useEffect(() => {
    if (!racesBySeason[props.season] && props.season !== undefined) {
      dispatch(getRaces(props.season));
    }
  }, [dispatch, props.season]);

  return (
    <Grid item xs={12}>
      {races
        .sort((a, b) => a.race_date.localeCompare(b.race_date))
        .map((race) => (
          <LinkButton
            text={race.race_name}
            subtext={new Date(race.start_time).toLocaleDateString()}
            to={"/leagues/" + props.leagueId + "/races/" + race.id}
            variant="contained"
            color="primary"
            key={race.id}
            width="300px"
          />
        ))}
    </Grid>
  );
}
