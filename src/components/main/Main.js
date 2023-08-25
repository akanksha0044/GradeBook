import React from 'react'
import "./main.css";
import {Posts} from "../../dummyData"
import {Search,Eject} from "@mui/icons-material";
import { useState } from "react";


function Main() {
  let numStudents = Posts.length+1;
  let sum=0;
  Posts.map((row) => (

   sum=sum+(0.4*row.rating_grade+0.6*row.exam_grade)
   
  )
  )
  const avg=Math.round(sum/numStudents);
  let maxi = 0;
 Posts.map((row, index) => {
  const curr_max = 0.4 * row.rating_grade + 0.6* row.exam_grade;
  maxi = Math.max(maxi, curr_max)
  return curr_max;
  
});
let mini = Number.MAX_SAFE_INTEGER;
Posts.map((row) => {
const curr_min = 0.4 * row.rating_grade + 0.6 * row.exam_grade;
mini = Math.min(mini, curr_min);
return curr_min;
});
let firstFianl=0;
Posts.filter((row) => {
  if((0.4 * row.rating_grade + 0.6 * row.exam_grade)<5){
    firstFianl++;
  }
  return firstFianl;
  });
  let last=0;
Posts.filter((row) => {
  if(((0.4 * row.rating_grade + 0.6 * row.exam_grade)>=5) && ((0.4 * row.rating_grade + 0.6 * row.exam_grade)<7)){
    last++;
  }
  return firstFianl;
  });
  let above=0;
Posts.filter((row) => {
  if((0.4 * row.rating_grade + 0.6 * row.exam_grade)>7){
    above++;
  }
  return above;
  });

  
  const [searchData,setSearchData]=useState(Posts);

const showDetails = (searchData) => {
  const details = `<h3>Details</h3>ID: ${searchData.no}<br> Name: ${searchData.name}<br>Ticket Number: ${searchData.ticket_number}<br>Rating Grade: ${searchData.rating_grade}<br>Exam Grade: ${searchData.exam_grade}<br>Final Grade: ${(0.6 * searchData.exam_grade + 0.4 * searchData.rating_grade)}<br>Status: ${(0.6 * searchData.exam_grade + 0.4 * searchData.rating_grade) > 4 ? "passed" : "failed"}<br>`;
  
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('button');
  closeButton.innerHTML = 'Close';
  closeButton.classList.add('close-button');

  modalContent.innerHTML = details;
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
};

  

  // const [searchData,setSearchData]=useState(Posts);
   const [sortOrder, setSortOrder] = useState("asc");
   const[show,setShow]=useState(false);
   const [finalGradeSortOrder, setFinalGradeSortOrder] = useState("asc");
   const [filterStatus, setFilterStatus] = useState("all");
   
   const [selectedRows, setSelectedRows] = useState([]);


  
  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };
  
  // searchData.map((aaa)=>{
  //   console.log(aaa.exam_grade)
  // })

   
   //sorting by name
   const handleSort = () => {
    const sortedData = [...searchData].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : -1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? 1
        : -1
    );
    setSearchData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  //sorting by finalGrade
  const handleSort1 = () => {
    const sortedData = [...searchData].sort((a, b) =>
      finalGradeSortOrder === "asc"
        ? a.rating_grade + a.exam_grade - (b.rating_grade + b.exam_grade)
        : b.rating_grade + b.exam_grade - (a.rating_grade + a.exam_grade)
    );
    setSearchData(sortedData);
    setFinalGradeSortOrder(finalGradeSortOrder === "asc" ? "desc" : "asc");
  };
