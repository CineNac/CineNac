import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BaseTableFunc() {
  const [nome, setNome] = useState("");
  const [posts, setPosts] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [cargo, setCargo] = useState([]);
  const [turno, setTurno] = useState([]);
  const [id, setId] = useState([]);
  const apiEndPoint = "http://localhost:3002/funcionarios";

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  }, []);

  //Inserindo o post - const
  const handPost = async () => {
    const post = {
      id: id,
      nome: nome,
      usuario: usuario,
      cargo: cargo,
      turno: turno,
    };

    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };
  //Atualizando - put
  const handUpdate = async (post) => {
    console.log(post.id);
    post.nome = nome;
    post.usuario = usuario;
    post.cargo = cargo;
    post.turno = turno;
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

  const handlerNome = (e) => {
    setNome(e.target.value);
  };
  const handlerCargo = (e) => {
    setCargo(e.target.value);
  };
  const handlerTurno = (e) => {
    setTurno(e.target.value);
  };
  const handlerUsuario = (e) => {
    setUsuario(e.target.value);
  };
  const handlerID = (e) => {
    setId(e.target.value);
  };

  return (
    <div className="container">
      <label><h5>ID</h5></label>
      <input onChange={(e) => handlerID(e)} />
      <label><h5>Nome</h5></label>
      <input onChange={(e) => handlerNome(e)} />
      <label><h5>Usuário</h5></label>
      <input onChange={(e) => handlerUsuario(e)} />
      <label><h5>Cargo</h5></label>
      <input onChange={(e) => handlerCargo(e)} />
      <br />
      <label><h5>Turno</h5></label>
      <input onChange={(e) => handlerTurno(e)} />
      <Button style={{"margin-left": "5px","margin-bottom": "5px"}}  variant="dark" onClick={handPost} >
        Adicionar
      </Button>
      <Table striped responsive bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Cargo</th>
            <th>Turno</th>
            <th>Atualização</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td> {post.id} </td>
              <td> {post.nome} </td>
              <td> {post.usuario} </td>
              <td> {post.cargo} </td>
              <td> {post.turno} </td>
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
