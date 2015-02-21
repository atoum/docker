#!/usr/bin/env bats

@test "composer should be initialized" {
    [ -d /root/.composer ]
}

@test "atoum should be installed" {
    [ -d /root/.composer/vendor/atoum/atoum ]
}

@test "atoum should be executable" {
    [ -x /root/.composer/vendor/atoum/atoum/bin/atoum ]
}

@test "atoum configuration file should exist" {
    [ -f /.atoum.php ]
}

@test "atoum bootstrap file should exist" {
    [ -f /.bootstrap.atoum.php ]
}

@test "atoum autoloaders file should exist" {
    [ -f /.autoloaders.atoum.php ]
}

@test "atoum extensions file should exist" {
    [ -f /.extensions.atoum.php ]
}

@test "atoum CLI should be available" {
    [ -x /usr/local/bin/atoum ]
}

@test "atoum CLI should fallback to atoum binary" {
    run atoum -v

    [ "$status" -eq 0 ]
    echo "${lines[0]}" | grep -P "atoum version .*2\\..*"
}
