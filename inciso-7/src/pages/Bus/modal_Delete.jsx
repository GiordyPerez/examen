import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ModalBody, Modal, ModalFooter, Form} from 'react-bootstrap';
import {busService} from '../../services/bus.services';


class modalDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillReceiveProps(nextProps) {
        const {deleteBus} = nextProps;
        this.setState({
            deleteBus: deleteBus
        })
    }
    delete = (event) => {
        event.preventDefault();

        try {
            busService.updateBusState(this.state.deleteBus);
            event.preventDefault();
            this.props.onHide();
        } catch (e) {
        }
  
    }

    render() {
        return (
            <div>
                <Modal backdrop="static" className="modalDelete"centered keyboard={false} {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Registro</Modal.Title>
                    </Modal.Header>
                      <Form>
                        <ModalBody>
                            <div>
                                <p className="text-muted font-weight-bold">¿Realmente desea eliminar el registro seleccionado?</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="danger" type="button" onClick={this.props.onHide}>
                                Cerrar
                            </Button>
                            <Button variant="success" type="button" onClick={this.delete}>Eliminar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                </div>
        );
    }
}

export default modalDelete;
