# Podman Action


Run commands in any container environment using Podman.

## Features

- Run commands or scripts in any container image
- Customizable working directory
- Pass additional arguments to podman
- Override container entrypoint
- Captures command output and exit code


## Usage

### Basic usage with default Fedora image

```yaml
name: Test with Fedora
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello from Fedora
        uses: gbraad-actions/podman-action@main
        with:
          run: |
            echo "Hello from Fedora!"
```

### Using a different container
```yaml
name: Test with Ubuntu
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello from Ubuntu
        uses: gbraad-actions/podman-action@main
        with:
          image: ubuntu:22.04
          run: |
            echo "Hello from Ubuntu!"
```

### Using a script file
```yaml
name: Run script
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Run script in container
        uses: gbraad-actions/podman-action@main
        with:
          image: fedora:latest
          script-file: ./scripts/my-script.sh
```

### Using additional Podman arguments
```yaml
name: Custom podman args
on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run with custom podman args
        uses: gbraad-actions/podman-action@main
        with:
          image: fedora:latest
          podman-args: "--privileged --env MY_VAR=value"
          run: |
            echo $MY_VAR
```

