import React, { Component } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { LOG10E } from 'mathjs';





let example = [1.23 , 0.75 , 1.55 , 1.27]
const colors = scaleOrdinal(schemeCategory10).range();
let datas = [];
let results = [];
let resultColours = [];


export default class result extends Component {
   

    constructor(props) {
        super(props);
    }
   

    on = (e)=>{  
        //console.log("resultslenght:" );
      //low = {low} high = {high}
        //console.log("on on");
        //console.log(this.props.low);
        //console.log(this.props.high);
       // console.log("--------------------");
       // console.log(this.props.high);
      for (let i=0;i<results.length;i++) {

        
        console.log(results[i]);
        

        console.log(results[i] - 32);
            if (results[i] < this.props.high/100) {resultColours[i] = 3;}
            if (results[i] > this.props.high/100 && this.props.low/100) {resultColours[i] = 8;}
            if(results[i]> this.props.low/100) {resultColours[i] = 2;}

            let c = (results[i]*100).toFixed(0);

            //console.log(c);
            //console.log(results[i]);

                
          datas.push({ x : 'R' +  i,   y : c , z: 0.3  });
      }

      console.log("result colours");
      console.log(resultColours);
      console.log(Date.now());
     
  
    }
   

    render() {

      const title = this.props.title;
         
      switch(title) {
          
        case "OSCC" : results = this.props.oscc; break;
        case "OSCI" : results = this.props.osci; break;
        case "OCCC" : results = this.props.occc; break; 
        case "OCCI" : results = this.props.occi; break;
 

      }


        
        
        console.log("in result");
          console.log(title);
        
      //  console.log(results);

      datas = [];
         this.on();

       
        //console.log(datas);

       
         

        return (
            <div>
                 <label><h5>{title}</h5></label>

                 <ResponsiveContainer width="100%" aspect={3}>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis  dataKey="x" name = "Requeriment" />
          <YAxis type="number" dataKey="y" name="Success Probality" unit="%" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={datas} fill="#8884d8">
            {datas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[resultColours[index]]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

                
            </div>
        )
    }
}
