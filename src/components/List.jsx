import React from 'react';

const list = props => {
  console.log('Rendering the list...');
  return (
    <ul>
      {props.items.map(element => (
        <li key={element.id} onClick={() => props.onClickHandler(element.id)}>
          {element.description}
        </li>
      ))}
    </ul>
  );
};

export default list;
