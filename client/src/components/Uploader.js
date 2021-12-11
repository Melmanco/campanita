import React from 'react'
import Axios, { post } from 'axios';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    });
  };

  onChange(e) {
    this.setState({file:e.target.files[0]});
  };

  fileUpload(file){
    const url = 'http://localhost:3000/send-file';
    const formData = new FormData();
    formData.append('file',file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return  post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Enviar</button>
      </form>
   )
  }
}



export default Uploader;