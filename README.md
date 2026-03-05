# F1 Pick'em

A full-stack website for making Formula 1 picks with your friends.

Check it out at www.f1pickem.com

### Technologies

- Go
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- Javascript
- React
- Redux
- AWS Amplify
- AWS Route 53
- [Ergast Developer API](http://ergast.com/mrd/)

## Demo Mode

Run the application with mocked data (no AWS backend required):

```bash
docker-compose -f docker-compose.demo.yml up --build
```

Access at http://localhost:3000

**Local development with demo mode:**
```bash
cd web
REACT_APP_DEMO_MODE=true npm start
```

Demo mode includes:
- Pre-populated leagues and races
- Mock authentication (no login required)
- Sample picks and results
- All features functional without AWS

## Development

```bash
# backend
cd backend
make api

# frontend
cd web
npm start
```
