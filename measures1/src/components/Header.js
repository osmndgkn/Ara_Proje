import React, { Component } from 'react'
import Tooltip from './Tooltip'
import {Modal} from 'react-bootstrap'
import {MODAL_HEADER} from '../Text_Variables'
import {MODAL_BODY} from '../Text_Variables'




let dialog = false;
export default class Header extends Component {
    

    constructor(props){
        super(props);
        this.state= {
            show:false
        }
    }

    render() {
        return (
            <div>
            <nav className="navbar navbar-dark bg-dark">
  <span className="navbar-brand mb-0 h1">Measuring The Consistencies Of Requirements</span>
  
  <img src="https://img.icons8.com/fluency/48/000000/get-help.png" onClick={() => this.setState({ show: true})} />
 <Modal show = {this.state.show}>
     <Modal.Header>{MODAL_HEADER}</Modal.Header>
     <Modal.Body>{MODAL_BODY}</Modal.Body>
     <Modal.Footer><button onClick={() => this.setState({ show: false})}>close</button></Modal.Footer>

 </Modal>

</nav>

 
         
            </div>
            
        )
    }
}
