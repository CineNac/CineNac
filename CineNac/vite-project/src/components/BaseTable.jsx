import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BaseTable() {
    const [rows, setRows] = useState([]);
    const [nome, setNome] = useState([]);
    const [ano, setAno] = useState([]);
    const [classs, setClasss] = useState([]);

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
    const inputClasss = (e) => {
      setClasss(e.target.value);
    };
    function postNome()
    {
        axios.post('http://localhost:3002/filmes', { nome: nome, ano: ano, classificacao: classs })
        .then(axios.get("http://localhost:3002/filmes"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));
    }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <header>
            <label>Nome</label>
            <input onChange={(e) => inputNome(e)} /> 
            <label>E-mail</label>
            <input onChange={(e) => inputAno(e)} /> 
            <label>Idade</label>
            <input onChange={(e) => inputClasss(e)} /> 
            <Button variant="primary" onClick={() => postNome()}>Adicionar</Button>{" "}
          </header>
        </tr>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ano</th>
          <th>Classificacao</th>
          <th>Escolha</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr Key={rows.id}>
            <td>{row.id}</td>
            <td>{row.nome}</td>
            <td>{row.email}</td>
            <td>{row.idade}</td>
            <td>
              <Button variant="primary">Editar</Button>{" "}
              <Button variant="danger">Excluir</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
