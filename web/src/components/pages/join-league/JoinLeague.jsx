import { useAuthenticator } from "@aws-amplify/ui-react";
import { Loadable } from "components/common/Loadable";
import { Page } from "components/common/Page";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { joinLeague } from "store/actions/leaguesActions";

// not sure if this is a correct way to do a redirect page but it works (maybe)

export default function JoinLeague(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useAuthenticator((context) => [context.user]);
  const [searchParams, _] = useSearchParams();
  const inviteToken = searchParams.get("token");
  const match = useMatch("/leagues/:id/join");
  const leagueId = match.params.id;
  console.log("token ", inviteToken);
  console.log(searchParams);
  useNavigate

  const { joinLeagueLoading, newLeagueJoined, joinLeagueError } = useSelector((state) => state.leagues);

  // if (!leagueId || !inviteToken || !user?.username || !user?.attributes?.name) {
  //   // redirect
  //   console.log("invalid parameters, redirecting to home page");
  //   return <Navigate to={"/"} state={{ from: location }} replace />;
  // }

  useEffect(() => {
    const request = {
      leagueId: leagueId,
      userId: user?.username,
      inviteToken: inviteToken,
      userName: user?.attributes?.name,
    };
    console.log(request);
    dispatch(joinLeague(request));
  }, [dispatch, leagueId, user, inviteToken])


  if (newLeagueJoined) {
    // redirect
    return <Navigate to={"/leagues/" + leagueId} state={{ from: location }} replace />;
  }

  if (joinLeagueError) {
    // redirect
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <Page>
      <Loadable loading={joinLeagueLoading}>
        <></>
      </Loadable>
    </Page>
  );
}
