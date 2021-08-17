
import React, {Component} from 'react';
import {Button, Form, ModalFooter} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import {busService} from '../../services/bus.services';
import {routeService} from '../../services/routes.services';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class ModalUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            responseRoutes: [],
            setModal: false,
            selectbus: {},
            changePass: false
        };
    }


    handleInputChange = (event) => {
        if (this.state.selectbus && this.props.tipomodal === 'actualizar') {
            const tempValue = this.state.selectbus;
            tempValue[event.target.name] = event.target.value;
            this.setState({selectbus: tempValue});
        }

        if (this.props.tipomodal === 'insertar') {
            const {selectbus} = this.state;
            selectbus[event.target.name] = event.target.value;
            this.setState({selectbus: selectbus});
        }
    }



    componentWillReceiveProps(nextProps) {
        const {selectbus} = nextProps;
        this.setState({
            selectbus: selectbus.selectBus
        })
    }


    actualizarDatos = (event) => {
            event.preventDefault();
            try {
                busService.updateBus(this.state.selectbus);
                  event.preventDefault();
                  this.props.onHide();
              } catch (e) {
              }
        
    }

    async getRoutes() {
        const entity = {
          id_ruta: null,
          ruta: "",
          km_tot: null,
          origen: "",
          final: "",
          id_ciudad: "",
          estado: null
          }
          try {
            await routeService.getRoute(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            responseRoutes: item.table
                          })
                  }
              });
              
          } catch (e) {
      
          }
      }

    componentDidMount() {
        this.getRoutes();
    }

    enviarDatos = (event) => {
        event.preventDefault();
        try {
            const {selectbus} = this.state;
            selectbus.id_bus = "1";
            selectbus.estado_bus = "true";
            selectbus.id_ruta = selectbus.ruta;
            busService.insertBus(selectbus)
            event.preventDefault();
            this.props.onHide();
        } catch (e) {

        }

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
                                    <Form.Group as={Col}>
                                        <Form.Label>Bus</Form.Label>
                                        <Form.Control type="text" placeholder="B-0..."  name="bus"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectbus ? this.state.selectbus.bus : ""}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Matricula</Form.Label>
                                        <Form.Control type="text" placeholder="U000AAA" name="matricula"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectbus ? this.state.selectbus.matricula : ""} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Modelo</Form.Label>
                                        <Form.Control type="text" placeholder="2021"  name="modelo"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectbus ? this.state.selectbus.modelo : ""}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Asientos</Form.Label>
                                        <Form.Control type="number" placeholder="18..." name="capacidad_asientos"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectbus ? this.state.selectbus.capacidad_asientos : ""} />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Piloto</Form.Label>
                                    <Form.Control type="text" placeholder="Juan Pueblo..." name="nombre_piloto"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectbus ? this.state.selectbus.nombre_piloto : ""} />
                                </Form.Group>
                                <Row className="mb-3">
                                <Form.Group as={Col} >
                                <Form.Label>Ruta</Form.Label>
                                <Form.Select  aria-label="Default select example" name="ruta"
                                    onChange={this.handleInputChange}
                                    className="form-control"
                                    defaultValue={this.state.selectbus ? this.state.selectbus.id_ruta : ""}>
                                    {
                                    this.state.responseRoutes.map( (item) => {
                                        return (
                                            <option value={item.id_ruta}>{item.ruta}</option>
                                            )
                                    }
                                        
                                    )
                                    }
                                </Form.Select>
                                </Form.Group>
                                    <Form.Group as={Col} >
                                    <Form.Label>Estado</Form.Label>
                                        {this.props.tipomodal === "insertar" ?
                                        <Form.Select disabled aria-label="Default select example" name="estado_bus"
                                        onChange={this.handleInputChange}
                                        className="form-control"
                                        defaultValue={this.state.selectbus ? this.state.selectbus.estado_bus : ""}>
                                            <option value="true" selected>Activo</option>
                                            <option value="false">Inactivo</option>
                                        </Form.Select> :
                                        <Form.Select aria-label="Default select example" name="estado_bus"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectbus ? this.state.selectbus.estado_bus : ""}>
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
                                        <Button variant="success" type="button"onClick={this.actualizarDatos}>Actualizar</Button>}
                                </ModalFooter>
                            </Form>
                        </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalUpdate;

