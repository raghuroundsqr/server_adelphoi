import React from 'react';
import { fetchRaflist,baseApiUrl } from '../api/api';
import { connect } from 'react-redux';
import axios from 'axios'
import '../App.css';
import  {store}  from '../App'
export class RAFList extends React.Component {
    constructor() {
        super();
        this.state = {
            raflist: [],
            listID:"",
            listData:[],
            customerId:"",
            categoryId:"",
            formstatus: "approved"

        }
    }
    async componentDidMount() { 
        await fetchRaflist();
        this.setState({
            raflist: this.props.RafList,
        })
       
    }
    
    getDetails = (e) => {
        e.preventDefault();
        let listID = this.state.listID;
        if (e.currentTarget.dataset.id === 0 || e.currentTarget.dataset.id) {
            listID = e.currentTarget.dataset.id ;
          }
          console.log(this.state.raflist,"before")
         const List = this.props.RafList.response.filter(listdata => listdata.id == listID)
         let customer_id = List.find(obj => obj.customer_id);
         let category_id = List.find(obj => obj.category_id);
         console.log(List,"LL")
       console.log(customer_id.customer_id,"LL")
          this.setState({ listID: listID,
                          listData:List,
                          customerId: customer_id.customer_id,
                           categoryId: category_id.category_id,
                           });
     }
      addDecision = (e) => {
          const {categoryId,customerId} = this.state
          const {value} =e.target
            const data = {
            customer:customerId,
            category:categoryId,
            form_status: value
        }
        console.log(data,"data")
     const currentUser = store.getState().loginData.user.accessToken;
          const response = axios.post(`${baseApiUrl}/stages/validate/`,
          data, { 
            headers : {
                'Authorization' : `Bearer ${currentUser}`
              } 
        });
        this.setState({ listID: ""
           
             });
          } 

    render() {
           let listID = this.state.listID;
           console.log(this.state.raflist,"listdata")
           if(listID !== ""){
            return (
                <div className="container-fluid">
                    <div className="row p-2 bg-primary text-white mb-1">RAF List Details</div>
                    
                    <ul className="list-group">
                        {this.state.listData.map(info => ( info.children.map(r => 
                        (r.questions.map(q=> (q.answers.map(z=> (<li className="list-group-item mb-1" onClick={this.getDetails}>
                              <span className="text-primary "> {q.question}</span> <br />
                              <span className=" ">(A)</span> -
                               {z.answer.includes('static') ? (<a target="_blank" href={`${baseApiUrl}/${z.answer}`} className="font-weight-bold">View File</a>): (<span className="text-primary font-weight-bold">{z.answer}</span>)}
                               
                            </li>)
                            )))))))}
                    </ul>
                    <div className="form-group row mt-3 mb-3">
                                <div className="col-sm-1  ">
                                    &nbsp;
                            </div>
                                <div className="col-sm-5 d-flex justify-content-center">
                                {/* <div className="keyboardRow roundBorder" value={"example"} onClick={e => this.handleInput(e, "value")} > */}
                                    <button type="submit" value="approved" className="btn btn-primary pr-5 pl-5" onClick={e => this.addDecision(e, "value")}>Approve</button>
                                </div>
                                <div className="col-sm-5 d-flex justify-content-center">
                                    <button type="submit" value="rejected" className="btn btn-secondary pr-5 pl-5" onClick={e => this.addDecision(e, "value")}>Reject</button>
                                </div>
                                <div className="col-sm-1">
                                    &nbsp;
                            </div>
                            </div>
                            <div className="m-0">
                        &nbsp;
                                </div>
                </div>
            );
           }
           else{
            return (
                <div className="container-fluid">
                    <div className="row p-2 bg-primary text-white mb-1">RAF List</div> 
                    <ul className="list-group">
                        {this.props.RafList.response && this.props.RafList.response.map((ques, index) =>
                        
                            (
                                <li className="list-group-item mb-1" data-id={ques.id} onClick={this.getDetails}>
                                    <span className="text-primary ">{ques.org_name}</span> <br />
                                    <span className=" ">Created On</span> - <span className="text-primary font-weight-bold">{ques.date_created}</span>
                                </li>))}
                    </ul>
                    
                </div>
            );
           }
       
        
    }
}
const mapStateToProps = state => {
    return {
        RafList: state.raflists.RafList,
    }
}
export default connect(mapStateToProps)(RAFList);