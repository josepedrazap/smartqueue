import React, {Component} from 'react'
import SimpleExample from './SimpleExample'
import { Link } from 'react-router-dom'

class Maps_queue extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      address: '',
      description: '',
      queue_id: ''
    };
  }
  render () {
    return(
    <div className="col-md-6 Cq">
      <div className="card">
      <div className="card-header text-white bg-dark">
        Colas por posición geográfica
      </div>
        <div className="row">
          <div className="col-md-4">

          </div>
          <div className="col-md-8">
            <SimpleExample lat='0' title="Mapa" lng='0'/>
          </div>
        </div>

        <div className="card-footer bg-dark ">
          <div className="row Mq_buttons">
            <Link to="/home">
              <button type="submit" onClick="" className="btn col-md-3 btn-outline-success mr-1" name="button">Aceptar</button>
            </Link>
            <Link to="/home">
              <button type="button" onClick="" className="btn col-md-3 btn-outline-warning" name="button">Cancelar</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
    )
  }
};
export default Maps_queue;
