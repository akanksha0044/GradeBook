import React from 'react'
import "./sidebar.css";
import {Notes,AccountCircle, CastForEducation, AutoStories, Groups,Attractions} from "@mui/icons-material";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Sidebar() {
  //for download button
const handleDownload = () => {
  const input = document.documentElement;
  html2canvas(input, { scrollY: -window.scrollY})
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    });
};
  return (
    
      <div className='sidebar'>
      <div className='sideWrapper'>
        <ul className='sideList'>
          <li className='sideListItem'>
          <CastForEducation className='sideIcon'/>
          <span className='sideText'>University-LPU</span>
          </li>

          <li className='sideListItem'>
          <AccountCircle className='sideIcon'/>
          <span className='sideText'>Professor’s name</span>
          </li>

          <li className='sideListItem'>
          <Attractions className='sideIcon'/>
          <span className='sideText'>Department-CSE</span>
          </li>

          <li className='sideListItem'>
          <AutoStories className='sideIcon'/>
          <span className='sideText'>Title-Frontend</span>
          </li>

          <li className='sideListItem'>
          <Groups className='sideIcon'/>
          <span className='sideText'>Group</span>
          </li>
            
          <button className='sideButton' onClick={handleDownload}>Download</button>
        <hr className='sideHr'/>
          </ul>
          

          </div>
    </div>
  )
}

export default Sidebar
