<?php

use App\Core\Model;

class SaleItem {

    public $id;
    public $sale_id;
    public $product_id;
    public $quantity;
    public $price;
    public $tax;

    public function getAll() {
        $sql = " SELECT * FROM tb_sale_items ";

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
        $sql = " SELECT * FROM tb_sale_items WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            $this->id = $result->id;
            $this->sale_id = $result->sale_id;
            $this->product_id = $result->product_id;
            $this->quantity = $result->quantity;
            $this->price = $result->price;
            $this->tax = $result->tax;

            return $this;
        } else {
            return false;
        }
    }

    public function store() {
        $sql = " INSERT INTO tb_sale_items (sale_id, product_id, quantity, price, tax) VALUES  (?, ?, ?, ?, ?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->sale_id);
        $stmt->bindValue(2, $this->product_id);
        $stmt->bindValue(3, $this->quantity);
        $stmt->bindValue(4, $this->price);
        $stmt->bindValue(5, $this->tax);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function update() {

        $sql = " UPDATE tb_sale_items SET sale_id = ?, product_id = ?, quantity = ?, price = ?, tax = ? WHERE id = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->sale_id ?? '');
        $stmt->bindValue(2, $this->product_id ?? '');
        $stmt->bindValue(3, $this->quantity ?? 0);
        $stmt->bindValue(4, $this->price ?? 0);
        $stmt->bindValue(5, $this->tax ?? 0);
        $stmt->bindValue(6, $this->id);

        return $stmt->execute();

    }

    public function delete() {
        $sql = " DELETE FROM tb_sale_items WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->id);

        return $stmt->execute();
    }
}