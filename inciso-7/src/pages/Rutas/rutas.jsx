import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {routeService} from '../../services/routes.services'
import Button from 'react-bootstrap/Button'
import ModalUpdate from './modal_Update_New'
import ModalDelete from './modal_Delete'
import { Trash } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../../assets/css/global-styles.css';


class Rutas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            setModal: false,
            modalDelete: false,
            selectRoute: {
              id_ruta: "",
              ruta: "",
              km_tot: "",
              origen: "",
              final: "",
              id_ciudad: "",
              ciudad: "",
              estado: "",
            },
            tipoModal: "",
            deleteRoute: {
              id_ruta: "",
              ruta: "",
              km_tot: "",
              origen: "",
              final: "",
              id_ciudad: "",
              ciudad: "",
              estado: "",
            }
            }
 
    }




    loadAll() {
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
            routeService.getRoute(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            response: item.table.map(d => {
                                  return {
                                    id_ruta: d.id_ruta,
                                    ruta: d.ruta,
                                    km_tot: d.km_totales_recorridos,
                                    origen: d.origen,
                                    final: d.final,
                                    id_ciudad: d.id_ciudad,
                                    ciudad: d.ciudad,
                                    estado: d.estado
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


    updateRoutes = (route) => {
      this.setState({
          tipoModal: "actualizar",
          selectRoute: {
            id_ruta: route.id_ruta,
            ruta: route.ruta,
            km_tot: route.km_tot,
            origen: route.origen,
            final: route.final,
            id_ciudad: route.id_ciudad,
            ciudad: route.ciudad,
            estado: route.estado,
          },
      })
  }

  deleteRoutes = (route) => {
      this.setState({
          deleteRoute: {
            id_ruta: route.id_ruta,
              ruta: "",
              km_tot: null,
              origen: "",
              final: "",
              id_ciudad: null,
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
              <h2 className="vivify fadeInLeft">Rutas</h2>
              <div className="card-table">
              <Table className="vivify fadeIn" striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ruta</th>
                    <th>Km. Totales</th>
                    <th>Origen</th>
                    <th>Final</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.response.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{item.id_ruta}</td>
                              <td>{item.ruta}</td>
                              <td>{item.km_tot}</td>
                              <td>{item.origen}</td>
                              <td>{item.final}</td>
                              <td>{item.ciudad}</td>
                              <td><div>{this.showStatusInTable(item.estado)}</div></td>
                              <th>
                              <Button variant="primary" onClick={() => {this.updateRoutes(item); this.update();}} >
                                <Pencil/>
                              </Button>
                              <Button variant="danger" onClick={() => {
                                                    this.deleteRoutes(item);
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
              <Button className="vivify fadeInRight"id="btn-add" variant="success" size="lg"onClick={() => {
                        this.setState({selectRoute: {}, tipoModal: "insertar"});
                        this.update()
                    }} >
                Nuevo Registro
              </Button>
                    <ModalUpdate
                        show={this.state.modalUpd}
                        onHide={this.update}
                        selectroute={this.state}
                        tipomodal={this.state.tipoModal}
                        onClick={this.props.onHide}
                    />
                    <ModalDelete
                        show={this.state.modalDelete}
                        onHide={this.delete}
                        deleteRoute={this.state.deleteRoute}
                        onClick={this.props.onHide}
                    />
                </ButtonToolbar>
          </>    
        )
    }
}

export default Rutas;




