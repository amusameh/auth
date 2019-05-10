import React, { Component } from 'react';
import axios from 'axios';

class Secret extends Component {

  state = { data: ""}
  componentDidMount() {

    axios.get('/api/secret')
      .then(res => {
        console.log('ress', res.data);
        this.setState({
          data: res.data.msg,    
        })
    })
    .catch(err => {
      console.error('err', err);
    })
  }
    
  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>Shhhh this is secret</h2>
        <p>{data && data}</p>
      </div>
    )
  }
}

export default Secret;
