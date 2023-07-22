import Grid from "@mui/material/Grid";
import React,{useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ReviewDelete from '../../UserProfile/reviewDeleteModal';
import ReviewUpdate from './revieweditModal';

var userName=[];
  var businessName=[];
var reviews=[];
var rates=[];
var createdAt=[];
var lengths;
var reviewId=[];
axios.get('http://localhost:5000/api/reviews/getByUser')

.catch(error => {
        console.log(error.response)
      }).then(response => {
          lengths=response.data.length;
          for(var i=0;i<response.data.length;i++){

                  reviewId.push(response.data[i]._id)
                  userName.push(response.data[i].userId.name);
                  businessName.push(response.data[i].businessId.name);
                  reviews.push(response.data[i].review);
                  rates.push(response.data[i].rate);
                  createdAt.push(response.data[i].createdAt);
              }
          
        
        
      })



function ReviewList(){
  const [isModal,setModal]=useState(false);
  const [revId,setReviewId]=useState(null);
  const [isEditModal,setEditModal]=useState(false);
    return(
       <>
       <ReviewUpdate show={isEditModal} closeModal={() => setEditModal(false)} reviewId={revId}/>
<ReviewDelete show={isModal} closeModal={() => setModal(false)} reviewId={revId}/>
      <Grid container sx={{ gap: 5 }}>
        <Grid item xs={8} md={5} lg={10} style={{ margin: "auto" }}>
             <div style={{paddingTop:"5%"}}>
      <Table striped bordered hover>
  <thead>
  <tr style={{textAlign:"center"}}>
    <th colSpan="11">REVIEWS</th>
  </tr>
    <tr>
      <th>#</th>
      <th>User Name</th>
      <th>Business Name</th>
      <th>Review</th>
      <th>Rate out of 5</th>
      <th>Date & Time</th>
        <th style={{color:"blue"}}>Action</th>
    </tr>
  </thead>
  <tbody>
  {Array.from({ length: lengths }).map((_, index) => (
    <tr>
     
    <td>{index}</td>
    <td key={index}>{userName[index]}</td>
        <td key={index}>{businessName[index]}</td>
        <td key={index}> {reviews[index]}</td>
          <td key={index}> {rates[index]}</td>
             <td key={index}> {createdAt[index]}</td>
             
                    <td  >   <img  onClick={() => {setReviewId(reviewId[index]); setEditModal(true);}} className="btn" style={{pointer:"cursor",width:"60px"}} src="https://img.icons8.com/ios/50/000000/edit--v1.png" alt="edit"/>&nbsp;&nbsp;<img onClick={() => {setReviewId(reviewId[index]); setModal(true);}} style={{pointer:"cursor",width:"60px"}} src="https://img.icons8.com/flat-round/64/000000/delete-sign.png" alt="delete"/>
                </td>
        </tr>
      ))}

      

   
   
  </tbody>
</Table>
    
 </div>
        </Grid>
        
      </Grid>
    </>  
    )
}

export default ReviewList;