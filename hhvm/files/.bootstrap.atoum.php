<?php

require_once __DIR__ . '/.autoloaders.atoum.php';

if (is_file($bootstrapFile = '/src/.bootstrap.atoum.php'))
{
    require_once $bootstrapFile;
}
