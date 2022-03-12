package users

import "errors"

var alphaTestUserIds = map[string]string{
	"michaelpblack16@gmail.com":  "1",
	"hornergus@gmail.com":        "2",
	"j.kelly.russ@gmail.com":     "3",
	"kmannuz49@gmail.com":        "4",
	"charlie.mullen12@gmail.com": "5",
	"tjfoley112358@gmail.com":    "6",
	"gontarek93@gmail.com":       "7",
	"john.becker94@gmail.com":    "8",
}

var UserNotFound = errors.New("user not found")

func GetUserId(email string) (string, error) {
	id, ok := alphaTestUserIds[email]
	if !ok {
		return "", UserNotFound
	}

	return id, nil
}
