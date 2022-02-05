import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { motion } from "framer-motion";

export const Actions={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE: 'evaluate'
}
function reducer(state ,{type, payload}){
  switch(type){
    case Actions.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === '0' && state.currentOperand=== '0'){ return state}
      if(payload.digit === '.' && state.currentOperand.includes('.')){ return state}
      return{
        ...state ,
        currentOperand: `${state.currentOperand ||''}${payload.digit}`,
      }
      case Actions.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state}
      if(state.currentOperand=== null){
        return{
          ...state,
          operation: payload.operation,
        }
      }
      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand : null
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
     case Actions.CLEAR :
        return {}
      case Actions.DELETE_DIGIT:
      if(state.overwrite)  {
          return{
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if(state.currentOperand=== null || state.previousOperand===null){
          return state
        }
        if(state.currentOperand.length === 1){
          return {
            ...state,
            currentOperand : null
          }
        }
        return{
          ...state,
          currentOperand: state.currentOperand.slice(0,-1)
        }
     case Actions.EVALUATE:
        if(state.operation=== null || state.currentOperand === null || state.previousOperand===null){
          return state
        }
        return{
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand : evaluate(state),
        }

  }
}
function evaluate({currentOperand,previousOperand,operation}){
  const prev= parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(prev)|| isNaN(curr)) return ''
  let computation=''
  switch(operation){
    case '+':
      computation = prev + curr
      break
    case '-':
      computation = prev - curr
      break
      case '%':
        computation = prev / curr
        break
      case '*':
        computation = prev * curr
        break
    
  }
  return computation.toString()
}

export default function App() {
const[{currentOperand , previousOperand , operation}, dispatch] = useReducer(reducer,{})


  return (
    <div className="calculator-grid"> {/* contenedor */}
    <motion.div className="output" whileHover={{scale:3}} transition={{delay:0.4}}>
    <div className="previous-operand">{previousOperand} {operation}</div> {/* valor previo cargado */}
    <div className="current-operand">{currentOperand}</div>   {/*valor a concatenar */} 
    </motion.div>
    <motion.button  whileTap={{scale:0.8}} className="span-two" onClick={()=> dispatch({type:Actions.CLEAR})}>AC</motion.button> {/* all clear */}
    <motion.button  whileTap={{scale:0.8}} onClick={()=> dispatch({type:Actions.DELETE_DIGIT})} >DEL</motion.button> 
    <OperationButton operation="%" dispatch={dispatch} /> 
    <DigitButton digit="1" dispatch={dispatch} /> 
    <DigitButton digit="2" dispatch={dispatch} />
    <DigitButton digit="3" dispatch={dispatch} />   
    <OperationButton operation="*" dispatch={dispatch} />
    <DigitButton digit="4" dispatch={dispatch} />
    <DigitButton digit="5" dispatch={dispatch} />
    <DigitButton digit="6" dispatch={dispatch} />
    <OperationButton operation="+" dispatch={dispatch} />
    <DigitButton digit="7" dispatch={dispatch} />
    <DigitButton digit="8" dispatch={dispatch} />
    <DigitButton digit="9" dispatch={dispatch} />
    <OperationButton operation="-" dispatch={dispatch} />
    <DigitButton digit='.' dispatch={dispatch} /> 
    <DigitButton digit="0" dispatch={dispatch} />
    <motion.button className="span-two" onClick={()=> dispatch({type:Actions.EVALUATE})}
    whileTap={{scale:0.8}}
  >=</motion.button> 

    
    </div>
  );
}


