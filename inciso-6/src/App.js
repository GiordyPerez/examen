import './App.css';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Factorial() {
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


  const factorial = function(n) {
    if (n <= 1){
        return 1;
    } else {
        return n*factorial(n-1);
    }
}


const calculate = function(n) {
  factorial(n);
  setResult("El factorial de "+n+"! es: "+factorial(n));
}
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
            <Button variant="outline-secondary" id="button-addon2" onClick={() => calculate(input.num)}>
              Calcular
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


