import React, { useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Person } from './types/Person';

type Props = {
  people: Person[];
};
export const App: React.FC<Props> = () => {
  const [people, setPeople] = useState<Person[]>(peopleFromServer);
  const [query, setQuery] = useState('');
  const [isMenu, setIsMenu] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(peopleFromServer[0]);

  const filterMenu = (input: string) => {
    if (input.trim() !== '') {
      setQuery(input);
      const sortedPeople = peopleFromServer.filter(ind =>
        ind.name.toLocaleLowerCase().includes(input.toLowerCase()),
      );

      setPeople(sortedPeople);
    }
  };

  const getThePerson = person => {
    const thePerson = peopleFromServer.find(el => el.name === String(person));

    setCurrentPerson(thePerson);
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        {query.length === 0 ? (
          <h1 className="title" data-cy="title">
            No selected person
          </h1>
        ) : (
          <h1 className="title" data-cy="suggestion-item">
            `${currentPerson.name} (${currentPerson.born} - $
            {currentPerson.died}`
          </h1>
        )}

        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <input
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={query}
              onChange={event => filterMenu(String(event.target.value))}
              onFocus={() => setIsMenu(true)}
            />
          </div>

          {isMenu && (
            <div
              className="dropdown-menu"
              role="menu"
              data-cy="suggestions-list"
            >
              <div className="dropdown-content">
                {people.map((item: Person) => {
                  return (
                    <div
                      className="dropdown-item"
                      data-cy="suggestion-item"
                      key={item.name}
                      onClick={event => {
                        // console.log(event.target.textContent);
                        getThePerson(event.target.textContent);
                      }}
                    >
                      <p className="has-text-link">{item.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {[...people].length === 0 && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
