import { useState, useRef, useEffect } from "react";
import "./App.css";


const deepClone = (object) => {
  const stringifiedObject = JSON.stringify(object);
  const parsedObject = JSON.parse(stringifiedObject)
  return parsedObject
}

const TextDisplay = (props) =>{
  const {text} = props;

  return(
    <div>
      {text}
    </div>
  )

}



const App = () => {
  const [text, setText] = useState("");

  const textHandler = (keyObject) => {
    const newTextValue = text + keyObject.letter
    setText(newTextValue)
  };
return (
<div className="App-header">
<TextDisplay text={text}/>
<KeyboardGrid textHandler={textHandler}/>

</div>
);
}

const KeyboardGrid = (props) => {
  const {textHandler} = props;

const keyBoardArr = [
[
{ letter: "`", isPressed: false },
{ letter: "1", isPressed: false },
{ letter: "2", isPressed: false },
{ letter: "3", isPressed: false },
{ letter: "4", isPressed: false },
{ letter: "5", isPressed: false },
{ letter: "6", isPressed: false },
{ letter: "7", isPressed: false },
{ letter: "8", isPressed: false },
{ letter: "9", isPressed: false },
{ letter: "0", isPressed: false },
{ letter: "-", isPressed: false },
{ letter: "=", isPressed: false },
{ letter: "Backspace", isPressed: false }
],
[
{ letter: "Tab", isPressed: false },
{ letter: "Q", isPressed: false },
{ letter: "W", isPressed: false },
{ letter: "E", isPressed: false },
{ letter: "R", isPressed: false },
{ letter: "T", isPressed: false },
{ letter: "Y", isPressed: false },
{ letter: "U", isPressed: false },
{ letter: "I", isPressed: false },
{ letter: "O", isPressed: false },
{ letter: "P", isPressed: false },
{ letter: "[", isPressed: false },
{ letter: "]", isPressed: false },
{ letter: "\\", isPressed: false },
],
[
{ letter: "CapsLock", isPressed: false },
{ letter: "A", isPressed: false },
{ letter: "S", isPressed: false },
{ letter: "D", isPressed: false },
{ letter: "F", isPressed: false },
{ letter: "G", isPressed: false },
{ letter: "H", isPressed: false },
{ letter: "J", isPressed: false },
{ letter: "K", isPressed: false },
{ letter: "L", isPressed: false },
{ letter: ";", isPressed: false },
{ letter: "'", isPressed: false },
{ letter: "Enter", isPressed: false }
],
[
{ letter: "Shift", isPressed: false },
{ letter: "Z", isPressed: false },
{ letter: "X", isPressed: false },
{ letter: "C", isPressed: false },
{ letter: "V", isPressed: false },
{ letter: "B", isPressed: false },
{ letter: "N", isPressed: false },
{ letter: "M", isPressed: false },
{ letter: ",", isPressed: false },
{ letter: ".", isPressed: false },
{ letter: "/", isPressed: false },
{ letter: "Shift", isPressed: false },
],
[
{ letter: " ", isPressed: false }
]
];

const [keyRows, setKeyRows] = useState(keyBoardArr);


const handleKeyDown = (event) => {
  console.log(event.key)
  let keyRowsClone = [...keyRows]
  keyRowsClone = keyRowsClone.map((keyRows) => {
    const updatedKeyRow = keyRows.map((keyObject) => {
    if (event.key.toLowerCase() === keyObject.letter.toLowerCase()) {
    textHandler(keyObject)
    return {
          ...keyObject,
          isPressed: true
        };
  };
  return keyObject;
  });

  return updatedKeyRow;
  });

  setKeyRows(keyRowsClone);

  };

const handleKeyUp = (event) => {
  console.log(event.key)
  let keyRowsClone = [...keyRows]
  keyRowsClone = keyRowsClone.map((keyRows) => {
    const updatedKeyRow = keyRows.map((keyObject) => {
    if (event.key.toLowerCase() === keyObject.letter.toLowerCase()) {
        return {
          ...keyObject,
          isPressed: false
        };
  };
  return keyObject;
  });

  return updatedKeyRow;
  });

  setKeyRows(keyRowsClone);

  };






const ref = useRef(null);

useEffect(() => {
ref.current.focus();
}, []);

return (
<div
className="Keyboard-grid"
ref={ref}
tabIndex={-1}
onKeyDown={handleKeyDown}
onKeyUp={handleKeyUp}
>
{keyRows.map((keyRows)=>{
return<KeyboardRow keyRows={keyRows}/>


})}
</div>
);
};

const KeyboardRow = (props) => {
  console.log(props)


  return(
    <div className="Keyboard-row">
      {props.keyRows.map((keyObject, index)=>{
        return <KeyboardKey keyObject={keyObject} key={index}/>
      })}

    </div>
  )
}

const KeyboardKey = (props) => {
  console.log(props)
  const { keyObject } = props;
  const { letter, isPressed } = keyObject;
  const keyClass = isPressed === true ? "pressed" : "released";


  return(
    <div className={`Keyboard-key ${keyClass}`}>


      {props.keyObject.letter}

    </div>
  )
}

export default App;

