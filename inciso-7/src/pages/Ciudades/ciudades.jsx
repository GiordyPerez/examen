import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import {cityService} from '../../services/city.services'
import { Pencil } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import ModalUpdate from './modal_Update_New'
import ModalDelete from './modal_Delete'
import { Trash } from 'react-bootstrap-icons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../../assets/css/global-styles.css';

class Ciudades extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            setModal: false,
            modalDelete: false,
            selectCity: {
              id: "",
              ciudad: "",
              direccion: "",
              telefono: "",
              no_orden: "",
              estado: ""
            },
            tipoModal: "",
            deleteCity: {
                id: "",
                ciudad: "",
                direccion: "",
                telefono: "",
                no_orden: "",
                estado: ""
            }
            }
 
    }



    loadAll() {
        const entity = {
            id_ciudad: null,
            ciudad: "",
            direccion: "",
            telefono: null,
            no_orden: null,
            estado: null
          }
          try {
            cityService.getCity(entity).then(item => {
                  if (item) {
                    this.setState(
                          {
                            response: item.table.map(d => {
                                  return {
                                    id_ciudad:  d.id_ciudad,
                                    ciudad: d.ciudad,
                                    direccion: d.direccion,
                                    telefono: d.telefono,
                                    no_orden: d.no_orden,
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



    updateCitys = (city) => {
      this.setState({
          tipoModal: "actualizar",
          selectCity: {
            id_ciudad: city.id_ciudad,
            ciudad: city.ciudad,
            direccion: city.direccion,
            telefono: city.telefono,
            no_orden: city.no_orden,
            estado: city.estado
          },
      })
  }

  deleteCitys = (city) => {
      this.setState({
          deleteCity: {
              id_ciudad: city.id_ciudad,
              ciudad: "",
              direccion: "",
              telefono: null,
              no_orden: null,
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
              <h2 className="vivify fadeInLeft">Ciudades</h2>
                            <div className="card-table">
              <Table className="vivify fadeIn" striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ciudad</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>No. Orden</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.response.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{item.id_ciudad}</td>
                              <td>{item.ciudad}</td>
                              <td>{item.direccion}</td>
                              <td>{item.telefono}</td>
                              <td>{item.no_orden}</td>
                              <td><div>{this.showStatusInTable(item.estado)}</div></td>
                              <th>
                              <Button variant="primary" onClick={() => {this.updateCitys(item); this.update();}} >
                                <Pencil/>
                              </Button>
                              <Button variant="danger" onClick={() => {this.deleteCitys(item);this.delete()}}>
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
                        this.setState({selectCity: {}, tipoModal: "insertar"});
                        this.update()
                    }} >
                Nuevo Registro
              </Button>
                    <ModalUpdate
                        show={this.state.modalUpd}
                        onHide={this.update}
                        selectcity={this.state}
                        tipomodal={this.state.tipoModal}
                        onClick={this.props.onHide}
                    />
                    <ModalDelete
                        show={this.state.modalDelete}
                        onHide={this.delete}
                        deleteCity={this.state.deleteCity}
                        onClick={this.props.onHide}
                    />
                </ButtonToolbar>
          </>    
        )
    }
}

export default Ciudades;




