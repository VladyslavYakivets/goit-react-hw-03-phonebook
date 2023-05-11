import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = data =>
    this.setState(prevState => {
      const contacts = prevState.contacts;
      if (contacts.find(({ name }) => name === data.name)) {
        return alert(`${data.name} is already in contacts`);
      }
      return { contacts: [data, ...contacts] };
    });

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  componentDidUpdate(prevPrors, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      return contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  removeContact = id => {
    const { contacts } = this.state;
    const contactsWithoutRemovedContact = contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: contactsWithoutRemovedContact });
  };
  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />

        <h1>Contacts</h1>
        <Filter filter={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          onRemove={this.removeContact}
        />
      </Container>
    );
  }
}
