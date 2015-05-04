<?php

require_once __DIR__ . '/.autoloaders.atoum.php';
require_once __DIR__ . '/.extensions.atoum.php';

$reports = $script->getReports();

if (sizeof($reports) === 0)
{
    $reports = array($script->addDefaultReport());
}

$reports[0]->addField(new atoum\report\fields\runner\atoum\logo());
