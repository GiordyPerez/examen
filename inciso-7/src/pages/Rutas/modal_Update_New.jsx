import React, {Component} from 'react';
import {Button, Form, ModalFooter} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import {routeService} from '../../services/routes.services';
import {cityService} from '../../services/city.services'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ModalUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            responseCities: [],
            setModal: false,
            selectroute: {},
            changePass: false
        };
    }


    handleInputChange = (event) => {
        if (this.state.selectroute && this.props.tipomodal === 'actualizar') {
            const tempValue = this.state.selectroute;
            tempValue[event.target.name] = event.target.value;
            this.setState({selectroute: tempValue});
        }

        if (this.props.tipomodal === 'insertar') {
            const {selectroute} = this.state;
            selectroute[event.target.name] = event.target.value;
            this.setState({selectroute: selectroute});
        }
    }



    componentWillReceiveProps(nextProps) {
        const {selectroute} = nextProps;
        this.setState({
            selectroute: selectroute.selectRoute
            
        })
    }

    actualizarDatos = (event) => {
            event.preventDefault();
            try {
                routeService.updateRoute(this.state.selectroute);
                  event.preventDefault();
                  this.props.onHide();
              } catch (e) {
              }
        
    }


    enviarDatos = (event) => {
        event.preventDefault();
        try {
            const {selectroute} = this.state;
            selectroute.id_ruta = "1";
            selectroute.estado = "true";
            routeService.insertRoute(selectroute)
            event.preventDefault();
            this.props.onHide();
        } catch (e) {

        }

    }

    async getCities() {
        const entity = {
            id_ciudad: null,
            ciudad: "",
            direccion: "",
            telefono: null,
            no_orden: null,
            estado: null
          }
          try {
            await cityService.getCity(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            responseCities: item.table
                          })
                  }
              });
          } catch (e) {
      
          }
      }


      componentDidMount() {
        this.getCities();
    }

    render() {
        return (
            <div>
                <Modal  backdrop="static" className="modalUpdate"centered keyboard={false} {...this.props}>
                    <Modal.Header closeButton>
                        {this.props.tipomodal === "insertar" ?
                            <Modal.Title>Nuevo Registro</Modal.Title> :
                            <Modal.Title>Actualizar Registro</Modal.Title>
                                        }
                    </Modal.Header>
                        <Modal.Body>
                            <Form>             
                                <Row className="mb-3">
                                <Form.Group className="mb-3">
                                    <Form.Label>Ruta</Form.Label>
                                    <Form.Control type="text" placeholder="1ro. Julio-zona 1..." name="ruta"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectroute ? this.state.selectroute.ruta : ""} />
                                </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                <Form.Group as={Col}>
                                        <Form.Label>Km. a recorrer</Form.Label>
                                        <Form.Control type="number" placeholder="13" name="km_tot"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectroute ? this.state.selectroute.km_tot : ""} />
                                    </Form.Group>
                                <Form.Group as={Col}>
                                        <Form.Label>Origen</Form.Label>
                                        <Form.Control type="text" placeholder="Col. 1ro de Julio" name="origen"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectroute ? this.state.selectroute.origen : ""} />
                                    </Form.Group>
                                <Form.Group as={Col}>
                                        <Form.Label>Final</Form.Label>
                                        <Form.Control type="text" placeholder="Zona 1 Guatemala" name="final"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectroute ? this.state.selectroute.final : ""} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Ciudad</Form.Label>
                                            <Form.Select  aria-label="Default select example" name="id_ciudad"
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            defaultValue={this.state.selectroute ? this.state.selectroute.id_ciudad : ""}>
                                            {
                                            this.state.responseCities.map( (item) => {
                                                return (
                                                    <option value={item.id_ciudad}>{item.ciudad}</option>
                                                    )
                                            }
                                                
                                            )
                                            }                                                   
                                            </Form.Select> 
                                        </Form.Group>
                                    <Form.Group as={Col} >
                                    <Form.Label>Estado</Form.Label>
                                    {this.props.tipomodal === "insertar" ?
                                    <Form.Select disabled aria-label="Default select example" name="estado"
                                    onChange={this.handleInputChange}
                                    className="form-control"
                                    defaultValue={this.state.selectroute ? this.state.selectroute.estado : ""}>
                                    <option value="true" selected>Activo</option>
                                    <option value="false">Inactivo</option>
                                    </Form.Select> :
                                    <Form.Select aria-label="Default select example" name="estado"
                                    onChange={this.handleInputChange}
                                    className="form-control"
                                    defaultValue={this.state.selectroute ? this.state.selectroute.estado : ""}>
                                    <option value="true" selected>Activo</option>
                                    <option value="false">Inactivo</option>
                                    </Form.Select>} 
                                    </Form.Group>
                                </Row>
                                <ModalFooter>
                                    <Button variant="danger" type="button" onClick={this.props.onHide}>
                                        Cancelar
                                    </Button>
                                    {this.props.tipomodal === "insertar" ?
                                        <Button variant="success" type="button" onClick={this.enviarDatos}>Guardar</Button> :
                                        <Button variant="success" type="button"
                                                onClick={this.actualizarDatos}>Actualizar</Button>
                                    }
                                </ModalFooter>
                            </Form>
                        </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalUpdate;

