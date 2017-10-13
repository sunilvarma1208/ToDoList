import React from 'react';
import styles from './app.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.onEdit ? props.userEnteredEditedData.title : '',
      description: props.onEdit ? props.userEnteredEditedData.desc : ''
    }
  }
  handleChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  changetext(event){
    this.setState({
      inputValue: event.target.value
    })

  }
  submitToDo() {
    if(this.state.inputValue && this.state.description) {
      this.props.onUserClick(this.state.inputValue, this.state.description, this.props.onEdit, this.props.cardIndex);
      this.setState({
        inputValue : '',
        description: ''
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.onEdit) {
      this.setState({
        inputValue: nextProps.userEnteredEditedData.title,
        description: nextProps.userEnteredEditedData.desc
      });
    }
    else {
      this.setState({
        inputValue: '',
        description: ''
      });
    }
  }
  render() {

    return ( this.props.isHidden ? null :
      <div className={styles.modalWrapper}>
           <div className = {styles.modelMain}>
                 <div>
                     <div onClick={this.props.onCancel} className={styles.modalHide}>X</div>
                     <div><h2>{this.props.onEdit ? 'Update ToDo' : 'Add ToDo' }</h2></div>
                     <div className = {styles.modelInputName}> <span>Title</span></div>
                     <div> <input  type = 'text' name = 'name'  value={this.state.inputValue} onChange={this.changetext.bind(this)}/></div>
                     <div className = {styles.modelDesciName}> Description </div>
                     <div><textarea value={this.state.description} onChange={this.handleChange.bind(this)}></textarea></div>
                 </div>

                 <div className = {styles.modelButtons}>
                     <span> <button className = {styles.cancelButton} type="button" onClick={this.props.onCancel}>Cancel</button></span>
                     <span> <button className = {styles.addButton} type="button" onClick={this.submitToDo.bind(this)}>{this.props.onEdit ? 'Update' : 'Add' }</button></span>
                 </div>
           </div>

      </div>);
    }
  }

  export default Modal;
