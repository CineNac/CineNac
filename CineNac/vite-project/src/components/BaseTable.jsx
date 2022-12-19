import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState, post} from "react";


export default function BaseTable() {
    const [nome, setNome] = useState([]);
    const [ano, setAno] = useState([]);
    const [idade, setIdade] = useState([]);
    const [id, setId] = useState([]);
    const [posts, setPosts] = useState([]);
    const apiEndPoint = 'http://localhost:3002/filmes';

    useEffect(() => {
      const getPosts = async () => {
        const { data: res } = await axios.get(apiEndPoint);
        setPosts(res);
      };
      getPosts();
    }, []);  
    //--------------------------Inserindo Valores
    const handPost = async () => {
      const post = {
        id: id,
        nome: nome,
        ano: ano,
        idade: idade,
      };

      await axios.post(apiEndPoint, post);
      setPosts([post, ...posts]);
    };
    //-------------Atualizar----------------------------------------------------
    const handUpdate = async (post) => {
      console.log(post.id);
      post.nome = nome;
      post.ano = ano;
      post.idade = idade;
      await axios.put(apiEndPoint + "/" + post.id);
      const postClone = [...posts];
      const index = postClone.indexOf(post);
      postClone[index] = { ...post };
      setPosts(postClone);
    };
    //-------------deletar----------------------------------------------------

    const handDelete = async (post) => {
      console.log(post);
      await axios.delete(apiEndPoint + "/" + post.id);
      setPosts(posts.filter((p) => p.id !== post.id));
    };
  
    const handlerNome = (e) => {
      setNome(e.target.value);
    };
    const handlerAno = (e) => {
      setAno(e.target.value);
    };
    const handlerIdade = (e) => {
      setIdade(e.target.value);
    };
    const handlerID = (e) => {
      setId(e.target.value);
    };
  
  return (
    <div className="container">

            <label><h5>ID</h5></label>
            <input onChange={(e) => handlerID(e)} />

            <label><h5>Título</h5></label>
            <input onChange={(e) => handlerNome(e)} />

            <label><h5>Lançamento</h5></label>
            <input onChange={(e) => handlerAno(e)} />

            <label><h5>Faixa Etária</h5></label>
            <input onChange={(e) => handlerIdade(e)} />


              
            <Button style={{"margin-left": "5px","margin-bottom": "5px"}}  variant="dark" onClick={handPost} >
        Adicionar
      </Button>


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
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.nome}</td>
            <td>{post.ano}</td>
            <td>{post.idade}</td>
            <td>
              <Button responsive variant="secondary" onClick={() => handUpdate(post)}>Update</Button>{" "}
              </td>
            <td>
              <Button variant="danger"
                  onClick={() => handDelete(post)}>Excluir</Button>{" "}
              </td>
          </tr>
        ))}
      </tbody>
      </Table>
</div>
  );
}
