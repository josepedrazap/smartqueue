import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { signal_n_nodes, qr_show_hide, screen_show_hide } from '../Api';
import { withAlert } from "react-alert";


class Card_queue extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.queue_id,
      c_nodes: "0",
      status: 0,
      btn_screen: 'btn col-md-3 btn-outline-success',
      btn_qr: 'btn col-md-3 p-2 btn-outline-warning',
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleQr = this.handleQr.bind(this);
    this.handleScreen = this.handleScreen.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  componentDidMount(){
      var url = 'http://localhost:3001/run/queue/count_nodes?id=' + this.state.id;
      signal_n_nodes(
        (err, aux1) => {
          //if(aux1[0] === '$' && aux1[1] === '$' && aux1[2] === '$'){
            if(aux1.substring(3) === this.state.id){
              fetch(url, {
                headers: {
                  authorization: 'beare '+ window.sessionStorage.getItem("token")
                }
              })
               .then((response) => {
                 console.log(response)
                return response.json()
              })
              .then((data) => {
                this.setState({ c_nodes: data })
              });
            }
          //}
        }
      );
      qr_show_hide((err, aux) => {
        if(aux.substring(4) === this.state.id){
          if(aux[3] === '1'){
            this.setState({
              btn_qr: 'btn col-md-3 p-2 btn-warning'
            })
          }else{
            this.setState({
              btn_qr: 'btn col-md-3 p-2 btn-outline-warning'
            })
          }
        }
      });
      screen_show_hide((err, aux) => {
          if(aux.substring(4) === this.state.id){
            if(aux[3] === '1'){
              this.setState({
                btn_screen: 'btn col-md-3 p-2 btn-success'
              })
            }else{
              this.setState({
                btn_screen: 'btn col-md-3 p-2 btn-outline-success'
              })
            }
          }
      });
  }
  static PropTypes = {
    title: PropTypes.string.isRequired,
    n_nodes: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    queue_id: PropTypes.string.isRequired,
  };

  handleDelete(){

    axios.get('http://localhost:3001/run/queue/delete_queue?queue_id=' + this.state.id, {
      headers: {
        authorization: 'beare '+ window.sessionStorage.getItem("token")
      }
    })
      .then((response) => {
        if(response.status === 200){
          this.props.alert.success('Se ha eliminado la queue!')
          this.setState({
            status: 1
          })
        }
      })
      .catch(function (error) {
      })
      .then(function () {

      });
  }
  handleQr(){
    window.open('http://localhost:3001/screen/run_qr?queue_id=' + this.state.id, '_blank');
  }
  handleScreen(){
    window.open('http://localhost:3001/screen/run_screen?queue_id=' + this.state.id, '_blank');
  }
  handleView(){
    if(this.state.status === 0){
      this.setState({
        status: 2
      })
    }else{
      this.setState({
        status: 0
      })
    }
  }

  render(){
    if(this.state.status === 1){
      return(<Redirect to='/home' />)
    }
    if(this.state.status === 0){
      return(
        <Fragment>
        <div className="col-md-3">
          <div className="card mt-4 bg-light">
            <div className="card-header text-white bg-dark">
              {this.props.title}
            </div>
            <div className="card-footer bg-dark">
              <div className="row mx-auto">
                <button type="button" onClick={this.handleScreen} className={this.state.btn_screen} name="button"><i className="fas fa-desktop"></i></button>
                <button type="button" onClick={this.handleQr} className={this.state.btn_qr} name="button"><i className="fas fa-qrcode"></i></button>
                <button type="button" onClick={this.handleView} className="btn col-md-3 p-2 btn-outline-info" name="button"><i className="far fa-eye"></i></button>
                <button type="button" onClick={this.handleDelete} className="btn col-md-3 p-2 btn-outline-danger" name="button"><i className="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
      )
    }
    return (
      <div className="col-md-3">
        <div className="card mt-4 bg-light">
          <div className="card-header text-white bg-dark">
            {this.props.title}
          </div>
          <div className="card-body">
            <div className="list-group">
              <p><i class="fas fa-map-pin"></i> {this.props.address}</p>
              <p><i class="fas fa-users"></i> {this.state.c_nodes}</p>
              <p><i class="far fa-file-alt"></i> {this.props.description}</p>
            </div>
          </div>
          <div className="card-footer bg-dark">
            <div className="row mx-auto">
              <button type="button" onClick={this.handleScreen} className={this.state.btn_screen} name="button"><i className="fas fa-desktop"></i></button>
              <button type="button" onClick={this.handleQr} className={this.state.btn_qr} name="button"><i className="fas fa-qrcode"></i></button>
              <button type="button" onClick={this.handleView} className="btn col-md-3 p-2 btn-info" name="button"><i className="far fa-eye"></i></button>
              <button type="button" onClick={this.handleDelete} className="btn col-md-3 p-2 btn-outline-danger" name="button"><i className="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default withAlert(Card_queue);
