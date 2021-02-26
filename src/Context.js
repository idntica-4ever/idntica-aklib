import React, { Component } from 'react'
//import {storeProducts1, detailProduct} from './data';
//import axios from "axios";
//import config from "./config";

const ProductContext = React.createContext();;
//Provider

//Consumer
class ProductProvider extends Component {
    state={
        loggedUser:"Guest",
        loggedPhone:"",
        loggedEmail:"",
        userGroup:"NA",
        isAdmin:false,
        isLibrarian:false,
        isAuthenticated:false
        };

            setloggedUser=(type) => {
                let tempType=type;
               this.setState({loggedUser:tempType});
            
            }  

      

            setIsAdmin=(type) => {
                let tempType=type;
                console.log("value received", type);
               this.setState({isAdmin:tempType});
            
            }

            setIsAuthenticated=(type) => {
                let tempType=type;
               this.setState({isAuthenticated:tempType});
            
            }

            setuserGroup= async(type) => {
                let tempType;
                console.log("value received", type);

                if (type===undefined){
                    tempType="NA";
                }else
                {
                    tempType=type[0];
                }
                await this.setState({userGroup:tempType});  
                if(tempType==="inigo_admin") 
                {
                this.setState({isAdmin:true})
                this.setState({isLibrarian:false})
                }
                else if(tempType==="inigo_librarian")
                {
                    this.setState({isAdmin:false})
                    this.setState({isLibrarian:true})
                    }else
                    {
                this.setState({isAdmin:false})  
                this.setState({isLibrarian:false})
   
                    }        
            }  
           
            
            setloggedPhone=(type) => {
                let tempType=type;
               this.setState({loggedPhone:tempType});
            }        

            setloggedEmail=(type) => {
                let tempType=type;
               this.setState({loggedEmail:tempType});
            }        

    render() {
        return (
            
          <ProductContext.Provider value={{
...this.state,
setloggedUser:this.setloggedUser,
setloggedEmail:this.setloggedEmail,
setloggedPhone:this.setloggedPhone,
setuserGroup:this.setuserGroup,
setIsAdmin:this.setIsAdmin, 
setIsAuthenticated:this.setIsAuthenticated

}}>
              {this.props.children}
          </ProductContext.Provider>
          
            )
    }   
}


const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};