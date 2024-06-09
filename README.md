
# EuroPark Automation

This project automates the process of logging into EuroPark, starting a parking session, and sending a notification via Telegram.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [GitHub Actions](#github-actions)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/USERNAME/europark-automation.git
    cd europark-automation
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Install the Playwright browsers:

    ```bash
    npx playwright install
    ```

## Usage

1. Compile the TypeScript files:

    ```bash
    npx tsc
    ```

2. Run the script:

    ```bash
    node dist/main.js
    ```

## Docker

### Building the Docker Image

To build the Docker image, run the following command:

```bash
docker build -t europark-automation .
```

### Running the Docker Container

To run the Docker container with your environment variables, use the following command:

```bash
docker run \
  -e EMAIL=email \
  -e PASSWORD=password \
  -e VEHICLE_REG=number \
  -e TELEGRAM_BOT_TOKEN=token \
  -e TELEGRAM_CHAT_ID=id \
  europark-automation
```

## GitHub Actions

This project includes a GitHub Actions workflow to run the automation script daily.

### Setting Up GitHub Actions

1. Add your secrets to the GitHub repository:

    - `EMAIL`
    - `PASSWORD`
    - `VEHICLE_REG`
    - `TELEGRAM_BOT_TOKEN`
    - `TELEGRAM_CHAT_ID`

2. The workflow is defined in `.github/workflows/schedule.yml`:

## Environment Variables

The following environment variables are used by the script:

- `EMAIL`: Your EuroPark email address.
- `PASSWORD`: Your EuroPark password.
- `VEHICLE_REG`: Your vehicle registration number.
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token.
- `TELEGRAM_CHAT_ID`: Your Telegram chat ID.

Make sure to set these variables in your environment or pass them directly when running the Docker container.

## License

This project is licensed under the MIT License.
