import React from 'react';

import { Card } from '../../shared/components/UI';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = ({items}) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card><h2>No users found.</h2></Card>
      </div>
    );
  }

  if(true) console.log(items, items.length)

  return (
    <ul className="users-list">
      {items.length > 0 && items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
