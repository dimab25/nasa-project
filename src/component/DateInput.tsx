import { ChangeEvent } from "react";

type SearchProps = {
  handleInputDate: (e: ChangeEvent<HTMLInputElement>) => void;
};
const today = new Date ()
const month = today.getMonth()+1;
const year = today.getFullYear();
const date = today. getDate();
const currentDate = year + "-" + month + "-" + date;

function DateInput({ handleInputDate }: SearchProps) {

  return (
    <>
      <input type="text" onChange={handleInputDate} placeholder={`${currentDate}`} />
    </>
  );
}

export default DateInput;
