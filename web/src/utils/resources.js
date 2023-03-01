export function getLeaguesResource(id) {
  return `/leagues/${id}`;
}

export function getLeagueInviteLink(leagueId, inviteToken) {
  return `${window.location.host}/leagues/${leagueId}/join?token=${inviteToken}`
}