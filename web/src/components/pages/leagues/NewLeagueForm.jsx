import React, { useEffect } from "react";
import { Page } from "components/common/Page";
import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { createLeague } from "store/actions/leaguesActions";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Loadable } from "components/common/Loadable";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";

export default function NewLeagueForm(props) {
  const dispatch = useDispatch();
  const { user } = useAuthenticator((context) => [context.user]);
  const { createLeagueLoading, newLeagueId, error } = useSelector((state) => state.leagues);
  const location = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "My Pickem League",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      let request = {
        leagueName: values.name,
        leagueSeason: (new Date()).getUTCFullYear().toString(),
        userId: user?.username,
        userName: user?.attributes?.name,
      };
      dispatch(createLeague(request));
    },
  });

  useEffect(() => {
    // if new league created then redirect to league page
    if (newLeagueId) {
      navigate("/leagues/" + newLeagueId);
    }
  }, [navigate, newLeagueId]);

  return (
    <Page>
      <Grid>
        <Typography variant="h4">Create new league</Typography>
      </Grid>

      <Divider variant="middle" style={{ borderBottom: "1px solid #e8e8e8", width: "100%", marginBottom: "20px" }} />

      <Grid container item xs={12} direction="column">
        <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="League Name"
                {...formik.getFieldProps("name")}
              />
            </Grid>
            <Grid item xs={12} style={{paddingTop: "2em"}}>
              <LoadingButton loading={createLeagueLoading} type="submit" variant="outlined" color="primary">
                Submit
              </LoadingButton>
              {formik.touched.name && formik.errors.name ? (
                <Typography style={{ color: "red" }}>
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Grid>
          </form>
      </Grid>
    </Page>
  );
}

