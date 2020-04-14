import React from 'react';
import '../App.css';
import { AddQuestionsCategory } from '../api/api';
class AddQuestionCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            title:"",
            description:"",
             isUpdated: false,
             error:""       }
    }
    addCategory = async (e) => {  
            e.preventDefault();
            const {title,description} = this.state;
            const data = {
                title: title,
                description: description
            }
            try {
                await AddQuestionsCategory(data);
                this.setState({isUpdated:true}) 
                }
            catch (e) {
                console.log(e)
                this.setState({
                    error: e
                });
                return;
              }
            };
  handleChange = (e) => {
       const { name, value } = e.target;
       this.setState({
           [name]: value
       });
   }
   addAnother = (e) => {
       this.setState({title:"",description:"",isUpdated: false})
   }
    render() {
        return (

            <div className="container-fluid">
                <form >
                    <div className="form-group d-flex flex-column bd-highlight mb-2">
                        <div className="row p-2 bg-primary text-white">Add Question Categories</div>
                        <div className="form-group row d-flex justify-content-center">
                        &nbsp;
                            </div>
                        <div className="row p-2 bd-highlight align">
                            <div className="col col-2"><label for="inputEmail3" className="form-label font-weight-bold ">Question Category:</label></div>
                            <div className="col col-4">
                            <div className="form-group row">
                                
                                <input type="text"
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                    name="title"
                                    className="form-control " 
                                    id="inputEmail3" placeholder="" />
                              </div>
                            </div>
                            
        {this.state.isUpdated ?
        (<><div className="col col-1"> <span className="text-primary">Saved!{this.state.isUpdated}</span></div>
        <div className="col col-2"><button type="button" className="btn btn-primary" onClick={this.addAnother}>Add Another</button></div>
        </>):
          ( <div className="col col-1"><button className="btn btn-primary" onClick={this.addCategory}>Save{this.state.isUpdated}</button></div>)}
                            
                            
                        </div>
                        
                    </div>
                    <div className="form-group row d-flex justify-content-center">
                        &nbsp;
                            </div>
                </form>

            </div>

        );
    }
}

export default AddQuestionCategory;