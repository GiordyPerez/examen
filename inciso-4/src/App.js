import './App.css';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Decreasing() {
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

  var array=[];
  const decreasing = function(n) {
    if (!n) return array;
    array.push(n);
    decreasing(n-1);
  }

  const calculate = function(n) {
    decreasing(n);
    setResult(array.join(', '));
  }
  return (
    <div className="container">
      <div className="box-div">
        <>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ingrese el numero limite del array"
              onChange={handleInput}
                  name="num"
                  value={input.num}
                  type="number"
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={() => calculate(input.num)}>
              Mostrar
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


