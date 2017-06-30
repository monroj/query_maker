import * as React from 'react';
import Example from './components/Example';
import Dropdown from './components/drop-downs/drop-down';
import styled from 'styled-components';

interface AProps {
  attributes?: string[];
  operators?: string[];
}

interface AState {
  attr1text: string;
  attr2text: string;
}

/*const onOptionClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
  console.log('hello');
  console.log(e.currentTarget.parentElement.parentElement.attributes);
  this.setState({attr1text: "lol"}); 
};*/

const Item = styled.div`
  padding: 5px 12px;
  color: grey;
  &:hover {
    background: blue;
  }
`;

const LookupLink = styled.button`
    background:none;
    border:none;
    margin:0;
    font-family: "Work Sans";	
    padding:7.5px;
    font-weight: bold;
    color: #00539B;
`;

//const renderOptions = ['option 1', 'option 2', 'option 3', 'option 4'].map((item, index) => (<Item key={index} onClick={onOptionClick}>{item}</Item>));

const MainWrapper = styled.div`
 
   padding: 23.5px;
   border: solid grey;
   display: flex;
   vertical-align: top;
   background-color: #FFFFFF;
`;
class App extends React.Component<AProps, AState> {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      attr1text: 'Select an attrubute',
      attr2text: 'Select an element'
    };
    this.mapAttributes.bind(this);
    this.mapOperators.bind(this);
    //this.onOptionClick.bind(this);
  }

  onAttrClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    this.setState({ attr1text: e.currentTarget.innerText });
    //this.refs
  };

  onOperClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    this.setState({ attr2text: e.currentTarget.innerText });
    //this.refs
  };

  mapAttributes() {
    return this.props.attributes.map((item, index) => (<Item key={index} onClick={this.onAttrClick}>{item}</Item>));
  }
  mapOperators() {
    return this.props.operators.map((item, index) => (<Item key={index} onClick={this.onOperClick}>{item}</Item>));
  }
  render() {
    return (
      <MainWrapper className="App">
        <Dropdown dropdownText={this.state.attr1text} > {this.mapAttributes()} </Dropdown>
        <Dropdown dropdownText={this.state.attr2text} > {this.mapOperators()} </Dropdown>
        <Example tags={[]} />
        <LookupLink >Lookup</LookupLink>
      </MainWrapper>
    );
  }
}

export default App;
