import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState, post} from "react";


export default function BaseTable() {
    const [rows, setRows] = useState([]);
    const [nome, setNome] = useState([]);
    const [ano, setAno] = useState([]);
    const [idade, setIdade] = useState([]);
    const [id, setId] = useState([]);
    const [posts, setPosts] = useState([]);
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
    const inputId = (e) => {
      setId(e.target.value);
    };
    function postNome()
    {
        axios.post('http://localhost:3002/filmes', { id: id, nome: nome, ano: ano, idade: idade })
        .then(axios.get("http://localhost:3002/filmes"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));

    }

    //-------------Atualizar----------------------------------------------------
    function handUpdate()
    {
         axios.put(`http://localhost:3002/filmes/${id}`, { id: id, nome: nome, ano: ano, idade: idade })
        .then(axios.get("http://localhost:3002/filmes"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));

    }

    //-------------deletar----------------------------------------------------

    function deletePost(id, ) {
          axios.delete(`http://localhost:3002/filmes/${id}`)
          .then(() => {
          alert("Post deleted!");
          setPost(id)
          setPosts(posts.filter(post => post._id !== id))
        });
    }

  return (

    <Table striped responsive bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <header>
            <label>Id</label> 
            <input onChange={(e) => inputId(e)} />
            <br />
            <label>Título</label>
            <input onChange={(e) => inputNome(e)} />
            <br />
            <label>Ano</label>
            <input onChange={(e) => inputAno(e)} />
            <br />
            <label>Idade</label>
            <input onChange={(e) => inputIdade(e)} />
            <br />


            <Button variant="primary" onClick={() => postNome()}>Adicionar</Button>{" "}


          </header>
        </tr>
        <tr d-inline-block>
          <th>ID</th>
          <th>Título</th>
          <th>Ano</th>
          <th>Idade</th>
          <th>Escolha</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr responsive {...id}>
            <td>{row.id}</td>
            <td>{row.nome}</td>
            <td>{row.ano}</td>
            <td>{row.idade}</td>
            <td>
              <Button responsive variant="secondary" onClick={() => handUpdate(post)}>Update</Button>{" "}
              <Button variant="danger" onClick={()=> deletePost(id) }>Excluir</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
