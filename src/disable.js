import {useState} from 'react';

export default function App() {
  const [message, setMessage] = useState('');
  const isAnonymous = true;

  const handleClick = event => {
    event.currentTarget.disabled = true;
    console.log('button clicked');
  };

  return (
    <div>
      {/* ✅ disable button when input is empty */}
      <div>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button disabled={!message}>Click</button>
      </div>

      <hr />

      {/* ✅ disable button */}
      <button disabled={true}>Click</button>

      <hr />

      {/* ✅ disable button conditionally */}
      <button disabled={isAnonymous ? true : false}>Click</button>

      <hr />

      {/* ✅ disable a button after it has been clicked once */}
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
