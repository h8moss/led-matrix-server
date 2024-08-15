import './App.css';

const App = () => {
  return (
    <div className="flex">
      <nav className="flex flex-col navbar">
        <a>Home</a>
        <a>Colors</a>
        <a>Game of life</a>
        <a>Time date</a>
        <a>Images</a>
        <a>Custom</a>
        <a>Files</a>
        <div className="flex-1" />
        <a>Configuration</a>
      </nav>
      <div>
        <h1>Welcome to the led matrix server!</h1>
        <h2>Quick actions</h2>
        <div>
          <a>Colors</a>
          <a>Game of life</a>
          <a>Time date</a>
          <a>Images</a>
        </div>
      </div>
    </div>
  );
}

export default App;
