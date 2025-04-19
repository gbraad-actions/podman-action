const core = require('@actions/core');
const exec = require('@actions/exec');

async function action() {
  try {
    const image = core.getInput('image', { required: true });
    const runCommands = core.getMultilineInput('args', { required: true });
    const workingDirectory = core.getInput('working-directory') || '.';
    const entrypoint = core.getInput('entrypoint');
    const podmanArgs = core.getInput('podman-args') || '';

    const podmanCommand = ['podman', 'run', '--rm'];
    podmanCommand.push('-v', `${process.env.GITHUB_WORKSPACE}:${process.env.GITHUB_WORKSPACE}`);
    podmanCommand.push('-w', `${process.env.GITHUB_WORKSPACE}/${workingDirectory}`);

    if (podmanArgs) {
      podmanCommand.push(...podmanArgs.split(' '));
    }

    if (entrypoint) {
      podmanCommand.push('--entrypoint', entrypoint);
    }

    podmanCommand.push(image);
    podmanCommand.push(...runCommands);

    core.debug(`Podman command: ${podmanCommand.join(' ')}`);

    const exitCode = await exec.exec(podmanCommand.join(' '));
    core.setOutput('exit-code', exitCode);
  } catch (error) {
    core.setFailed(error.message);
  }
}

// 3... 2... 1...
action();
