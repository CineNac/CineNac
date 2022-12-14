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
    const handleUpdate = async post => {
      post.nome = "Atualizando ...";
      await axios.put(apiEndPoint + "/filmes" + post.id);
      const postsClone = [...posts];
      const index = postsClone.indexOf(post);
      setPosts(postsClone);
      post.then((Response) => setRows(Response.data))
    }
  
    //-------------deletar----------------------------------------------------
const handDelete =  async post=> {
  await axios.delete(apiEndPoint +  '/filmes' + post.id + post);
  setPosts(posts.filter((p) => p.id === post.id));
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
            
      
          </header>
        </tr>
        <tr>
          <th>ID</th>
          <th>Título</th>
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
              <Button variant="primary" onClick={() => handleUpdate(post)}>Update</Button>{" "}
              <Button variant="danger" onClick={()=> handDelete}>Excluir</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
