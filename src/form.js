import React from 'react';


export default class Form extends React.Component{
    state = {
      prayerrequest: ''
    }
  
  
  render () {
    return (
      <form>
        <input placeholder='Prayer Request'
         value = {this.state.prayerrequest} 
         onChanges={e => this.setState({prayerequest=e.target.value})}/>
      </form>
    );
    }
}