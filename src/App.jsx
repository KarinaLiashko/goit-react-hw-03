import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { nanoid } from "nanoid";

function App() {
  const defaultContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];
  const loadContactsFromLocalStorage = () => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  };

  const [contacts, setContacts] = useState(() => {
    const initialContacts = loadContactsFromLocalStorage();
    if (initialContacts.length === 0) {
      localStorage.setItem("contacts", JSON.stringify(defaultContacts));
      return defaultContacts;
    }
    return initialContacts;
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  const addContact = newContact => {
    setContacts(prevContacts => [
      ...prevContacts,
      { ...newContact, id: nanoid() },
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox query={query} onSearch={setQuery} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </>
  );
}

export default App;
