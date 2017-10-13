import React from 'react';
import styles from './app.css'
import Modal from './Modal.jsx'

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isHidden: true,
      title: '',
      description: '',
      edit: false,
      items: [],
      EditedData: {},
      itemIndex: null
    }
  }

  handleModelOkClick(userInput,userDescription,onEdit,cardIndex){
    if(onEdit) {
      let updatedItems = [...this.state.items];
      let updatedCard = updatedItems[cardIndex];
      updatedCard.title = userInput;
      updatedCard.desc = userDescription;
      updatedItems[cardIndex] = updatedCard;
      this.setState({items: updatedItems, isHidden: true});
    }
    else {
      function formatDate() {
      var newDate = new Date();
      var sMonth = padValue(newDate.getMonth() + 1);
      var sDay = padValue(newDate.getDate());
      var sYear = newDate.getFullYear();
      var sHour = newDate.getHours();
      var sMinute = padValue(newDate.getMinutes());
      var sAMPM = "AM";
      var iHourCheck = parseInt(sHour);
      if (iHourCheck > 12) {
          sAMPM = "PM";
          sHour = iHourCheck - 12;
      }
      else if (iHourCheck === 0) {
          sHour = "12";
      }
      sHour = padValue(sHour);
      return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
  }
      function padValue(value) {
      return (value < 10) ? "0" + value : value;
  }
      let updated = [...this.state.items];
        updated.push({
        title: userInput,
        desc: userDescription,
        date: formatDate()
      });
      this.setState({
        items: updated,
        isHidden: true,
      });
    }
  }
  toggleHidden () {
    this.setState ({
      isHidden: !this.state.isHidden,
      edit: false
    })
  }
  removeToDo (event, index){
    event.stopPropagation();
    let items = [...this.state.items];
    items.splice(index,1)
    this.setState({
      items: items,
})
  }
  openModel (index){
    let items = [... this.state.items];
    let edited = items[index];
    this.setState({
      edit : true,
      EditedData: edited,
      isHidden: false,
      itemIndex: index
    });
  }
   render() {
      return (
          <div className={styles.mainContainer}>
                  { this.state.items.map((x, i) =>
                    <div title={'click to edit text'} onClick={this.openModel.bind(this, i)}className={styles.modalCard} key={i}>
                        <div className={styles.cardTitle}>
                              <div className={styles.textColor}>{x.title}</div>
                              <div><button onClick={e => this.removeToDo(e, i)} className={styles.deleteCard}>X</button></div>
                        </div>
                        <div className={styles.cardDescription}>{x.desc}</div>
                            <div>
                                <div className={styles.created}>Created</div>
                                <div className={styles.date}>{x.date}</div>
                            </div>
                    </div>)}

                    <div onClick={this.toggleHidden.bind(this)} className={styles.container}>
                         <div className={styles.main}>
                               <div className={styles.plus}>
                                  &#43;
                               </div>
                         </div>
                    </div>
                <Modal cardIndex={this.state.itemIndex} userEnteredEditedData={this.state.EditedData} onEdit={this.state.edit} isHidden={this.state.isHidden} onCancel={this.toggleHidden.bind(this)}  onUserClick={this.handleModelOkClick.bind(this) } />
          </div>
         );
   }
}

export default App;
