import { ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

type SearchProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleInputChange }: SearchProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="searchBar">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          onChange={handleInputChange}
          placeholder="Type search..."
        />
       
      </Form>
    </div>
  );
}

export default Search;
