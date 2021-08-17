import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {busService} from '../../services/bus.services'
import Button from 'react-bootstrap/Button'
import '../../assets/css/global-styles.css';

class Reportes extends React.Component {

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
              <h2 className="vivify fadeInLeft">Reportes</h2>
              <div className="card-table">
              <Table className="vivify fadeIn"striped bordered hover>
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
                              <Button variant="outline-danger" onClick={() => {this.updateBuses(item); this.update();}} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                                <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                              </svg>
                              </Button>
                              <Button variant="outline-success" onClick={() => {
                                                    this.deleteBuses(item);
                                                    this.delete()}}
                                                >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"/>
                              </svg>
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
          </>    
        )
    }
}

export default Reportes;




