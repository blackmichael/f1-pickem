# aws-exports.js

This directory contains `aws-exports.js` which is the AWS Amplify configuration file.

## About this file

- **Stub version (committed)**: A stub `aws-exports.js` is committed to the repository to allow builds without AWS Amplify setup
- **Real version (gitignored)**: When you run `amplify init` or `amplify pull`, a real `aws-exports.js` will be generated and will override the stub
- The real version is gitignored (see `web/.gitignore`)

## Usage

### Demo Mode
In demo mode (`REACT_APP_DEMO_MODE=true`), the stub file is sufficient. Amplify is never initialized, so the configuration values don't matter.

### Production Mode
For production mode with real AWS backend:
1. Run `amplify init` or `amplify pull` in the `web/` directory
2. This will generate a real `aws-exports.js` with your AWS configuration
3. The real file will override the stub but won't be committed (gitignored)

## Important Notes

- **Never commit your real aws-exports.js** - It contains sensitive AWS configuration
- The stub file is safe to commit (contains dummy values)
- If you accidentally commit your real config, rotate your AWS credentials immediately
