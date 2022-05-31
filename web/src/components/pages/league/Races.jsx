import { Grid } from "@material-ui/core";
import LinkButton from "components/common/LinkButton";
import React from "react";

export default function Races({ races, leagueId }) {
  return (
    <Grid item xs={12}>
      {races
        .sort((a, b) => a.race_date.localeCompare(b.race_date))
        .map((race) => (
          <LinkButton
            text={race.race_name}
            subtext={new Date(race.start_time).toLocaleDateString()}
            to={"/leagues/" + leagueId + "/races/" + race.id}
            variant="contained"
            color="primary"
            key={race.id}
            width="300px"
          />
        ))}
    </Grid>
  );
}
