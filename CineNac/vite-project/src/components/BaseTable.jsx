import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BaseTable() {
    const [rows, setRows] = useState([]);
    const [nome, setNome] = useState([]);
    const [ano, setAno] = useState([]);
    const [idade, setIdade] = useState([]);
    const [id, setId] = useState([]);
    const apiEndPoint = 'http://localhost:3002/filmes';

  useEffect(() => {
    axios
      .get("http://localhost:3002/filmes")
      .then((Response) => setRows(Response.data))
      .then((error) => console.log(error));
  }, []);
//--------------------------Inserindo Valores
    const inputNome = (e) => {
        setNome(e.target.value)
    }
    const inputAno = (e) => {
      setAno(e.target.value);
    };
    const inputIdade = (e) => {
      setIdade(e.target.value);
    };
    function postNome()
    {
        axios.post('http://localhost:3002/filmes', { nome: nome, ano: ano, idade: idade })
        .then(axios.get("http://localhost:3002/filmes"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));
    }
    
    //-------------Atualizar----------------------------------------------------

    const inputName = (e) => {
      setNome(e.target.value)
  }
  const inputYear = (e) => {
    setAno(e.target.value);
  };
  const inputAge = (e) => {
    setIdade(e.target.value);
  };
  function postNome()
  {
      axios.post('http://localhost:3002/filmes', { nome: nome, ano: ano, idade: idade })
      .then(axios.get("http://localhost:3002/filmes"))
      .then((Response) => setRows(Response.data))
      .then((error) => console.log(error));
  }
    
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <header>
            <label>Título</label>
            <input onChange={(e) => inputNome(e)} /> 
            <label>Ano</label>
            <input onChange={(e) => inputAno(e)} /> 
            <label>Idade</label>
            <input onChange={(e) => inputIdade(e)} /> 
            <Button variant="primary" onClick={() => postNome()}>Adicionar</Button>{" "}
            
          </header><header>
            <label>ID</label>
            <input onChange={(e) => inputNome(e)} />
            <label>Título</label>
            <input onChange={(e) => inputNome(e)} /> 
            <label>Ano</label>
            <input onChange={(e) => inputAno(e)} /> 
            <label>Idade</label>
            <input onChange={(e) => inputIdade(e)} /> 
            <Button variant="primary" onClick={() => postNome()}>Update</Button>{" "}
          </header>
        </tr>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ano</th>
          <th>Idade</th>
          <th>Escolha</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr Key={rows.id}>
            <td>{row.id}</td>
            <td>{row.nome}</td>
            <td>{row.ano}</td>
            <td>{row.idade}</td>
            <td>
              <Button variant="primary" onClick={() => handleUpdate(post)}>Editar</Button>{" "}
              <Button variant="danger">Excluir</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
