<?php

use App\Core\Model;

class ProductType {

    public $id;
    public $name;

    public function getAll() {
        $sql = " SELECT * FROM tb_product_types ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetchAll(\PDO::FETCH_OBJ);

            return $result;
        } else {
            return [];
        }
    }

    public function find($id) {
        $sql = " SELECT * FROM tb_product_types WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            $this->id = $result->id;
            $this->name = $result->name;

            return $this;
        } else {
            return false;
        }
    }

    public function store() {
        $sql = " INSERT INTO tb_product_types (name) VALUES  (?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->name);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function update() {

        $sql = " UPDATE tb_product_types SET name = ? WHERE id = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->name ?? '');
        $stmt->bindValue(2, $this->id);

        return $stmt->execute();

    }

    public function delete() {
        $sql = " DELETE FROM tb_product_types WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->id);

        return $stmt->execute();
    }
}