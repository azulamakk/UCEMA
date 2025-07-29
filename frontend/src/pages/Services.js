import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { servicesAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await servicesAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.location) params.location = filters.location;
      if (filters.search) params.search = filters.search;

      const response = await servicesAPI.getServices(params);
      setServices(response.data);
    } catch (err) {
      setError("Error al obtener servicios");
      console.error("Error al obtener servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const getAvailabilityBadge = (availability) => {
    const variants = {
      available: "success",
      busy: "warning",
      unavailable: "danger",
    };
    const labels = {
      available: "Disponible",
      busy: "Ocupado",
      unavailable: "No disponible",
    };
    return <Badge bg={variants[availability]}>{labels[availability]}</Badge>;
  };

  if (loading && services.length === 0) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Servicios Disponibles</h1>
            {user?.user_type === "provider" && (
              <Button as={Link} to="/create-service" variant="success">
                Agregar Servicio
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filtrar por ubicación"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Buscar</Form.Label>
            <Form.Control
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Buscar servicios..."
            />
          </Form.Group>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {services.length === 0 && !loading ? (
          <Col>
            <Alert variant="info">
              No se encontraron servicios que coincidan con los filtros.
            </Alert>
          </Col>
        ) : (
          services.map((service) => (
            <Col md={6} lg={4} key={service.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {service.category_name}
                  </Card.Subtitle>
                  <Card.Text>
                    {service.description.substring(0, 150)}
                    {service.description.length > 150 && "..."}
                  </Card.Text>
                  <div className="mb-2">
                    <small className="text-muted">📍 {service.location}</small>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">
                      💰 {service.price_range}
                    </small>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">
                      👨‍🌾 {service.provider.username}
                    </small>
                  </div>
                  <div className="mb-3">
                    {getAvailabilityBadge(service.availability)}
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Button
                    as={Link}
                    to={`/services/${service.id}`}
                    variant="outline-success"
                    size="sm"
                  >
                    Ver Detalles
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Services;
