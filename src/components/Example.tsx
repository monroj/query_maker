import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';
import BetterTags from './BetterTags';
import InlineEdit from 'react-edit-inline';

let style = require('./Example.css');



interface TProps {
    tags: Array<{
        id: number,
        text: string
    }>
}

interface TState {
    tags: Array<{
        id: number,
        text: string
    }>

}


const SearchWrapper = styled.div`
    
    height: inherit;
    width: inherit;
    display: flex;
    flex: 1;
    
    outline: none;
    padding: 0 12px;
    padding-right: 30px;
    border: 1px solid grey;
    border-radius: 4px;
    color: grey;
`;


class TextInput extends React.Component<{}, {}> {
    handleInput() {
        var input = React.findDOMNode(this.refs.userInput)
        this.props.saveInput(input.value)
        input.value = ''
    }
    render() {
        var label = this.props.label
        return (
            <div className="form-group">
                <h3><label htmlFor="input-{ label }">{label}</label></h3>
                <input
                    type="text"
                    className="form-control"
                    id="input-{ label }"
                    ref="userInput"
                />
                <button onClick={this.handleInput}>Save</button>
            </div>
        )
    }
}


class Ti2 extends React.Component<TProps, TState> {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],

        };
    }

    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }
    render() {
        const { tags } = this.state;

        return (

            <SearchWrapper >
                <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={this.state.message}
                    paramName="message"
                    change={this.dataChanged}
                    style={{
                        backgroundColor: 'yellow',
                        minWidth: 150,
                        display: 'inline-block',
                        margin: 0,
                        padding: 0,
                        fontSize: 15,
                        outline: 0,
                        border: 0
                    }}
                />
            </SearchWrapper>

        )
    }

}






class TagInp extends React.Component<TProps, TState> {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],

        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({ tags: tags });
    }

    handleAddition(tag) {
        if (tag != "") {
            let tags = this.state.tags;
            tags.push({
                id: tags.length + 1,
                text: tag
            });
            this.setState({ tags: tags });
        }
    }
    handleChange(tags) {
        this.setState({ tags })
    }


    onTagAdded(tag) {
        this.setState({
            tags: [...this.state.tags, tag]
        });
    }

    onTagRemoved(tag, index) {
        this.setState({
            tags: this.state.tags.filter((tag, i) => i !== index)
        });
    }

    render() {
        const { tags } = this.state;

        return (

            <SearchWrapper >


            </SearchWrapper>

        )
    }
};




const Example = styled(TagInp) `
    
`;

export default Ti2;