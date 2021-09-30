import React, { Component } from 'react'

const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass=RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

export class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{
                name:null,
                email:null,
                password:null,
            },
            table:[],
            errors:{
                name:'',
                email:'',
                password:''
            }
        }
    }
    handler=(event)=>{
        const{id,value}=event.target;
            console.log(event)
            let errors=this.state.errors;
            let data = this.state.data;
            switch(id){
                case 'name':
                    errors.name=regForName.test(value)?'':'Name should be in more than 2 characters';
                    data.name = value;
                    break;
                case 'email':
                    errors.email=regForEmail.test(value)? '':'Email is not valid';
                    data.email = value;
                    break;
                case 'password':
                    errors.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                    data.password = value;
                    break;
            }
            this.setState({errors,[id]:value},()=>{
                console.log(errors)
            })
    }
    formSubmit=(event)=>{
        event.preventDefault();
        let temp = this.state.data;
        if(this.validate(this.state.errors))
            {
                alert("Valid Form");
                this.setState({
                    table: [...this.state.table,
                        {"name":temp.name,
                        "email":temp.email,
                        "password":temp.password
                        }]
                })
                document.getElementById('name').value='';
                document.getElementById('email').value='';
                document.getElementById('password').value='';
            }
            else{
                alert("Invalid Form");
                document.getElementById('name').value='';
                document.getElementById('email').value='';
                document.getElementById('password').value='';
            }
        }
        validate =(errors)=>{
            let valid=true;
            if(!this.state.data.name || !this.state.data.email || !this.state.data.password){
                valid = false;
            }
            Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
            return valid;
        }
    render() {
        const {errors}=this.state;
        return (
            <div className="container bg-dark text-light">
                <h1 className="text-center text-warning text-uppercase">Login Form</h1>
                <div className="row p-4 m-5 ">
                    <div className="col-lg-12">
                        <form onSubmit={this.formSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" id="name" className="form-control" onChange={this.handler} placeholder="Enter Name"/><br/>
                                    {errors.name.length>0 && 
                                    <span style={{color:'red'}}>{errors.name}</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-10">
                                    <input type="email" id="email" className="form-control" onChange={this.handler} placeholder="Enter Email"/><br/>
                                    {errors.email.length>0 && 
                                    <span style={{color:'red'}}>{errors.email}</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password:</label>
                                <div className="col-sm-10">
                                    <input type="password" id="password" className="form-control" onChange={this.handler} placeholder="Password"/><br/>
                                    {errors.password.length>0 &&
                                    <span style={{color:'red'}}>{errors.password}</span>} 
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Login</button>
                        </form>
                        <div className="table1 pt-5">
                            <div className="text-center">
                                <h2 className="text-info text-uppercase">Details</h2>
                                <table border='1' className="table table-striped pt-3">
                                    <thead>
                                        <tr>
                                            <td>Sr. No</td>
                                            <td>Name</td>
                                            <td>Email</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.table.map((element,index)=>
                                            <tr className="table-danger text-dark">
                                                <td>{index+1}</td>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default LoginForm;
