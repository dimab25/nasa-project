import { ChangeEvent } from "react";
import { Form, InputGroup, Placeholder } from "react-bootstrap";

type SearchProps = {
  handleInputDate: (e: ChangeEvent<HTMLInputElement>) => void;
};
const today = new Date ()
const month = today.getMonth()+1;
const year = today.getFullYear();
const date = today. getDate();
const currentDate = year + "-" + month + "-" + date;
// console.log(currentDate);

function DateInput({ handleInputDate }: SearchProps) {

  return (
    <>
    <InputGroup size="sm" className="mb-3" style={{width: "700px"}}>
      <InputGroup.Text  id="inputGroup-sizing-sm" >Date</InputGroup.Text>
      <Form.Control 
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={handleInputDate}
          type="date"
          placeholder={currentDate}
        />
        {/* <input type="text" placeholder= /> */}

      </InputGroup>
    </>
  );
}

export default DateInput;
