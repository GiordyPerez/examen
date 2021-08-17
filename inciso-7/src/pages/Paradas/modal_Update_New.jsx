import React, {Component} from 'react';
import {Button, Form, ModalFooter} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import {stopService} from '../../services/stop.services';
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
            selectstop: {},
            changePass: false
        };
    }

    handleInputChange = (event) => {
        if (this.state.selectstop && this.props.tipomodal === 'actualizar') {
            const tempValue = this.state.selectstop;
            tempValue[event.target.name] = event.target.value;
            this.setState({selectstop: tempValue});
        }

        if (this.props.tipomodal === 'insertar') {
            const {selectstop} = this.state;
            selectstop[event.target.name] = event.target.value;
            this.setState({selectstop: selectstop});
        }
    }



    componentWillReceiveProps(nextProps) {
        const {selectstop} = nextProps;
        this.setState({
            selectstop: selectstop.selectStop
        })
    }


    actualizarDatos = (event) => {
            event.preventDefault();
            try {
                stopService.updateStop(this.state.selectstop);
                  event.preventDefault();
                  this.props.onHide();
              } catch (e) {
              }
        
    }


    enviarDatos = (event) => {
        event.preventDefault();
        try {
            const {selectstop} = this.state;
            selectstop.id_parada = "1";
            selectstop.estado = "true";
            stopService.insertStop(selectstop)
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
                                    
                                <Form.Group className="mb-3">
                                    <Form.Label>Parada</Form.Label>
                                    <Form.Control type="text" placeholder="40 Elim" name="parada"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectstop ? this.state.selectstop.parada : ""} />
                                </Form.Group>
                                <Row className="mb-3">
                                <Form.Group as={Col} >
                                <Form.Label>Ruta</Form.Label>
                                <Form.Select  aria-label="Default select example" name="id_ruta"
                                    onChange={this.handleInputChange}
                                    className="form-control"
                                    defaultValue={this.state.selectstop ? this.state.selectstop.id_ruta : ""}>
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
                            <Form.Select disabled aria-label="Default select example" name="estado"
                            onChange={this.handleInputChange}
                            className="form-control"
                            defaultValue={this.state.selectstop ? this.state.selectstop.estado : ""}>
                            <option value="true" selected>Activo</option>
                            <option value="false">Inactivo</option>
                            </Form.Select> :
                                                <Form.Select aria-label="Default select example" name="estado"
                                                onChange={this.handleInputChange}
                                                className="form-control"
                                                defaultValue={this.state.selectstop ? this.state.selectstop.estado : ""}>
                            <option value="true" selected>Activo</option>
                            <option value="false">Inactivo</option>
                            </Form.Select>
                                        }
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

