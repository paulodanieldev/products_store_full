<?php

use App\Core\Controller;

class Sales extends Controller {

    public function index() {
        $model = $this->model("Sale");
        $data = $model->getAll();
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function find($id) {
        $model = $this->model("Sale");
        $data = $model->find($id);

        if ($data) {
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
        }
    }

    function validateFields($fields) {
        $errors = [];
        $errorFields = [];

        if (!isset($fields->total) || empty($fields->total))
            $errorFields[] = "total";

        if(count($errorFields) > 0){
            http_response_code(400);
            if (count($errorFields) > 1)
                $errors[] = json_encode(["error" => "The fields '".implode(", ", $errorFields)."' are required"]);
            else
                $errors[] = json_encode(["error" => "The field '".implode(", ", $errorFields)."' is required"]);
        }

        return $errors;
    }

    function validateSalesItemsFields($fields) {
        $errors = [];
        $errorFields = [];

        if (!isset($fields->items) || empty($fields->items))
            $errorFields[] = "items";

        if(count($errorFields) > 0){
            http_response_code(400);
            if (count($errorFields) > 1)
                $errors[] = json_encode(["error" => "The fields '".implode(", ", $errorFields)."' are required"]);
            else
                $errors[] = json_encode(["error" => "The field '".implode(", ", $errorFields)."' is required"]);
        }

        return $errors;
    }

    function validateCalculateTaxFields($fields) {
        $errors = [];
        $errorFields = [];

        if (!isset($fields->product_id) || empty($fields->product_id))
            $errorFields[] = "product_id";

        if (!isset($fields->total) || empty($fields->total))
            $errorFields[] = "total";

        if(count($errorFields) > 0){
            http_response_code(400);
            if (count($errorFields) > 1)
                $errors[] = json_encode(["error" => "The fields '".implode(", ", $errorFields)."' are required"]);
            else
                $errors[] = json_encode(["error" => "The field '".implode(", ", $errorFields)."' is required"]);
        }

        return $errors;
    }

    public function store(){
        $json = file_get_contents("php://input");
        $insertFields = json_decode($json);

        $errors = $this->validateFields($insertFields);

        if (count($errors) > 0) {
            foreach($errors as $erro){
                echo $erro;
            }
            exit();
        }

        $model = $this->model("Sale");
        $model->sale_date = date("Y-m-d H:i:s");
        $model->total = $insertFields->total;
        $model->total_tax = $insertFields->total_tax ?? 0;

        if($model->store()){
            http_response_code(201);
            echo json_encode($model);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to insert productType"]);
        }
    }

    public function update($id){

        $json = file_get_contents("php://input");

        $updateFields = json_decode($json);

        $model = $this->model("Sale");

        if(!$model->find($id)){
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
            exit;
        }
            
        $model->id = $id;
        $model->total = $updateFields->total;
        $model->total_tax = $updateFields->total_tax ?? 0;

        if($model->update()){
            http_response_code(200);
            echo json_encode($model);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to update"]);
        }
    }

    public function delete($id){
        $model = $this->model("Sale");

        if(!$model->find($id)){
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
            exit;
        }

        $model->id = $id;

        $modelSaleItem = $this->model("SaleItem");
        $modelSaleItem->deleteBySale($id);

        if($model->delete()){
            http_response_code(204);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to delete"]);
        }
    }

    public function createSalesItems(){
        $json = file_get_contents("php://input");
        $insertFields = json_decode($json);

        $errors = $this->validateSalesItemsFields($insertFields);

        if (count($errors) > 0) {
            foreach($errors as $erro){
                echo $erro;
            }
            exit();
        }

        $modelSale = $this->model("Sale");
        $modelSale->sale_date = date("Y-m-d H:i:s");
        $modelSale->total = 0;
        $modelSale->total_tax = 0;

        $sale = $modelSale->store();

        $total = 0;
        $total_tax = 0;

        $items = [];

        foreach($insertFields->items as $item){
            $total += $item->total;
            $total_tax += $item->tax;

            $modelSaleItem = $this->model("SaleItem");
            $modelSaleItem->sale_id = $sale->id;
            $modelSaleItem->product_id = $item->product_id;
            $modelSaleItem->quantity = $item->quantity;
            $modelSaleItem->price = $item->price;
            $modelSaleItem->tax = $item->tax ?? 0;
            
            $item = $modelSaleItem->store();

            $items[] = $item;
        }

        $modelSale->id = $sale->id;
        $modelSale->total = $total;
        $modelSale->total_tax = $total_tax;

        $result = [
            "id" => $modelSale->id,
            "sale_date" => $modelSale->sale_date,
            "total" => $modelSale->total,
            "total_tax" => $modelSale->total_tax,
            "items" => $items
        ];

        if($modelSale->update()){
            http_response_code(201);
            echo json_encode($result);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to insert productType"]);
        }
    }

    public function updateSalesItems($id){
        $json = file_get_contents("php://input");
        $updateFields = json_decode($json);

        $model = $this->model("Sale");

        if(!$model->find($id)){
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
            exit;
        }

        $modelSaleItem = $this->model("SaleItem");
        $modelSaleItem->deleteBySale($id);

        $items = [];

        foreach($updateFields->items as $item){
            $modelSaleItem = $this->model("SaleItem");
            $modelSaleItem->sale_id = $id;
            $modelSaleItem->product_id = $item->product_id;
            $modelSaleItem->quantity = $item->quantity;
            $modelSaleItem->price = $item->price;
            $modelSaleItem->tax = $item->tax ?? 0;
            
            $item = $modelSaleItem->store();

            $items[] = $item;
        }

        $result = [
            "id" => $model->id,
            "sale_date" => $model->sale_date,
            "total" => $updateFields->total,
            "total_tax" => $updateFields->total_tax ?? 0,
            "items" => $items
        ];

        $model->id = $id;
        $model->total = $updateFields->total;
        $model->total_tax = $updateFields->total_tax ?? 0;

        if($model->update()){
            http_response_code(200);
            echo json_encode($result);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to insert productType"]);
        }
    }

    public function calculateTax(){
        $json = file_get_contents("php://input");
        $insertFields = json_decode($json);

        $errors = $this->validateCalculateTaxFields($insertFields);

        if (count($errors) > 0) {
            foreach($errors as $erro){
                echo $erro;
            }
            exit();
        }

        $modelProduct = $this->model("Product");
        $product = $modelProduct->find($insertFields->product_id);

        $modelTax = $this->model("Tax");
        $tax = $modelTax->findByProductType($product->product_type_id ?? 0);

        echo json_encode(["tax_result" => round($insertFields->total * ($tax->tax_rate / 100), 2),
                          "tax_rate" => $tax->tax_rate]);
    }

    public function getSaleItems($id){
        $model = $this->model("SaleItem");
        $data = $model->getBySale($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

}