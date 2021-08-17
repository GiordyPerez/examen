import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {busService} from '../../services/bus.services'
import { Pencil } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import ModalUpdate from './modal_Update_New'
import ModalDelete from './modal_Delete'
import '../../assets/css/global-styles.css';

import { Trash } from 'react-bootstrap-icons';



import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class Bus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            setModal: false,
            modalDelete: false,
            selectBus: {
              id: "",
              bus: "",
              matricula: "",
              modelo: "",
              capacidad_asientos: "",
              nombre_piloto: "",
              estado_bus: "",
              ruta: "",
              id_ruta: ""
            },
            tipoModal: "",
            deleteBus: {
              id: "",
              bus: "",
              matricula: "",
              modelo: "",
              capacidad_asientos: "",
              nombre_piloto: "",
              estado_bus: "",
              ruta: "",
              id_ruta: ""
            }
            }
 
    }




    loadAll() {
        const entity = {
            id_bus: null,
            bus: "",
            matricula: "",
            modelo: "",
            capacidad_asientos: null,
            nombre_piloto: "",
            estado_bus: "",
            id_ruta: null
          }
          try {
            busService.getBus(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            response: item.table.map(d => {
                                  return {
                                    id_bus: d.id_bus,
                                    bus: d.bus,
                                    matricula: d.matricula,
                                    modelo: d.modelo,
                                    capacidad_asientos: d.capacidad_asientos,
                                    nombre_piloto: d.nombre_piloto,
                                    estado_bus: d.estado_bus,
                                    ruta: d.ruta,
                                    id_ruta: d.id_ruta
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



    updateBuses = (bus) => {
      this.setState({
          tipoModal: "actualizar",
          selectBus: {
            id_bus: bus.id_bus,
            bus: bus.bus,
            matricula: bus.matricula,
            modelo: bus.modelo,
            capacidad_asientos: bus.capacidad_asientos,
            nombre_piloto: bus.nombre_piloto,
            estado_bus: bus.estado_bus,
            ruta: bus.ruta,
            id_ruta: bus.id_ruta
          },
      })
  }

  deleteBuses = (bus) => {
      this.setState({
          deleteBus: {
            id_bus: bus.id_bus,
            bus: "",
            matricula: "",
            modelo: "",
            capacidad_asientos: null,
            nombre_piloto: "",
            estado_bus: "false",
            id_ruta: null
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
              <h2 className="vivify fadeInLeft">Buses</h2>
              <Button className="vivify fadeInRight"id="btn-add" variant="success" size="lg" onClick={() => {
                        this.setState({selectBus: {}, tipoModal: "insertar"});
                        this.update()
                    }} >
                Nuevo Registro
              </Button>
              <div className="card-table">
              <Table className="vivify fadeIn" striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bus</th>
                    <th>Matricula</th>
                    <th>Modelo</th>
                    <th>Asientos</th>
                    <th>Piloto</th>
                    <th>Ruta</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.response.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{item.id_bus}</td>
                              <td>{item.bus}</td>
                              <td>{item.matricula}</td>
                              <td>{item.modelo}</td>
                              <td>{item.capacidad_asientos}</td>
                              <td>{item.nombre_piloto}</td>
                              <td>{item.ruta}</td>
                              <td><div>{this.showStatusInTable(item.estado_bus)}</div></td>
                              <th>
                              <Button variant="primary" onClick={() => {this.updateBuses(item); this.update();}} >
                                <Pencil/>
                              </Button>
                              <Button variant="danger" onClick={() => {
                                                    this.deleteBuses(item);
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
                    <ModalUpdate
                        show={this.state.modalUpd}
                        onHide={this.update}
                        selectbus={this.state}
                        tipomodal={this.state.tipoModal}
                        onClick={this.props.onHide}
                    />
                    <ModalDelete
                        show={this.state.modalDelete}
                        onHide={this.delete}
                        deleteBus={this.state.deleteBus}
                        onClick={this.props.onHide}
                    />
                </ButtonToolbar>
          </>    
        )
    }
}

export default Bus;




