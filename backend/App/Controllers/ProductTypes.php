<?php

use App\Core\Controller;

class ProductTypes extends Controller {

    public function index() {
        $model = $this->model("ProductType");
        $data = $model->getAll();
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function find($id) {
        $model = $this->model("ProductType");
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

        if (!isset($fields->name) || $fields->name == "") {
            http_response_code(400);
            $errors[] = json_encode(["error" => "The field 'name' is required"]);
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

        $model = $this->model("ProductType");
        $model->name = $insertFields->name;

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

        $model = $this->model("ProductType");

        if(!$model->find($id)){
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
            exit;
        }
            
        $model->id = $id;
        $model->name = $updateFields->name;

        if($model->update()){
            http_response_code(200);
            echo json_encode($model);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to update"]);
        }
    }

    public function delete($id){
        $model = $this->model("ProductType");

        if(!$model){
            http_response_code(404);
            echo json_encode(["error" => "Register not found"]);
            exit;
        }

        $model->id = $id;

        if($model->delete()){
            http_response_code(204);
        }else{
            http_response_code(500);
            echo json_encode(["error" => "Problems to delete"]);
        }
    }

}