import './App.css';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'

export default function Sum() {
  const [input, setInput] = React.useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: ""
  });
  
  const [result, setResult] = React.useState();
  const [result2, setResult2] = React.useState();
  const [result3, setResult3] = React.useState();
  const [result4, setResult4] = React.useState();
  const [result5, setResult5] = React.useState();

  const handleInput = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

   function age(index, n) {
    let temp = '';

    const findAge = (value) => {
      if(value >= 0 && value <= 1) {
        temp = "Bebe";
      } else if(value > 1 && value <= 3) {
        temp = "Niño pequeño";
      } else if(value > 3 && value <= 4) {
        temp = "Preescolar";
      } else if(value >= 5 && value <= 13) {
        temp = "Niñez";
      } else if(value >= 14 && value <= 17) {
        temp = "Adolescencia";
      } else if(value >= 18 && value <= 35) {
        temp = "Adultos jóvenes";
      } else if(value >= 36 && value <= 64) {
        temp = "Adultos";
      } else {
        temp = "Tercera edad";
      }
    }
    // eslint-disable-next-line default-case
    switch (index){
      case 1:
        findAge(n);
        setResult(temp);
        break;
      case 2:
        findAge(n);
        setResult2(temp);
        break;
        case 3:
          findAge(n);
          setResult3(temp);
          break;
        case 4:
          findAge(n);
          setResult4(temp);
          break;
        case 5:
          findAge(n);
          setResult5(temp);
          break;
    }

    
  }
  
  return (
    <div className="container">
      <div className="box-age">
        <>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Edad</th>
                <th>Etapa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td><InputGroup >
                <FormControl
                  placeholder="Ingrese su edad"
                  onChange={handleInput}
                      name="num1"
                      value={input.num1}
                      type="number"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => age(1, input.num1)} >
                  Calcular
                </Button>
                <div className="result">
                </div>
              </InputGroup></td>
                <td><span>{result}</span></td>
              </tr>
              <tr>
              <td><InputGroup>
                <FormControl
                  placeholder="Ingrese su edad"
                  onChange={handleInput}
                      name="num2"
                      value={input.num2}
                      type="number"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => age(2, input.num2)} >
                  Calcular
                </Button>
              </InputGroup></td>
                <td><span>{result2}</span></td>
              </tr>
              <tr>
              <td><InputGroup>
                <FormControl
                  placeholder="Ingrese su edad"
                  onChange={handleInput}
                      name="num3"
                      value={input.num3}
                      type="number"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => age(3, input.num3)} >
                  Calcular
                </Button>
              </InputGroup></td>                
                <td><span>{result3}</span></td>
              </tr>
              <tr>
              <td><InputGroup>
                <FormControl
                  placeholder="Ingrese su edad"
                  onChange={handleInput}
                      name="num4"
                      value={input.num4}
                      type="number"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => age(4, input.num4)} >
                  Calcular
                </Button>
              </InputGroup></td>                
                <td><span>{result4}</span></td>
              </tr>
              <tr>
              <td><InputGroup>
                <FormControl
                  placeholder="Ingrese su edad"
                  onChange={handleInput}
                      name="num5"
                      value={input.num5}
                      type="number"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => age(5, input.num5)} >
                  Calcular
                </Button>
              </InputGroup></td>  
                <td><span>{result5}</span></td>
              </tr>
            </tbody>
          </Table>

        </>
      </div>
    </div>
  );
}
