# atoum/atoum

![atoum](http://downloads.atoum.org/images/logo.png)

## Install it

Pull the [docker](https://www.docker.com/) image:

```sh
$ docker pull atoum/atoum
```

There are several tags available. Depending on the atoum version you want to use, you should use:

* `atoum/atoum:latest` to get an image containing the last stable atoum release,
* `atoum/atoum:2.x` to get an image containing the last `2.x` atoum release,
* `atoum/atoum:1.x` to get an image containing the last `1.x` atoum release.

## Run it

Run the container:

```sh
$ docker run --rm -it -v $(pwd):/src atoum/atoum -d tests/units
```

The command explains as follow:

```sh
$ docker run --rm -it -v <working-directory>:/src atoum/atoum [atoum-arguments]
```

As you can see, you will have to provide a directory to link to the `/src` volume.
`atoum-arguments` are standard atoum CLI arguments which you can find by using `-h`.

## Utilities

The docker image ships with a handy command line utility you can access to with the `atoum` command
inside your containers. This command is automatically run as the entrypoint but if you are
extending this image or working in it, you will probably use the `atoum` CLI so here is
how it works:

* the `ext-install` command lets you install and configure atoum extensions:

  ```sh
  $ atoum ext-install bdd

  $ atoum ext-install json '~1.0'
  ```

* the `ext-update` command lets you update installed extensions:

  ```sh
  $ atoum ext-update bdd
  ```

* the `update` command lets you keep atoum up-to-date:

  ```sh
  $ atoum update
  ```

* the `update-all` command lets you update everything (atoum and all installed extensions):

  ```sh
  $ atoum update-all
  ```

* the `say` command lets you make atoum talk:

  ```sh
  $ atoum say 'Hello World!'
  ```

* every other things you pass to the `atoum` CLI will be forwarded to the original `atoum` binary. For example
  the following command will run the tests in `tests/units` and enable the loop mode:

  ```sh
  $ atoum -d tests/units --loop
  ```
