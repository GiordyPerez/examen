import './App.css';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Multiply() {
  const [input, setInput] = React.useState({
    num1: "",
    num2: ""
  });
  
  const [result, setResult] = React.useState();

  const handleInput = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const multiply = function () {
    setResult((+input.num1) * (+input.num2));
  };

  return (
    <div className="container">
      <div className="box-multiply">
        <>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ingrese el primer numero que desea multiplicar"
              onChange={handleInput}
                  name="num1"
                  value={input.num1}
                  type="number"
            />
            <FormControl
              placeholder="Ingrese el segundo numero que desea multiplicar"
              onChange={handleInput}
                  name="num2"
                  value={input.num2}
                  type="number"
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={multiply}>
              Multiplicar
            </Button>
          </InputGroup>
          <div className="result">
            <span>Total =  {result}</span>
          </div>
        </>
      </div>
    </div>
  );
}


