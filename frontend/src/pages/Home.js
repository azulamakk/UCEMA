import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center py-5">
            <h1 className="display-4 mb-4">Marketplace de Servicios Rurales</h1>
            <p className="lead mb-4">
              Conectando productores agropecuarios con prestadores de servicios
              rurales para asesorías agronómicas, servicios con drones, atención
              veterinaria y alquiler de maquinaria agrícola.
            </p>
            {!isAuthenticated && (
              <div>
                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  size="lg"
                  className="me-3"
                >
                  Comenzar
                </Button>
                <Button
                  as={Link}
                  to="/services"
                  variant="outline-success"
                  size="lg"
                >
                  Ver Servicios
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🌾 Para Productores</Card.Title>
              <Card.Text>
                Encontrá servicios agrícolas expertos para mejorar tu operación,
                desde asesoramiento agronómico hasta alquiler de maquinaria.
              </Card.Text>
              {!isAuthenticated && (
                <Button as={Link} to="/register" variant="outline-success">
                  Registrarse como Productor
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🛠️ Para Prestadores de Servicios</Card.Title>
              <Card.Text>
                Ofrecé tus servicios agrícolas a productores de tu zona. Hacé
                crecer tu negocio y ayudá a que el campo prospere.
              </Card.Text>
              {!isAuthenticated && (
                <Button as={Link} to="/register" variant="outline-success">
                  Registrarse como Prestador
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🤝 Conexión Fácil</Card.Title>
              <Card.Text>
                Nuestra plataforma facilita la conexión, comunicación y
                colaboración en proyectos agrícolas.
              </Card.Text>
              <Button as={Link} to="/services" variant="outline-success">
                Ver Servicios
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isAuthenticated && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  ¡Bienvenido/a de nuevo, {user?.username}!
                </Card.Title>
                <Card.Text>
                  Estás registrado como{" "}
                  {user?.user_type === "producer"
                    ? "Productor Agropecuario"
                    : "Prestador de Servicios"}
                  .
                </Card.Text>
                <div>
                  <Button
                    as={Link}
                    to="/services"
                    variant="success"
                    className="me-3"
                  >
                    Ver Servicios
                  </Button>
                  {user?.user_type === "provider" && (
                    <Button
                      as={Link}
                      to="/my-services"
                      variant="outline-success"
                      className="me-3"
                    >
                      Gestionar Mis Servicios
                    </Button>
                  )}
                  <Button as={Link} to="/requests" variant="outline-success">
                    Ver Solicitudes
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
