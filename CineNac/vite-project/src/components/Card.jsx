import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function GroupExample() {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="./src/imagens/filme.PNG" />
        <Card.Body>
          <Button variant="dark" size="lg">
            FILMES
          </Button>{" "}
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="./src/imagens/doces.PNG" />
        <Card.Body>
          <Button variant="dark" size="lg">
            DOCES
          </Button>{" "}
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="./src/imagens/funcionarios.PNG" />
        <Card.Body>
          <Button variant="dark" size="lg">
            FUNCIONÁRIOS
          </Button>{" "}
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default GroupExample;
