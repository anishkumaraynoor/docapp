import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { db } from '../firebase-config';
import { updateDoc, doc } from 'firebase/firestore'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';




function Quill({response}) {
  const { quill, quillRef } = useQuill();
  const {id} = useParams()
  const [product, setProduct] = useState([])
  const [value, setValue] = useState('')
  
  const updateDouments = async()=>{
    const documentDoc = doc(db, "documents", id)
    const updateDesc = {description: value}
    await updateDoc(documentDoc, updateDesc)
  }



  useEffect(()=>{
    setProduct(response?.find(item=>item.id===id))
  },[])


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setValue(quill.getText())
      });
    }
  }, [quill]);
  
  
  return(
    <div style={{marginTop:'50px'}}>
      <Container>
      <div>
          {product&&<h1>{product.name}</h1>}
      </div>
      
      <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
      <Link to={'/'}><Button variant="contained" onClick={updateDouments} size="small">OK</Button></Link>
      
    </div>
    
      </Container>
      </div>
  )
  
}

export default Quill