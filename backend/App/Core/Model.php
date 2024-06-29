<?php

namespace App\Core;

class Model {

    private static $conexao;

    public static function getConn(){
        $dbConnection = $_ENV["DB_CONNECTION"];
        $host = $_ENV["DB_HOST"];
        $database = $_ENV["DB_DATABASE"];
        $user = $_ENV["DB_USERNAME"];
        $password = $_ENV["DB_PASSWORD"];
        $port = $_ENV["DB_PORT"];

        try {
            if(!isset(self::$conexao)){
                self::$conexao = new \PDO("$dbConnection:host=$host;port=$port;dbname=$database;", $user, $password);
                self::$conexao->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            }
        } catch (\PDOException $e) {
            echo 'ERROR: ' . $e->getMessage() . ' - ' . "$dbConnection:host=$host;port=$port;dbname=$database;";
            die();
        }

        return self::$conexao;
    }
}