import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css'
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState, post} from "react";


export default function BaseDoce() {
    const [produto, setProduto] = useState([]);
    const [marca, setMarca] = useState([]);
    const [secao, setSecao] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState([]);
    const apiEndPoint = 'http://localhost:3002/doces';

    useEffect(() => {
      const getPosts = async () => {
        const { data: res } = await axios.get(apiEndPoint);
        setPosts(res);
      };
      getPosts();
    }, []);
      ///Inserindo o post - const
      const handPost = async () => {
        const post = {
          id: id,
          produto: produto,
          marca: marca,
          secao: secao,
          descricao: descricao,
        };

        await axios.post(apiEndPoint, post);
        setPosts([post, ...posts]);
      };

    //Atualizando - put
  const handUpdate = async (post) => {
    console.log(post.id);
    post.produto = produto;
    post.marca = marca;
    post.secao = secao;
    post.descricao = descricao;
    await axios.put(apiEndPoint + "/" + post.id);
    const postClone = [...posts];
    const index = postClone.indexOf(post);
    postClone[index] = { ...post };
    setPosts(postClone);
  };

    //deletar - delete
  const handDelete = async (post) => {
    console.log(post);
    await axios.delete(apiEndPoint + "/" + post.id);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const handlerProduto = (e) => {
    setProduto(e.target.value);
  };
  const handlerMarca = (e) => {
    setMarca(e.target.value);
  };
  const handlerSecao = (e) => {
    setSecao(e.target.value);
  };
  const handlerDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handlerID = (e) => {
    setId(e.target.value);
  };


  return (
    <div className="container">
    <label><h5>ID</h5></label>
    <input onChange={(e) => handlerID(e)} />
    <label><h5>Produto</h5></label>
    <input onChange={(e) => handlerProduto(e)} />
    <label><h5>Marca</h5></label>
    <input onChange={(e) => handlerMarca(e)} />
    <label><h5>Seção</h5></label>
    <input onChange={(e) => handlerSecao(e)} />
    <br />
    <label><h5>Descrição</h5></label>
    <input onChange={(e) => handlerDescricao(e)} />
    <Button style={{"margin-left": "5px","margin-bottom": "5px"}} variant="dark" onClick={handPost} >
      Adicionar
    </Button>
    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Marca</th>
          <th>Seção</th>
          <th>Descrição</th>
          <th>Atualização</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td> {post.id} </td>
            <td> {post.produto} </td>
            <td> {post.marca} </td>
            <td> {post.secao} </td>
            <td> {post.descricao} </td>
            <td>
              <Button responsive variant="secondary"
                onClick={() => handUpdate(post)}
          
              >
                Update
              </Button>
            </td>
            <td>
              <Button variant="danger"
                onClick={() => handDelete(post)}
                
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
}

