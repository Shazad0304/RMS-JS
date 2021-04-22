import React, {Component} from 'react'
import axios from "axios";
import  './stylesDelivery.css';

export default class FetchAllDrivers extends Component{
    constructor(props){
        super(props);
        this.state={
            drivers:[]
        };
      }

      componentDidMount(){
        this.retrieveDrivers();
      }

      retrieveDrivers(){
        axios.get("http://localhost:8000/display_driver").then(res =>{
          if(res.data.success){
            this.setState({
              drivers:res.data.existingDrivers
            });
            console.log(this.state.drivers)
          }
        });
      }    

      onDelete=(id)=>{
        axios.delete(`http://localhost:8000/driver/delete_driver/${id}`).then((res)=>{
          alert("Driver Deleted");
          this.retrieveDrivers();
        })
      }      


      filterData(drivers,searchKey){
        const result=drivers.filter((driver)=>
        driver.driverNo.toLowerCase().includes(searchKey)||
        driver.name.toLowerCase().includes(searchKey)||
        driver.nic.toLowerCase().includes(searchKey)
        )
        this.setState({drivers:result})
      }

     

      handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value;
        axios.get("http://localhost:8000/driver").then(res =>{
          if(res.data.success){
            this.filterData(res.data.existingDrivers,searchKey)
          }
        });
      
      }

      render(){
        return (
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                        <div className="col-9 position-relative">
                            <h2>Drivers Details</h2>
                        </div>
                        <div className="col-3 position-relative">                                
                            <input className="form-control search" type="search" placeholder="search" name="searchQuery" onChange={this.handleSearchArea}></input>
                        </div>
                        <hr className="hr" style={{height:'2px' , color:'#0a90e8'}}/>                                
                  </div>                                 
                <div className="shadowBox">
                    <div className="row">
                        <div className="col-12 ">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Driver No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Licence No</th>
                                        <th scope="col">NIC</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.state.drivers.map((drivers, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><a href={`/driver/${drivers._id}`} style={{textDecoration:'none'}}>{drivers.driverNo}</a></td>
                                        <td>{drivers.name}</td>
                                        <td>{drivers.licenceNo}</td>
                                        <td>{drivers.nic}</td>
                                        <td>{drivers.mobile}</td>
                                        <td>{drivers.address}</td>
                                        <td>
                                            <a href={`/update_driver/${drivers._id}`} type="button" class="btn btn-success">
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </a>&nbsp;&nbsp;
                                            <a href="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(drivers._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete                                        
                                            </a> 
                                        </td>
                                    </tr>                            
                                </tbody>                            
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3 addv">
                            <a href="/add_driver" type="button" class="btn btn-lg" ><i class="fas fa-user-plus"></i>&nbsp;&nbsp;Create New Driver</a>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    }
}