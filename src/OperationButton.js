import { Actions } from "./App";
import { motion } from "framer-motion";
export default function OperationButton({ dispatch, operation }) {
    return (
      <motion.button
      whileTap={{scale:0.8}}
        onClick={() => dispatch({ type:Actions.CHOOSE_OPERATION, payload: { operation } })}
      >
        {operation}
      </motion.button>
    )
  }  
 