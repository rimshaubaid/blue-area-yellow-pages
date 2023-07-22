import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';



function Footer(){
    return(
        <div className="container-fluid" id="footer-con" style={{background:"white"}}>
        <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to={"/"}>
        Blue Area Yellow Pages
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </div>
    )
}

export default Footer;