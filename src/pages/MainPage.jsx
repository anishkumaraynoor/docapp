import Header from '../components/Header'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { db } from '../firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function MainPage({setResponse}) {
  const [open, setOpen] = React.useState(false);
  const [o, setO] = React.useState(false);
  const [docum, setDoc] = React.useState({
    name: "", description: ""
  })
  const [documents, setDocuments] = React.useState([])
  const [refresh, setRefresh] = React.useState("")

  const docName = (e) => {
    let { value, name } = e.target
    setDoc({ ...docum, [name]: value })
  }
  const docCollectionRef = collection(db, "documents")
  const createDocument = async () => {
    const result = await addDoc(docCollectionRef, docum)
    setRefresh(result.data)
    hOpen()
    handleClose()
  }

  const deleteDocument = async (id)=>{
    const documentDoc = doc(db, "documents", id)
    await deleteDoc(documentDoc)
    await getDocuments()
  }

  const getDocuments = async () => {
    const data = await getDocs(docCollectionRef)
    setDocuments(data.docs.map((docum) => ({ ...docum.data(), id: docum.id })))
    setRefresh(data)
  }



  React.useEffect(() => {
    getDocuments()
  }, [refresh])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hOpen = () => setO(true);
  const hClose = () => setO(false);
  return (
    <div>

      <Header></Header>

      <div style={{ marginLeft: '50px', marginTop: '50px' }} ><Button onClick={handleOpen} variant="contained">Add a Document</Button></div>
      <Container style={{ marginTop: '50px' }}>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {documents.map((document) => (
              <Grid style={{ marginTop: '15px' }} item xs={12} sm={6} md={4} >
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {document.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {document.description}
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent:'end'}}>
                    <Link to={`/quill/${document.id}`}><Button onClick={setResponse(documents)} size="small"><ArticleIcon /></Button></Link>
                    <Button onClick={()=>deleteDocument(document.id)} size="small"><DeleteIcon /></Button>                 
                  </CardActions>
                </Card>
              </Grid>
            ))

            }

          </Grid>
        </Box>
      </Container>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField name='name' onChange={(e) => docName(e)} id="outlined-basic" label="Document Name" variant="outlined" />
          <br></br>
          <Button onClick={createDocument} variant="contained">Add</Button>
        </Box>
      </Modal>


      <Modal
        open={o}
        onClose={hClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <br></br>
          <Typography style={{color:'#1961bf'}} id="modal-modal-title" variant="h6" component="h2">
     Document Added Successfully
    </Typography>
          <Button onClick={hClose} variant="contained">OK</Button>
        </Box>
      </Modal>

      

    </div>
  )
}

export default MainPage