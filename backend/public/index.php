<?php

require("../vendor/autoload.php");

use Dotenv\Dotenv;

$rootFolder = "";
if (basename(__DIR__) == "public") {
    $rootFolder = dirname(__DIR__);
}

$dotenv = Dotenv::createImmutable($rootFolder, ".env");
$dotenv->load();

$app = new \App\Core\Router();