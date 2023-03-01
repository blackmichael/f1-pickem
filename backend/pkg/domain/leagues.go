package domain

type League struct {
	ID          string
	Name        string
	Season      string
	InviteToken string
	Users       []User
}

type UserLeague struct {
	UserID            string
	LeagueID          string
	Status            UserStatus
	LeagueName        string
	LeagueSeason      string
	UserName          string
	LeagueInviteToken string
}

type LeagueToken struct {
	LeagueID          string
	LeagueInviteToken string
	RequesterStatus   UserStatus
}

type User struct {
	ID     string
	Name   string
	Status UserStatus
}

type UserStatus string

const (
	NoStatus     UserStatus = "NONE"
	MemberStatus UserStatus = "MEMBER"
	OwnerStatus  UserStatus = "OWNER"
)
