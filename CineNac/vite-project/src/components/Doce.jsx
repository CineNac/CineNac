import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState, post} from "react";


export default function BaseDoce() {
    const [rows, setRows] = useState([]);
    const [produto, setProduto] = useState([]);
    const [marca, setMarca] = useState([]);
    const [seção, setSeção] = useState([]);
    const [descrição, setDescrição] = useState([]);
    const [posts, setPosts] = useState([]);
    const apiEndPoint = 'http://localhost:3002/doces';

  useEffect(() => {
    axios
.get("http://localhost:3002/doces")
      .then((Response) => setRows(Response.data))
      .then((error) => console.log(error));
  }, []);
//--------------------------Inserindo Valores
    const inputProduto = (e) => {
        setProduto(e.target.value)
    }
    const inputMarca = (e) => {
      setMarca(e.target.value);
    };
    const inputSeção = (e) => {
      setSeção(e.target.value);
    };
    const inputDescrição = (e) => {
      setDescrição(e.target.value);
    };
    function postProduto()
    {
        axios.post('http://localhost:3002/doces', { id: id, marca: marca, produto: produto, seção: seção, descrição: descrição,  })
        .then(axios.get("http://localhost:3002/doces"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));

    }

    //-------------Atualizar----------------------------------------------------
    function handUpdate()
    {
         axios.put(`http://localhost:3002/doces/${id}`, { id: id, marca: marca, produto: produto, seção: seção, descrição: descrição })
        .then(axios.get("http://localhost:3002/doces"))
        .then((Response) => setRows(Response.data))
        .then((error) => console.log(error));

    }

    //-------------deletar----------------------------------------------------

    function deletePost(id, ) {
          axios.delete(`http://localhost:3002/doces/${id}`)
          .then(() => {
          alert("Post deleted!");
          setPost(id)
          setPosts(posts.filter(post => post._id !== id))
        });
    }

  return (
    <Table  ali striped responsive bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <header>
            <label>id</label>
           <input onChange={(e) => inputId(e)} /> <br />
            <label>Produto</label>
            <input onChange={(e) => inputProduto(e)} /> <br />
            <label>Marca</label>
            <input onChange={(e) => inputMarca(e)} /> <br />
            <label>Seção</label>
            <input onChange={(e) => inputSeção(e)} />
            <label>Descrição</label>
            <input onChange={(e) => inputDescrição(e)} />


            <Button variant="primary" onClick={() => postProduto()}>Adicionar</Button>{" "}


          </header>
        </tr>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Marca</th>
          <th>Seção</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr responsive {...id}>
            <td>{row.id}</td>
            <td>{row.produto}</td>
            <td>{row.marca}</td>
            <td>{row.seção}</td>
            <td>{row.descrição}</td>
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
