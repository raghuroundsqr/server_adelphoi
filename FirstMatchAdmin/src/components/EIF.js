import React from 'react';
import '../App.css';
import { eifQuestions, submitEIF } from '../api/api';
import { connect } from 'react-redux';

export class EIF extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loadquestions: []
        }
    }

    async componentDidMount() {
        await eifQuestions();
        this.setState({
            loadquestions: this.props.loadquestions,
        })
        console.log(this.state.loadquestions.response, 'load')
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        console.log(e, 'e');
        this.setState({
            data: {
                ...this.state.data,
                [name]: value,

            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = this.state;
        console.log(data, 'data')
        let newArray = [];
        for (let k in data) {
            newArray.push({ 'id': parseInt(k), 'answer': data[k] });
        }
        console.log(newArray, 'newarray');
        let newArray1 = JSON.stringify(newArray);
        try {
            await submitEIF(newArray);
            this.props.history.push('/eifmsg');
        }
        catch (e) {
            console.log(e)
            this.setState({
                error: e
            });
            return;
        }
    }
    display = () => {
        const display = this.props.loadquestions.response && this.props.loadquestions.response
            .map((data, idx) =>
                data.question_type === 'TEXT' ?
                    <div className="form-group">
                        <label for="question">{data.question}</label>
                        <input className="form-control" id='questionText' type='TEXT' name={data.id} value={this.state.name} onChange={this.handleChange} /></div>
                    :
                    data.suggested_answers.map((suggested, idy) =>
                        <div className="form-group form-check">
                            {idy === 0 ? <label className="form-check-label" for='suggestedanswer'>{data.question}</label> : null}
                            <input className="form-check-input" id='check' type='checkbox' name={suggested.question_id} value={suggested.answer} onChange={this.handleCheckboxChange} /> {suggested.answer}
                        </div>)
            )
        return display
    }
    render() {
        return (

            <div className="cotainer">
                <div className="text-center"><h2>EXPRESS INTREST FORM</h2></div>
                <div className="text-center col-sm">Do you offer solutions to at-risk youth? Are you interested to know on how Artificial Intelligence can tranform the outcomes? Then fill in the INTEREST FORM below.</div>
                <form className="m-4" >
                    {this.display()}
                    <div className="form-group row d-flex justify-content-center">
                        <div className="col-sm-3">
                            &nbsp;
                            </div>
                        <div className="col-sm-6 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn btn-block" onClick={this.handleSubmit}>Submit</button>
                        </div>
                        <div className="col-sm-3  ">
                            &nbsp;
                            </div>
                    </div>
                    <div className="form-group row d-flex justify-content-center"></div>

                </form>
            </div>




        )
    }
}


const mapStateToProps = state => {
    return {
        loadquestions: state.loadquestion.loadquestions
    }
}
export default connect(mapStateToProps)(EIF);

