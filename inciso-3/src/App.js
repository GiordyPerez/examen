import './App.css';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Divisible() {
  const [input, setInput] = React.useState({
    num: ""
  });
  
  const [result, setResult] = React.useState();

  const handleInput = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const divisible = function () {
    if(input.num % 2 === 0) {
      // ...   
      setResult(" Si es divisible por dos y su resultado es: "+ (+input.num) / 2);
    } else {
      setResult("No es divisible por dos :(");
    }
  };
  return (
    <div className="container">
      <div className="box-div">
        <>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ingrese el numero que desea analizar"
              onChange={handleInput}
                  name="num"
                  value={input.num}
                  type="number"
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={divisible}>
              Analizar
            </Button>
          </InputGroup>
          <div className="result">
            <span>{result}</span>
          </div>
        </>
      </div>
    </div>
  );
}


