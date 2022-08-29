import React, { Component } from 'react'
import NormalDistribution from 'normal-distribution';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as XLSX from 'xlsx'
import ReqRelations from './ReqRelations';
import Result from './Result';
import Footer from './Footer';
const nd = require('normal-distribution');
const math = require('mathjs');



let objectives= [];
let requirements = [];
let relations = null;

let Constraits= [];
let requirementsOfCons = [];
let relationsOfCons = null;

let relationCount = [];
let relationCountCons = [];

let doc = [];
let dosvo = [];
let dosvr = [];

let dcc = [];

let dcivc = [];
let dcivr = [];


let reqCountO = [];
let reqCountC = [];

let OSCC = [];
let OSCI = [];
let OCCC = [];
let OCCI = [];
let isSuccess =false;
let low;
let high;




export default class Navbar extends Component {

  GetLow = (e)=>{ 
    low = e.target.value ;
    /*console.log(low);*/}
  GetHigh = (e)=>{ 
    high = e.target.value;
    /*console.log(high);*/}



  

    constructor(props) {

        super(props);

        this.state = {
            isOSCC : false,
            regrel : false,
            isResults : false,
            

        }

    
      

    }

    



    onSubmit = (e)=>{


      
      console.log("Objectives");
        console.log(doc)
         console.log(dosvr)
         
         
         if (doc.length == 0 || dosvr.length == 0){toast.error("Veriler içe aktarılamadı!!"); isSuccess = false; } 
         else {
           toast("Verilerin başarılı  bir şekilde içe aktarıldı!");
          isSuccess = true;
          }


         /*const cd = new NormalDistribution(1.20,0.33);
         console.log(cd.cdf(1.23));
         console.log(cd.cdf(0.75));
         console.log(cd.cdf(1.55));
         console.log(cd.cdf(1.27));



         this.setState({
             isOSCC : true
         })*/

    }
    onSubmitCons = (e)=>{
      console.log("Constraits");
        console.log(dcc)
         console.log(dcivr)

         if (dcc.length == 0 || dcivr.length == 0) toast.error("Veriler içe aktarılamadı!!"); 
         else toast("Veriler başarılı  bir şekilde içe aktarıldı!");
         
    }
    handleFileCons = (e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
        // console.log(selectedFile.type);
       
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload=(e)=>{
  
            //parse data
  
         const bstr = e.target.result
         const workBook = XLSX.read(bstr, { type: "binary" })
  
              //get first sheet
        const workSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[workSheetName]
  
         //convert to array
         const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
  
        
         Constraits = fileData[0]
       
         requirementsOfCons = fileData[1]
         
  
          fileData.splice(0, 2)
  
          
          relationsOfCons = fileData
          
          for (let i=0; i< Constraits.length; i++) {
  
            let result = 0;
            for (let j = 0 ; j<requirementsOfCons.length; j++) result += relationsOfCons[j][i];
            
            relationCountCons[i] = result;
          
            
  
          }

          for (let i=0;i<requirementsOfCons.length;i++){
            let result = 0;
            for(let j=0;j<Constraits.length;j++){

              if (relationsOfCons[i][j]) result++;

            }

            reqCountC[i] = result;
          }
  
        
      
         
          } 
       
      }
      else{
        console.log('please select your file');
      }


    }
    handleFile = (e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
          // console.log(selectedFile.type);
         
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e)=>{
    
              //parse data
    
           const bstr = e.target.result
           const workBook = XLSX.read(bstr, { type: "binary" })
    
                //get first sheet
          const workSheetName = workBook.SheetNames[0]
          const workSheet = workBook.Sheets[workSheetName]
    
           //convert to array
           const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
    
          
           objectives = fileData[0]
         
           requirements = fileData[1]
           
    
            fileData.splice(0, 2)
    
            
            relations = fileData
            
            for (let i=0; i< objectives.length; i++) {
    
              let result = 0;
              for (let j = 0 ; j<requirements.length; j++) result += relations[j][i];
              
              relationCount[i] = result;
            
              
    
            }

            
            for (let i=0;i<requirements.length;i++){
              let result = 0;
              
              for(let j=0;j<objectives.length;j++){

                //console.log(relations[i][j]);
                if (relations[i][j]) result++;

              }
               
              reqCountO[i] = result;
            }
    
            
            //console.log(reqCountO);
            //console.log("blabla");
        
           
            } 
         
        }
        else{
          console.log('please select your file');
        }
      }

      handleSubmitCons=(e)=>{
        e.preventDefault();
    
        
       
    
        // Find to DCC-VR
            for(let i=0; i<requirementsOfCons.length; i++ ) {
              let result = 0;
    
              for (let j=0;j<Constraits.length;j++)
                  result +=   Constraits[j] * relationsOfCons[i][j];
              
              dcc[i] = result * requirementsOfCons[i];
            }
            
            /*console.log("dcc");
            console.log(Constraits);
            console.log(relationsOfCons);
            console.log(requirementsOfCons);
            console.log(dcc);*/
    
            // Find the DCI-VC
    
            for(let i=0; i<Constraits.length; i++ ) {
              let result = 0;
    
              for (let j=0;j<requirementsOfCons.length;j++)
                  result +=   requirementsOfCons[j] * relationsOfCons[j][i];
              
              dcivc[i] = result * Constraits[i];
            }
            //console.log(dcivc);
           
    
            // Find the DCI-VR
    
            for (let i=0;i<requirementsOfCons.length;i++) {
              let result = 0;
                   for(let j=0;j<Constraits.length;j++)
                                 result += dcivc[j]*relationsOfCons[i][j]/reqCountC[j];
                      
                   dcivr[i] = result;   
    
            }
            
            //console.log(dcivr);
    
    
    
    
      
    
                       
         
    
      }
      handleSubmit=(e)=>{
        e.preventDefault();
    
    
        // Find to DOC-VR
            for(let i=0; i<requirements.length; i++ ) {
              let result = 0;
    
              for (let j=0;j<objectives.length;j++)
                  result +=   objectives[j] * relations[i][j];
              
              doc[i] = result * requirements[i];
            }
            
    
            // Find the DOS-VO
    
            for(let i=0; i<objectives.length; i++ ) {
              let result = 0;
    
              for (let j=0;j<requirements.length;j++)
                  result +=   requirements[j] * relations[j][i];
              
              dosvo[i] = result * objectives[i];
            }
           
    
            // Find the DOS-VR

         
    
            for (let i=0;i<requirements.length;i++) {
              let result = 0;
                   for(let j=0;j<objectives.length;j++)
                                 result += dosvo[j]*relations[i][j]/reqCountO[j];
                      
                   dosvr[i] = result;   
    
            }
            
    
    
         //OS-CC VALUE  
    
         /*for(let i=0;i<doc.length;i++)
                            oscc[i] = dosvr[i]/doc[i];*/
    
    
    
      }

      
              
        
  
  
      

      initialization=(e)=>{

        console.log("..............................................");
        console.log(Date.now());

        if (!isSuccess) {

          toast.error("Veriler içe aktarılamadığı için sonuçlar çıkarılamıyor!");
          return;

        } 

      

        if (reqCountC && reqCountO) {  this.setState({   regrel : true });  }

        /*console.log("cons and reqs");
        console.log(Constraits);
        console.log(requirementsOfCons);*/
        let divide = [];
         // OS-CC
        for (let i=0; i<requirements.length;i++)   divide[i] = dosvr[i]/ dcc[i];

        console.log(divide);
        const cd = new NormalDistribution(math.mean(divide),math.std(divide));
        
        for (let i=0;i<divide.length;i++) OSCC[i] = cd.cdf(divide[i]);

        console.log("oscc");
        console.log(OSCC);

        //OS-CI 
        for (let i=0; i<requirements.length;i++)   divide[i] = dosvr[i]/ dcivr[i];

        const cd1 = new NormalDistribution(math.mean(divide),math.std(divide));
        
        for (let i=0;i<divide.length;i++) OSCI[i] = cd1.cdf(divide[i]);

        console.log("osci");
        console.log(OSCI);

          //OC-CC 
          for (let i=0; i<requirements.length;i++)   divide[i] = doc[i]/ dcc[i];

          const cd2 = new NormalDistribution(math.mean(divide),math.std(divide));
          
          for (let i=0;i<divide.length;i++) OCCC[i] = cd2.cdf(divide[i]);
  
          console.log("OCCC");
          console.log(OCCC);

             //OC-CI 
             for (let i=0; i<requirements.length;i++)   divide[i] = doc[i]/ dcivr[i];

            const cd3 = new NormalDistribution(math.mean(divide),math.std(divide));
             
             for (let i=0;i<divide.length;i++) OCCI[i] = cd3.cdf(divide[i]);
     
             console.log("OCCI");
             console.log(OCCI);

              
           
              


             this.setState({

              isResults: true
            })


      }

      

     

    
    render() {
        return (

          <div>
            
            {!this.state.isResults ?
            <div className="container">

            {/* upload file section */}
            <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={this.handleSubmit}>
          <label><h5>Requirement and Objectives</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={this.handleFile} required></input>                  
        
        <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}  } onClick={this.onSubmit}>İçe Aktar</button>
        </form>

        <form className='form-group' autoComplete="off"
        onSubmit={this.handleSubmitCons}>
          <label><h5>Requirement and Constraits</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={this.handleFileCons} required></input>                  
        
        <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}  } onClick={this.onSubmitCons}>İçe Aktar</button>
        </form>

        
        <ToastContainer />

      </div>

            
      
            <br></br>
            <hr></hr>
         
          <h5>Başarı Alt Sınır:</h5>
          <input type="text"   onChange={this.GetLow} ></input>
        
          <h5>Başarısızlık üst Sınır:</h5>
          <input type="text" onChange={this.GetHigh}  ></input>
         
         

          <hr></hr>
           
            <button  className='btn btn-success'
          style={{marginTop:5+'px'}  } onClick={this.initialization}>Sonuçları Listele</button>
      

      </div> : null}
            
            

            



{this.state.isResults ?
            <div>

                      <hr/>
               {this.state.regrel ? <ReqRelations o = {reqCountO} c = {reqCountC}></ReqRelations> : null}
              
              {this.state.regrel  ? <Result oscc = {OSCC} title = "OSCC" low = {low} high = {high}></Result> : null}
              {this.state.regrel  ? <Result osci = {OSCI} title = "OSCI" low = {low} high = {high}></Result> : null}
              {this.state.regrel  ? <Result occc = {OCCC} title = "OCCC" low = {low} high = {high}></Result> : null}
              {this.state.regrel  ? <Result occi = {OCCI} title = "OCCI" low = {low} high = {high}></Result> : null}
               
            
            </div> : null}
            
      
         
            </div>               
          
        )
    }
}
