<?php

namespace App\DAO\SourceDonnes;

interface interfaceDAO {
    public function getById(int $id);
    public function getAll();
    public function save(array $entity); 
    public function update(int $id, array $data);
    public function delete(int $id);
}