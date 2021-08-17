import React, {Component} from 'react';
import {Button, Form, ModalFooter} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import {cityService} from '../../services/city.services';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class ModalUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            setModal: false,
            selectcity: {},
            changePass: false
        };
    }


    handleInputChange = (event) => {
        if (this.state.selectcity && this.props.tipomodal === 'actualizar') {
            const tempValue = this.state.selectcity;
            tempValue[event.target.name] = event.target.value;
            this.setState({selectcity: tempValue});
        }

        if (this.props.tipomodal === 'insertar') {
            const {selectcity} = this.state;
            selectcity[event.target.name] = event.target.value;
            this.setState({selectcity: selectcity});
        }
    }



    componentWillReceiveProps(nextProps) {
        const {selectcity} = nextProps;
        this.setState({
            selectcity: selectcity.selectCity
        })
    }


    actualizarDatos = (event) => {
            event.preventDefault();
            try {
                cityService.updateCity(this.state.selectcity);
                  event.preventDefault();
                  this.props.onHide();
              } catch (e) {
              }
        
    }


    enviarDatos = (event) => {
        event.preventDefault();
        try {
            const {selectcity} = this.state;
            selectcity.id_ciudad = "1";
            selectcity.estado = "true";
            cityService.insertCity(selectcity)
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
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control type="text" placeholder="Guatemala"  name="ciudad"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectcity ? this.state.selectcity.ciudad : ""}/>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="number" placeholder="00000000" name="telefono"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectcity ? this.state.selectcity.telefono : ""} />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control type="text" placeholder="6ta Av..." name="direccion"
                                                            onChange={this.handleInputChange}
                                                            className="form-control"
                                                            defaultValue={this.state.selectcity ? this.state.selectcity.direccion : ""} />
                                </Form.Group>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>No. Orden</Form.Label>
                                            <Form.Control type="number" placeholder="1001" name="no_orden"
                                                                onChange={this.handleInputChange}
                                                                className="form-control"
                                                                defaultValue={this.state.selectcity ? this.state.selectcity.no_orden : ""} />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                    <Form.Label>Estado</Form.Label>
                                    {this.props.tipomodal === "insertar" ?
                            <Form.Select disabled aria-label="Default select example" name="estado"
                            onChange={this.handleInputChange}
                            className="form-control"
                            defaultValue={this.state.selectcity ? this.state.selectcity.estado : ""}>
        <option value="true" selected>Activo</option>
        <option value="false">Inactivo</option>
        </Form.Select> :
                            <Form.Select aria-label="Default select example" name="estado"
                            onChange={this.handleInputChange}
                            className="form-control"
                            defaultValue={this.state.selectcity ? this.state.selectcity.estado : ""}>
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

