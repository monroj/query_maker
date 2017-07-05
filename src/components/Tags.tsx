import * as React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';
import InlineEdit from 'react-edit-inline';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import SimpleReactComponent from 'simple-react-editable'

interface TagsState {
    elems: any,
    eConts: any,
    editorText: any,
    itemsBeingEdited: any,
    value: any
}

interface TagProps {
    contents: any,
    ind: any,
    handleDelete: any,
    handleUpdate: any
}

interface TagState {
    contents: any

}



const SearchWrapper = styled.div`
    width: 629px;
    display: flex;
    height: inherit;
    align: center
    outline: none;
    padding: 12px;
    padding-right: 30px;
    border: 1px solid grey;
    border-radius: 4px;
    color: grey;
`;

const TagEnt = styled.div`{
    list-style-type: none;
    display: inline;
    float: left;
    height: 100 px;
    background-color: #EFEFEF;
    border-radius: 3px;
    padding: 3px 0px 5px 8px;
}`

const StyledInp = styled.input`
     outline: none;
     border: 0;
     background-color: #EFEFEF;
     font-family: "Work Sans";	
`;

const TSpan = styled.span`
    display: inline;
    float: left;
    background-color: #EFEFEF;
    border-radius: 3px;
    padding: 3px 0px 5px 8px;
`;

const DelBtn = styled.span`
    height: 21px;
    width: 21px;
    text-align: left;
`;

class Tag extends React.Component<TagProps, TagState> {
    constructor(props) {
        super(props)
        this.state = { contents: this.props.contents }
        this.handleChange = this.handleChange.bind(this)
        this.handleDel = this.handleDel.bind(this)
        //this.textAreaAdjust = this.textAreaAdjust.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ contents: nextProps.contents });
    }
    handleChange(e) {
        this.setState({
            contents: e.target.value
        })
        this.props.handleUpdate(this.props.ind, this.state.contents)

    }
    handleDel() {
        this.props.handleUpdate(this.props.ind, this.state.contents)
        this.props.handleDelete(this.props.ind)
    }
//width: 31 + 2 * this.state.contents.length}
    render() {
         console.log(this.state.contents.length)
        return (
            <TSpan >
                <StyledInp style = {{width: (this.state.contents.length) }} value={this.state.contents} onChange={this.handleChange} />
                <DelBtn onClick={this.handleDel}>x</DelBtn>
            </TSpan>
        )
    }
}


class Tags extends React.Component<{}, TagsState> {
    constructor(props) {
        super(props);
        this.state = {
            elems: [],
            eConts: [],
            editorText: "",
            itemsBeingEdited: 2,
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(e) {
        e.preventDefault()
        var newAdd = this.state.value
        this.setState({ eConts: this.state.eConts.concat(newAdd) }, function () {
            this.setState({ elems: this.state.elems.concat(<Tag contents={this.state.eConts[this.state.eConts.length - 1]} handleUpdate={this.handleUpdate} ind={this.state.elems.length} handleDelete={this.handleDelete} />), value: "" })
        })
    }

    handleUpdate(ind, ent) {
        console.log(ind)
        console.log(ent)
        var newArr = this.state.eConts;
        //newArr[ind] = <Tag contents={ent} handleUpdate={this.handleUpdate} ind={ind} handleDelete={this.handleDelete} />
        newArr[ind] = ent
        this.setState({ eConts: newArr })
    }
    handleDelete(ind) {
        var newArr = this.state.eConts;
        newArr.splice(ind, 1)
        var newElems = []
        for (var i in newArr) {
            newElems.push(<Tag contents={newArr[i]} handleUpdate={this.handleUpdate} ind={i} handleDelete={this.handleDelete} />)
        }
        console.log(newElems)
        this.setState({ elems: newElems })
    }


    render() {
        var contents = this.state.elems.map((item, i) => {
            return (
                <span key = {i}>
                    {item}
                </span>
            );
        });
        console.log(contents);
        return (
            <SearchWrapper >
               <div>
                {contents}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </form>
            </SearchWrapper>
        )
    }
}




export default Tags;