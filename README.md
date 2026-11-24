# msa-port-twin-fe

Interface for an AI-powered maritime digital twin for port monitoring, vessel simulation, berth scheduling, and scenario analysis.

# Set-up Instructions

- Clone the repo
  ```
  git clone https://github.com/feralsyntax/msa-port-twin-fe
  ```
- navigate to the `React` project folder
  ```
  cd msa-port-twin-fe/port-twin
  ```
- Install dependencies
  ```
  npm ci
  ```
- Generate code from the API schema
  ```
  npx orval
  ```

  - You can find the generated code in `src/api/generated` and `src/api/models`
- Start local development server
  ```
  npm run dev
  ```

# API schema and generated client

The frontend API models and React Query hooks are generated from
`src/api/schema/schema.yml` with Orval. Run the following commands from the
`port-twin` directory.

## Refresh the API schema

From the local backend repository:

- Windows (PowerShell)
  ```powershell
  Copy-Item ..\..\msa-port-twin-be\docs\api\schema.yml src\api\schema\schema.yml
  ```
- Linux
  ```bash
  cp ../../msa-port-twin-be/docs/api/schema.yml src/api/schema/schema.yml
  ```

From the public backend repository:

- Windows (PowerShell)
  ```powershell
  Invoke-WebRequest `
    -Uri "https://raw.githubusercontent.com/feralsyntax/msa-port-twin-be/main/docs/api/schema.yml" `
    -OutFile src\api\schema\schema.yml
  ```
- Linux
  ```bash
  curl -L "https://raw.githubusercontent.com/feralsyntax/msa-port-twin-be/main/docs/api/schema.yml" \
    -o src/api/schema/schema.yml
  ```
  or
  ```
  wget -O src/api/schema/schema.yml https://raw.githubusercontent.com/feralsyntax/msa-port-twin-be/main/docs/api/schema.yml
  ```

## Generate the client with Orval

- On any OS
  ```
  npx orval
  ```

The generated code is available in `src/api/generated` and `src/api/models`.

## Build for deployment

- On any OS
  ```
  npm run build
  ```

# Checks

Before making a pull request, make the following checks:

- Run linting
  ```
  npm run lint
  ```
- Automatically fix fixable issues
  ```
  npm run lint:fix
  ```
- Run code formatting
  ```
  npm run format
  ```
- Check code formatting without fixing
  ```
  npm run format:check
  ```
