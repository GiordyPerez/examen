import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {stopService} from '../../services/stop.services'
import { Pencil } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import ModalUpdate from './modal_Update_New'
import ModalDelete from './modal_Delete'
import { Trash } from 'react-bootstrap-icons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../../assets/css/global-styles.css';

class Paradas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            setModal: false,
            modalDelete: false,
            selectStop: {
              id: "",
              parada: "",
              ruta: "",
              id_ruta: "",
              estado: ""
            },
            tipoModal: "",
            deleteStop: {
              id: "",
              parada: "",
              ruta: "",
              id_ruta: "",
              estado: ""
            }
            }
 
    }




    loadAll() {
        const entity = {
            id_parada: null,
            parada: "",
            id_ruta: null,
            estado: null
          }
          try {
            stopService.getStop(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            response: item.table.map(d => {
                                  return {
                                    id_parada:  d.id_parada,
                                    parada: d.parada,
                                    estado: d.estado,
                                    id_ruta: d.id_ruta,
                                    ruta: d.ruta
                                  }
                              })
                          })
                  }
              });
          } catch (e) {
      
          }
      }

      

    showStatusInTable = (id): string => {
        try {
            let resp = '';
            if (id === true) {
                resp = 'Activo';
                return <div class="stateuser">{resp}</div>
            }
            if (id === false) {
                resp = 'Inactivo';
                return <div class="stateuser">{resp}</div>
            }
            return resp;
        } catch (e) {

        }
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.modalUpd || prevState.modalDelete) {
            setTimeout(() => this.loadAll(), 1000)

        }
    }


    updateStops = (stop) => {
      this.setState({
          tipoModal: "actualizar",
          selectStop: {
            id_parada: stop.id_parada,
            parada: stop.parada,
            id_ruta: stop.id_ruta,
            ruta: stop.ruta,
            estado: stop.estado
          },
      })
  }

  deleteStops = (stop) => {
      this.setState({
          deleteStop: {
              id_parada: stop.id_parada,
              parada: "",
              id_ruta: null,
              estado: "false"
          },
      })
  }

  update = () => {
      this.setState({modalUpd: !this.state.modalUpd})
  }
  delete = () => {
      this.setState({modalDelete: !this.state.modalDelete})
  }

    componentDidMount() {
        this.loadAll();
    }



    render() {
        return (
            <>  
            <div className="container">
              <h2 className="vivify fadeInLeft">Paradas</h2>
              <div className="card-table">
              <Table className="vivify fadeIn" striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Parada</th>
                    <th>Ruta</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.response.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{item.id_parada}</td>
                              <td>{item.parada}</td>
                              <td>{item.ruta}</td>
                              <td><div>{this.showStatusInTable(item.estado)}</div></td>
                              <th>
                              <Button variant="primary" onClick={() => {this.updateStops(item); this.update();}} >
                                <Pencil/>
                              </Button>
                              <Button variant="danger" onClick={() => {
                                                    this.deleteStops(item);
                                                    this.delete()}}
                                                >
                              <Trash/>
                              </Button>
                              </th>
                          </tr>
                        )
                            })
                }
                </tbody>
              </Table>
              </div>
            </div>
            <ButtonToolbar>
              <Button className="vivify fadeInRight" id="btn-add" variant="success" size="lg"onClick={() => {
                        this.setState({selectStop: {}, tipoModal: "insertar"});
                        this.update()
                    }} >
                Nuevo Registro
              </Button>
                    <ModalUpdate
                        show={this.state.modalUpd}
                        onHide={this.update}
                        selectstop={this.state}
                        tipomodal={this.state.tipoModal}
                        onClick={this.props.onHide}
                    />
                    <ModalDelete
                        show={this.state.modalDelete}
                        onHide={this.delete}
                        deleteStop={this.state.deleteStop}
                        onClick={this.props.onHide}
                    />
                </ButtonToolbar>
          </>    
        )
    }
}

export default Paradas;




