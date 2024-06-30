<?php

use App\Core\Model;

class Sale {

    public $id;
    public $sale_date;
    public $total;
    public $total_tax;

    public function getAll() {
        $sql = " SELECT * FROM tb_sales ";

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
        $sql = " SELECT * FROM tb_sales WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $result = $stmt->fetch(\PDO::FETCH_OBJ);

            $this->id = $result->id;
            $this->sale_date = $result->sale_date;
            $this->total = $result->total;
            $this->total_tax = $result->total_tax;

            return $this;
        } else {
            return false;
        }
    }

    public function store() {
        $sql = " INSERT INTO tb_sales (sale_date, total, total_tax) VALUES  (?, ?, ?)  ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->sale_date);
        $stmt->bindValue(2, $this->total);
        $stmt->bindValue(3, $this->total_tax ?? 0);

        if ($stmt->execute()) {
            $this->id = Model::getConn()->lastInsertId();
            return $this;
        } else {
            return false;
        }
    }

    public function update() {

        $sql = " UPDATE tb_sales SET total = ?, total_tax = ? WHERE id = ? ";
        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->total ?? 0);
        $stmt->bindValue(2, $this->total_tax ?? 0);
        $stmt->bindValue(3, $this->id);

        return $stmt->execute();
    }

    public function delete() {
        $sql = " DELETE FROM tb_sales WHERE id = ? ";

        $stmt = Model::getConn()->prepare($sql);
        $stmt->bindValue(1, $this->id);

        return $stmt->execute();
    }
}