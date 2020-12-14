import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Form, LabelForm, InputForm, Button } from './ContactFormStyle';

function ContactForm({
  handleSubmitContactForm,
  checkingForExistenceOfSuchName,
}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const repeatName = checkingForExistenceOfSuchName(name);

    if (repeatName) {
      alert(`${name} is already in contact`);
    } else {
      const newContact = { id: uuidv4(), name, number };
      handleSubmitContactForm(newContact);
    }

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LabelForm>
        Name
        <InputForm
          onChange={handleChange}
          type="text"
          name={'name'}
          placeholder="Enter name"
          value={name}
          required
        />
      </LabelForm>
      <LabelForm>
        Number
        <InputForm
          onChange={handleChange}
          type="tel"
          name={'number'}
          placeholder="Enter number"
          value={number}
          required
        />
      </LabelForm>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  handleSubmitContactForm: PropTypes.func.isRequired,
};

export default ContactForm;
