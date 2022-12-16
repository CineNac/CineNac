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
    axios.get(apiEndPoint)
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
    const post = {id:id}
    function postNome()
    {
        axios.post(apiEndPoint, { id: id, nome: nome, ano: ano, idade: idade })
        .then(axios.get(apiEndPoint))
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

    function deletePost(id) {
          axios.delete(`http://localhost:3002/filmes/${id}`)
          .then(() => {
          alert("Post deleted!");
          setPosts(id)
          setPosts(posts.filter(post => post._id !== id))
        });
    }

  return (
    <div className="container">

            <label><h5>ID</h5></label>
            <input onChange={(e) => inputId(e)} />

            <label><h5>Título</h5></label>
            <input onChange={(e) => inputNome(e)} />

            <label><h5>Lançamento</h5></label>
            <input onChange={(e) => inputAno(e)} />

            <label><h5>Faixa Etária</h5></label>
            <input onChange={(e) => inputIdade(e)} />


              
            <Button style={{"margin-left": "5px","margin-bottom": "5px"}} variant="dark" onClick={() => postNome()}>Adicionar</Button>{" "}


    <Table striped responsive bordered hover size="sm" variant="dark">
      <thead>

        <tr d-inline-block>
          <th>ID</th>
          <th>Título</th>
          <th>Ano</th>
          <th>Faixa Etária</th>
          <th>Atualização</th>
          <th>Eliminar</th>
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
              </td>
            <td>
              <Button variant="danger" onClick={()=> deletePost(id) }>Excluir</Button>{" "}
              </td>
          </tr>
        ))}
      </tbody>
      </Table>
</div>
  );
}
