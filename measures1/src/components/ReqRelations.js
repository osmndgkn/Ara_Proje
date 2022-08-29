import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
let reqCountO = null ;
let reqCountC = null;
const data = [
    /*{
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },*/
   
  ];


export default class ReqRelations extends PureComponent {

   
  constructor(props) {
      super(props);

     

  }

  on = (e)=>{  
     // console.log(data);
     // console.log(reqCountO.length);
    for (let i=0;i<reqCountO.length;i++) {

       //        console.log(i);
        data.push({
            name: 'R' +  i,
            Objectives:  reqCountO[i],
            Constraits:  reqCountC[i]
        });
    }

  }

 

 
  

  render() {

    
 
     reqCountO = this.props.o;
     reqCountC = this.props.c;

     

    if (data.length<1) this.on();

    console.log(data);
   
   

 

    
    return (

        <div>

            <h1>Requirements relations</h1>
        <ResponsiveContainer width="50%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Objectives" stackId="a" fill="#8884d8" />
          <Bar dataKey="Constraits" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
