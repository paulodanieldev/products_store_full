<?php

use App\Core\Model;

class Tax {

    public $id;
    public $product_type_id;
    public $tax_rate;

    public function getAll() {
        $sql = " SELECT * FROM tb_taxes ";

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
        $sql = " SELECT * FROM tb_taxes WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            $this->id = $result->id;
            $this->tax_rate = $result->tax_rate;
            $this->product_type_id = $result->product_type_id;

            return $this;
        } else {
            return false;
        }
    }

    public function store() {
        $sql = " INSERT INTO tb_taxes (tax_rate, product_type_id) VALUES  (?, ?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->tax_rate);
        $stmt->bindValue(2, $this->product_type_id);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function update() {

        $sql = " UPDATE tb_taxes SET tax_rate = ?, product_type_id = ? WHERE id = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->tax_rate ?? 0);
        $stmt->bindValue(2, $this->product_type_id ?? '');
        $stmt->bindValue(3, $this->id);

        return $stmt->execute();

    }

    public function delete() {
        $sql = " DELETE FROM tb_taxes WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->id);

        return $stmt->execute();
    }
}