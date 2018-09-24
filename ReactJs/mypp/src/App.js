import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person.js'

class App extends Component {
  state = {
    persons: [
      {name:'Max', age:28 },
      {name:'Manu', age:22},
      {name:'Steph', age:12}
    ],
    otherState: 'some other value',
    showView: false
  }

   togleViewHandler = () =>{
   const show = this.state.showView;
   this.setState({showView: !show});
  }

  nameChangeHandler = (event) =>{
    this.setState({
      persons: [
        {name: 'Max', age:28 },
        {name:event.target.value, age:22},
        {name:'Steph', age:12}
      ],
    });
  }

  deletePersonHandler = (persondIndex) =>{
    const persons = this.state.persons;
    persons.splice(persondIndex, 1);
    this.setState({persons: persons})
  }

  render() {

  let persons = null;

  if(this.state.showView){
    persons = (
      <div>
      {this.state.persons.map((person, index) =>{
        return <Person
                click={() => this.deletePersonHandler(index)} 
                name={person.name}
                age={person.age} />
      })}
      </div>
    )
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.togleViewHandler}>Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
