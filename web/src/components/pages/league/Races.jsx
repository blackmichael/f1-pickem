import { Button, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import LinkButton from 'components/common/LinkButton';
import { StyledTable, StyledTableCell, StyledTableRow } from 'components/common/StyledTable';
import React from 'react';

export default function Races(props) {

    const races = props.data || [];

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Race</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Winners</StyledTableCell>
                            <StyledTableCell>Details</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {races
                            .sort((a, b) => ('' + b.date).localeCompare(a.date))
                            .map((race, idx) => (
                                <StyledTableRow key={race.name + idx}>
                                    <StyledTableCell>{race.name}</StyledTableCell>
                                    <StyledTableCell>{race.date}</StyledTableCell>
                                    <StyledTableCell>{race.winners.join(', ')}</StyledTableCell>
                                    <StyledTableCell>
                                        <LinkButton 
                                            text="View" 
                                            to={"/leagues/" + props.leagueId + "/races/" + race.id}
                                            variant="contained" 
                                            color="primary"
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Grid>
    )
}