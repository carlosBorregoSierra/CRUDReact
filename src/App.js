import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup} from 'reactstrap';

const data = [
  {id:1, personage:'naruto', anime:'naruto'},
  {id:2, personage:'goku', anime:'DBZ'},
  {id:3, personage:'seto kaiba', anime:'YGO'},
  {id:4, personage:'Capitan', anime:'pecados capitales'},
];

class App extends React.Component {
  state={
    data:data,
    form:{
      id:'',
      personage:'',
      anime:''
    },
    modalInsert:false,
    modalEdit: false,
  };
 
  handleChance=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:e.target.value,
      }
    });
  }

  mostrarModalInsert=()=>{
    this.setState({modalInsert:true})
  }
  ocultarModalInsert=()=>{
    this.setState({modalInsert:false})
  }

  insertar=()=>{
    var newValue={...this.state.form}
    newValue.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(newValue);
    this.setState({data: lista})
    this.ocultarModalInsert();
  }

  mostrarModalEdit=(registry)=>{
    this.setState({modalEdit:true, form:registry})
  }
  
  ocultarModalEdit=()=>{
    this.setState({modalEdit:false})
  }
  edit=(e)=>{
    let cont=0;
    let list=this.state.data;
    list.map((reg)=>{
      if(e.id===reg.id){
        list[cont].personage=e.personage;
        list[cont].anime=e.anime;
      }
      cont++;
     }
    );
    this.setState({data:list});
    this.ocultarModalEdit();
  }

  delete=(e)=>{
    let op=window.confirm("Seguro Delete "+e.personage+"?");
    if(op){
      let cont=0;
      let list = this.state.data;
      list.map((reg)=>{
        if(reg.id===e.id){
          list.splice(cont,1);
        }
        cont++;
      });
      this.setState({data:list});
    }
  }

 render(){
  return (
    <>
      <Container>
        <br/>
          <Button color='success' onClick={()=>(this.mostrarModalInsert())}>Insertar</Button>
        <br/><br/>
        <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>personage</th>
                <th>Anime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((e)=>(
                <tr>
                  <td>{e.id}</td>
                  <td>{e.personage}</td>
                  <td>{e.anime}</td>
                  <td>
                    <Button color='primary' onClick={()=>(this.mostrarModalEdit(e))}>Edit</Button>{" "}
                    <Button color='danger' onClick={()=>this.delete(e)}>Delet</Button>
                  </td>
                </tr>
              ))
              }
            </tbody>
        </Table>
      </Container>
      
      <Modal isOpen={this.state.modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insert registry</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label>Personage:</label>
            <input className='form-control' name='personage' type='text' onChange={this.handleChance} />
          </FormGroup>

          <FormGroup>
            <label>Anime:</label>
            <input className='form-control' name='anime' type='text' onChange={this.handleChance}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color='primary' onClick={()=>this.insertar()}>Insert</Button>
            <Button color='danger' onClick={()=>this.ocultarModalInsert()}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEdit}>
        <ModalHeader>
          <div>
            <h3>Edit Personage</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.form.id}/>
          </FormGroup>

          <FormGroup>
            <label>Personage:</label>
            <input className='form-control' name='personage' type='text' onChange={this.handleChance} value={this.state.form.personage}/>
          </FormGroup>

          <FormGroup>
            <label>Anime:</label>
            <input className='form-control' name='anime' type='text' onChange={this.handleChance} value={this.state.form.anime}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color='primary' onClick={()=>this.edit(this.state.form)}>Edit</Button>
            <Button color='danger' onClick={()=>this.ocultarModalEdit()}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}}

export default App;
