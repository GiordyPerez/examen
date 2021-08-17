import Carousel from 'react-bootstrap/Carousel';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Carrousel() {
  return (

      <div>
        <Carousel className="vivify fadeIn">
        <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://assets.fontsinuse.com/static/use-media-items/97/96930/full-1600x927/5d9b92f0/maam7.jpeg"
              alt="Third slide"
              width="1200" height="540"
            />
            <Carousel.Caption>
              <h3>Seguridad para todos</h3>
              <p>Sabemos que lo más valioso son los tuyos.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.elregionalpiura.com.pe/images/Fotografias/2020/Setiembre_2020/civa.jpg"
              alt="First slide"
              width="1200" height="540"
            />
            <Carousel.Caption>
              <h3>Viajando contigo siempre</h3>
              <p>Rodeandote de comodidad y tranquilidad.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://3.bp.blogspot.com/-eNoi-SQ6FvE/WcfdB3vY-UI/AAAAAAAABlQ/zEX1q0bVJFU6FDv2sitAWHkaNrV59cPpgCLcBGAs/s1600/2753_1317905621_PG7_1800_DD__024_.jpg"
              alt="Second slide"
              width="1200" height="540"
            />

            <Carousel.Caption>
              <h3>Calidad de Primera</h3>
              <p>Te mereces lo mejor, y nosotros te lo damos.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </div>
  );
}
