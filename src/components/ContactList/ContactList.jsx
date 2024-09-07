import Contact from "../Contact/Contact";

export default function ContactList({ contacts, onDelete }) {
  if (!Array.isArray(contacts)) {
    console.error("Expected 'contacts' to be an array.");
    return <div>Error: Contacts should be an array.</div>;
  }

  return (
    <ul>
      {contacts.map(contact => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}
