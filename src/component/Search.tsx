import { ChangeEvent, FormEvent } from "react";
import { Button } from "react-bootstrap";

type SearchProps = {handleInputChange: (e: ChangeEvent<HTMLInputElement>)=>void;
};



function Search({handleInputChange}: SearchProps) {
  
   const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

    }
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
<input type="text" onChange={handleInputChange} placeholder="Type search..." />
<Button type="submit">Search</Button>
</form>
    </div>
  )
}

export default Search