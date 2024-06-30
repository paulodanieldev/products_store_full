<?php

use App\Core\Model;

class Product {

    public $id;
    public $name;
    public $price;
    public $product_type_id;

    public function getAll() {
        $sql = " SELECT * FROM tb_products ";

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
        $sql = " SELECT * FROM tb_products WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            $this->id = $result->id;
            $this->name = $result->name;
            $this->price = $result->price;
            $this->product_type_id = $result->product_type_id;

            return $this;
        } else {
            return false;
        }
    }

    public function store() {
        $sql = " INSERT INTO tb_products (name, price, product_type_id) VALUES  (?, ?, ?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->name);
        $stmt->bindValue(2, $this->price);
        $stmt->bindValue(3, $this->product_type_id);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function update() {

        $sql = " UPDATE tb_products SET name = ?, price = ?, product_type_id = ? WHERE id = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->name ?? '');
        $stmt->bindValue(2, $this->price ?? 0);
        $stmt->bindValue(3, $this->product_type_id ?? '');
        $stmt->bindValue(4, $this->id);

        return $stmt->execute();

    }

    public function delete() {
        $sql = " DELETE FROM tb_products WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->id);

        return $stmt->execute();
    }
}