import * as React from 'react';
import styled from 'styled-components';

import IDefaultProps from '../../types/styled-component-props';

interface IProps extends IDefaultProps, React.HTMLProps<HTMLElement> {
  /**
   * [required] Text to display in the drop-down field.
   */
  dropdownText: string;
  /**
   * [optional] Pass true to open the options list above the drop-down field.
   */
  openAbove?: boolean;
  /**
   * [optional] Pass true to keep the options list open after selection. This helps, for example, when
   * there are checkboxes or readio buttons in the list.
   */
  stayOpenOnSelect?: boolean;

  /**
   * [optional] disable dropdown field.
   */
  disabled?: boolean;
}

interface IState {
  optionsVisibility: boolean;
}

// styles
const TextField = styled.input`
  position: relative;
  height: 38px;
  width: inherit;
  display: flex;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
  outline: none;
  padding: 0 12px;
  padding-right: 30px;
  border: 1px solid grey;
  border-radius: 4px;
  color: grey;
  &:focus {
    border: 1px solid grey;
  }
`;

const OptionsElem = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: 100%;
  background-color: white;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,0.3);
  z-index: 100;
  &:before {
    position: absolute;
    content: '';
    right: 9px;
    width: 18px;
    height: 18px;
    transform: rotate(45deg);
    box-shadow: 0 3px 10px 0 rgba(0,0,0,0.3);
    background-color: inherit;
    z-index: -1;
  }
`;

const OptionsWrapper = styled.span`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: inherit;
`;

const DownArrow = styled.svg`
  position: absolute;
  display: flex;
  right: 12px;
  width: 12px;
  height: 6px;
  align-self: center;
  pointer-events: none;
  fill: grey;
`;

class UnstyledDropDown extends React.Component<IProps, IState> {

  state = {
    optionsVisibility: false,
  };

  dropDownElem: HTMLElement;

  handleOutsideClick = (e: any) => {
    // if e.currentTarget is not part of the dropdown, close
    const ref = this.dropDownElem;
    if (ref && !ref.contains(e.currentTarget)) {
      this.setState({
        optionsVisibility: false,
      });
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  toggleDropDown: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {
    // Bind the outside click event when the dropdown is open
    // This is important when rendering multiple dropdowns on the page
    const dropdownIsOpening = !this.state.optionsVisibility;
    if (dropdownIsOpening) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    e.currentTarget.focus();
    this.setState({ optionsVisibility: !this.state.optionsVisibility });
  }

  preventKeyboardInput: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.setState({ optionsVisibility: !this.state.optionsVisibility });
    }
  }

  hideOptions: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    // e.preventDefault();
    if (!this.props.stayOpenOnSelect) {
      this.setState({ optionsVisibility: !this.state.optionsVisibility });
    }
  }

  setRef = (ref: HTMLElement) => {
    this.dropDownElem = ref;
  }

  render() {
    const Options = styled(OptionsElem)`
      display: ${this.state.optionsVisibility ? 'flex' : 'none'};
    `;

    return (
      <div className={this.props.className} ref={this.setRef}>
        <TextField
          type="text"
          value={this.props.dropdownText}
          onClick={this.toggleDropDown}
          onKeyUp={this.preventKeyboardInput}
          disabled={this.props.disabled}
          readOnly
        />
        <DownArrow viewBox="0 0 12 6">
          <polygon points="0,0 12,0 6,6" />
        </DownArrow>
        <Options onClick={this.hideOptions}>
          <OptionsWrapper>{this.props.children}</OptionsWrapper>
        </Options>
      </div>
    );
  }
}

const Dropdown = styled(UnstyledDropDown)`
  position: relative;
  display: inline-flex;
  flex: 1;
  align-items: top;
  height: 38px;
  > div {
    ${(props) => props.openAbove ?
      `margin-bottom: 16px;
      top: auto;
      bottom: 100%;`
      :
      'margin-top: 16px;'
    }
    &:before {
      ${(props) => props.openAbove ? 'bottom: -9px;' : 'top: -9px;' }
    }
  }
`;

export default Dropdown;
