import './App.css';

const App = () => {
  return (
    <div className="flex">
      <nav className="flex flex-col">
        <a>Home</a>
        <a>Colors</a>
        <a>Game of life</a>
        <a>Time date</a>
        <a>Images</a>
        <a>Custom</a>
        <a>Files</a>
        <div className="spacer" />
        <a>Configuration</a>
      </nav>
      <div>
        <h1>Welcome to the led matrix server!</h1>
        <h2>Quick actions</h2>
        <div className="quick-actions">
          <a>Colors</a >
          <a>Game of life</a >
          <a>Time date</a >
          <a>Images</a>
        </div>
      </div>
    </div>
  );
}

export default App;
