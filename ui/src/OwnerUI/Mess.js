import React from 'react';

const DisplayMessage = ({ message }) => {
  return (
    <div className="whitespace-pre-wrap p-4 border rounded shadow">
      {message}
    </div>
  );
};

const App = () => {
  const message = `This is a message with newlines and spaces.

  This line is indented.

New line here.`;

  return (
    <div className="max-w-md mx-auto mt-10">
      <DisplayMessage message={message} />
    </div>
  );
};

export default App;
