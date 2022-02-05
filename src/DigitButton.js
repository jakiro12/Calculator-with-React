import { Actions } from "./App"
import {motion} from 'framer-motion';
function DigitButton({ dispatch, digit }) {
    return (
      <motion.button
      whileTap={{scale:0.8}}
        onClick={() => dispatch({ type:Actions.ADD_DIGIT, payload: { digit } })}
      >
        {digit}
      </motion.button>
    )
  }  
  export default DigitButton;