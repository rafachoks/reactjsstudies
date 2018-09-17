import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Transfer from './components/transfer/Transfer';




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ABCCRM - Associação Brasileira dos Criadores de Cavalo da Raça Mangalargat</h1>
        </header>
        <div>
            <Transfer />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