//SearchBar
const handleSearch=(event)=>{
  const searchWord=event.target.value;
  //console.log(searchWord+"input word");
  const newFilter=Posts.filter((value)=>{
  return value.name.toLowerCase().includes(searchWord);
  
  });
  
  setSearchData(newFilter);
  
}
//for passed and falied
const handleFilter = (status) => {
  setFilterStatus(status);
  if (status === "passed") {
     const newFilter = Posts.filter((value) => (0.4*value.rating_grade + 0.6*value.exam_grade) > 4);
     setSearchData(newFilter);
  } else if (status === "failed") {
     const newFilter = Posts.filter((value) => (0.4*value.rating_grade + 0.6*value.exam_grade) <= 4);
     setSearchData(newFilter);
  } else {
     setSearchData(Posts);
  }
};


  
      
  return (
    
    <div className='main'>
      <div className='btn'>
        <button  onClick={() => handleFilter("All")} className='btns'>All</button>
        <button onClick={() => handleFilter("passed")} className='btns'>Passed</button>

        <button  onClick={() => handleFilter("failed")}className='btns'>Failed</button>
        
         <button onClick={handleSort}  className={`btns ${sortOrder === "desc" ? "colorchange" : ""}`} >A-Z<Eject className={`eject ${sortOrder === "desc" ? "desc" : ""}`} /></button>
        <button onClick={handleSort1} className={`btns ${finalGradeSortOrder === "desc" ? "colorchange" : ""}`}>1-10<Eject className={`eject ${finalGradeSortOrder === "desc" ? "desc" : ""}`} /></button>
        <Search className='searchIcon'/>
          <input placeholder='search by name' className='search' type='text' 
          onChange={handleSearch}
          
          
          />
         
          
        

      </div>
      
      
      <table>
      <thead>
        <tr className='tr1'>
        <th>No</th>
        <th  >Name</th>
          <th>ticket’s number</th>
          <th>Rating grade</th>
          <th>Exam grade</th>
          <th>Final grade</th>
          <th>Status</th>
          <th>Details</th>
          
        </tr>
      </thead>
      <tbody>
        {searchData.map((row, index) => (
          
          <tr key={index}
          onClick={() => handleRowClick(index)}
    style={{
      backgroundColor: selectedRows.includes(index) ? 'yellow' : 'white',
      textTransform: selectedRows.includes(index) ? 'uppercase' : 'none',
    }}
          >
           
            <td>{row.no}</td>
            <td >{row.name}</td>
            <td>{row.ticket_number}</td>
            <td>{row.rating_grade}</td>
            <td>{row.exam_grade}</td>
            <td>{(0.4*row.rating_grade+0.6*row.exam_grade)}</td>
            <td>{0.4*row.rating_grade + 0.6*row.exam_grade > 4 ? "passed" : "failed"}</td>
            <td><button id='btn1' onClick={(event) => {
                event.stopPropagation();
                showDetails(row);
                // console.log("shooow",showDetails);
              }}>Details</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    
          
    <button onClick={()=>setShow(!show)} className='Static'>Show Statistics</button>
    {
      show && <div className='staticBlock'>
      <table className='tb2' >

        <thead>
       <tr className='tr1'>
       <th>Status</th>
        <th>Count</th>
       
     </tr>
      </thead>
      <tr>
       <td>All Student</td>
       <td>{numStudents}</td>
       </tr>
       <tr>
       <td>Average of All</td>
       <td>{avg}</td>
       </tr>
       <tr>
       <td>Max Of All</td>
       <td>{maxi}</td>
       </tr>
       <tr>
       <td>Min Of All</td>
       <td>{mini}</td>
       </tr>
       
       <tr>
       <td>Final-Grade 0-5</td>
       <td>{firstFianl}</td>
       </tr>
       <tr>
       <td>Final-Grade 5-7</td>
       <td>{last}</td>
       </tr>
       <tr>
       <td>Final-Grade above 7</td>
       <td>{above}</td>
       </tr>
       
       

  </table>
 </div>
 

    }

    
    
    </div>
  )
}

export default Main










// style={{
//   backgroundColor: selectedRowIndex === index ? "yellow" : "white",
// }}
// onClick={() => handleRowClick(index)}


//style={{ textTransform: selectedRowIndex === index && "uppercase" }}