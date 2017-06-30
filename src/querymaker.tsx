import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';

interface AProps {
}

interface AState {
    queries?: any
}

const selattribtes = ['at1', 'at2', 'at3', 'at4'];
const seloperators = ['op1', 'op2', 'op3', 'op4'];

var InProps = {
    attribtes: ['at1', 'at2', 'at3', 'at4'],
    operators: ['op1', 'op2', 'op3', 'op4']
}

const QueryDisplayList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const LiS = styled.li`
    list-style-type: none;
`;

const MainWrapper = styled.div`
   margin: 0 auto;
   padding: 0;
   border: none;
  
`;

class QueryMaker extends React.Component<AProps, AState> {

    constructor(props) {
        super(props);
        var eqs = [<App attributes={selattribtes} operators={seloperators} />];
        this.state = { queries: eqs };
        this.newAtt = this.newAtt.bind(this);
    }

    newAtt() {
        /*var oldState = this.state.queries;
        oldState.push(new App(InProps));
        console.log(typeof(new App(InProps)));
        this.setState({queries: oldState});*/

        const nqueries = this.state.queries;
        this.setState({
            queries: nqueries.concat(<App attributes={selattribtes} operators={seloperators} />)
        });
    }

    render() {

        var listItems = this.state.queries.map(function (item, i) {
            return (
                <LiS key={i}>
                    {item}
                </LiS>
            );
        });
        return (
            <MainWrapper>
                <QueryDisplayList>
                    {listItems}
                </QueryDisplayList>
                <button onClick={this.newAtt}> New Query </button>
            </MainWrapper>
        );
    }
}

export default QueryMaker;