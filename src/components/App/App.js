import { useState } from 'react';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import useLocalStorage from '../../hooks/useLocalStorage';

import { Container, MainTitle, ContactTitle } from './AppStyle';

function App() {
  const [contacts, setContacts] = useLocalStorage('userContacts', []);
  const [filter, setFilter] = useState('');

  const checkingForExistenceOfSuchName = verifiableName => {
    const handleName = verifiableName.toLowerCase();
    return contacts.find(({ name }) => name.toLowerCase() === handleName);
  };

  const handleSubmitContactForm = data => {
    setContacts(prevContacts => [...prevContacts, data]);
  };

  const changeFilterName = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => [
      ...prevContacts.filter(({ id }) => id !== contactId),
    ]);
  };

  const filterByName = () => {
    const searchName = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(searchName),
    );
  };

  const filterContacts = filterByName();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm
        handleSubmitContactForm={handleSubmitContactForm}
        checkingForExistenceOfSuchName={checkingForExistenceOfSuchName}
      />
      <ContactTitle>Contacts</ContactTitle>
      <Filter value={filter} changeFilterName={changeFilterName} />
      <ContactList
        filterContacts={filterContacts}
        deleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
