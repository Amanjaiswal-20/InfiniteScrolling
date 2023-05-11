import React, { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = () => {
    // Simulate API call to fetch more contacts
    setIsLoading(true);
    setTimeout(() => {
      const newContacts = /* Fetch more contacts here */AMAN ;
      setContacts((prevContacts) => [...prevContacts, ...newContacts]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Simulate initial partial list load
    const initialContacts = /* Fetch initial contacts here */ ASDFGHJ ;
    setContacts(initialContacts);
  }, []);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      fetchContacts();
    }
  };

  return (
    <ul className="contact-list" onScroll={handleScroll}>
      {contacts.map((contact, index) => (
        <li key={index}>
          <img src={contact.photo} alt={contact.name} />
          <p>{contact.name}</p>
        </li>
      ))}
      {isLoading && <p>Loading...</p>}
    </ul>
  );
};

export default ContactList;
