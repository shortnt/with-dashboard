import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Media from 'reactstrap/lib/Media';
import Page from 'components/dashboard/components/Page';
import { BorderColor, LocalConvenienceStoreOutlined } from '@material-ui/icons';
import './AddFileModal';
import AddFileModal from './AddFileModal';
import AddFolderModal from './AddFolderModal'
import Add from '@material-ui/icons/Add';
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ReactModalAdapter from "./ReactModalAdapter";
import propTypes from "components/dashboard/utils/propTypes";
import { conditionallyUpdateScrollbar } from "reactstrap/lib/utils";
import '../../../../styles/globalStyles.css';

const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-blue-500 text-gray-100 hocus:bg-blue-700 focus:shadow-outline focus:outline-none transition duration-300`;

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;


const useStyles = makeStyles({
  root: {
    borderStyle:"solid",
    BorderColor:'red',
    margin:5,
    marginLeft:30,
    marginRight:30,    
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    '@media (max-width: 500px)': {
     backgroundColor:'green',
     flexDirection:'column',
     marginLeft:'10px',
     marginRight:'10px',
    },
    // alignItems: 'center',
  
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',

    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const inputs = [
  {
    value: 'Audio',
    label: 'Audio',
  },
  {
    value: 'Text',
    label: 'Text',
  },

];



const FilesComponent = (props) => {

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [input, setInput] = React.useState('');
  // const [inputText,setInputText] = useState('');
  // const [showText, setShowText] = useState('');
  // const [audioSrc, setAudioSrc] = useState("");

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [inputText,setInputText] = useState('');
  const [showText, setShowText] = useState('');
  const [audioSrc, setAudioSrc] = useState("");
 

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const audioInput = (event) => {
    setAudioSrc(event.target.value);
  };

  const textChange = (event) => {
    setInputText(event.target.value);
  };


  const handleOpen = () => {
    console.log(open);
    setOpen(true);
    console.log("Modal should be visible ");
  }
  const handleClose = () => setOpen(false);


  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const getSummary = (event) => {
    event.preventDefault();
      console.log("11111111")
        fetch(process.env.REACT_APP_API+'quicksummary/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
                Input:inputText,
                // Output:event.target.Output.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            fetch(process.env.REACT_APP_API+'quicksummary/')
            .then((res) => res.json())
            .then((data) => {
            fetch(process.env.REACT_APP_API+'quicksummary/' + data.length)
          .then((res)=>res.json())
          .then((data) => setShowText(data.Output))
          .catch((error)=>console.log(error));
            })
            .catch((error) => console.log(error));
        },
        (error)=>{
            alert(error);
        })
    // setShowText(inputText)
    console.log(inputText);

  }
  
console.log(props.data);


  return (
    <>
    <h1>{props.data.folder_title}</h1>
          <Page
        className="DashboardPage"
        title="ShortNt Dashboard"
        breadcrumbs={[{ name: 'Dashboard / Files', active: true }]}
      >

<div style={{ display: "flex" }}>



{/* <button 
  style={{ padding: "5px", marginLeft: "auto" ,marginTop:'auto',marginRight:'30px', borderRadius:'',backgroundColor:"yellow",position:'fixed',
   bottom:'1%',right:'1%'}}
   
>
      <AddFileModal/>
</button>  */}
<button 
  style={{ padding: "5px", marginLeft: "auto" ,marginTop:'auto',marginRight:'30px', borderRadius:'',backgroundColor:"yellow",position:'fixed',
   bottom:'1%',right:'1%'}}
   onClick={handleOpen}
>Add File </button>
</div>


      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // closeButton
        
      >
        <Box sx={style} className="box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select the Input Type
          </Typography>
          <br></br>
          <TextField
          id="standard-select-currency"
          select
          // label="Select Input Type"
          value={input}
          onChange={handleChange}
          className="format"
          variant="standard"
          // helperText="Please select your input format"
        >
          {inputs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <br></br>
        <div>
          {input === ''? <Typography variant="h6" component="h4">
             No input format is selected
          </Typography>: input === 'Audio'?           <Typography variant="h6" component="h4">
            You have selected {input} as Input format
          </Typography>:          <Typography variant="h6" component="h4">
            You have selected {input} as Input format
          </Typography>}
        </div>
        <br></br>
        <div>
          {input === ''?null: input === 'Text'?
          <>
          <div className="parent">
            <div className="child1">
           <textarea className="intext" value={inputText} onChange={textChange} placeholder="Type/Paste the text here....."></textarea>
            </div>
            <div className="child2">
            <textarea className="intext" value={showText} placeholder="Summary....."></textarea>
            </div>
           </div>
           <br></br>
           <PrimaryButton as="button" onClick={getSummary}>Get Summary</PrimaryButton>
           <br></br>
           {inputText === ''?null:
           
           <>
           
           <br></br>
           {/* <Typography variant="h6" component="h5">
             Summary : 
             </Typography>
             <p>{showText}</p> */}
           </>
           }
           </>
           :<>
           <input type="file" accept="audio/*" onChange={audioInput} />
           {/* <input onChange={handleFileSelected} type="File" /> */}
           <br></br>
           <br></br>
           {/* <ReactAudioPlayer
              src="Kalimba.mp3"
              autoPlay
              controls
            /> */}
           <PrimaryButton as="button" onClick={getSummary}>Get Summary</PrimaryButton>
           <br></br>
           
           </>}
        </div>


        </Box>
      </Modal>
        <StyledModal
          closeTimeoutMS={300}
          className="mainHeroModal"
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <CloseModalButton onClick={toggleModal}>
            <CloseIcon tw="w-6 h-6" />
          </CloseModalButton>
        </StyledModal>






    {['top',''].map((color, index) => (
      <Card className={classes.root} key={index}> 
      <CardContent>

        <Typography variant="h5" component="h2" style={{}}>
          Datekkkkkkkkkkkk
        </Typography>
 
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="h2" style={{}}> 
          Nameoooooooooo
        </Typography>
      </CardContent>
      <CardActions  style={{}}>
        <Button size="small" style={{backgroundColor:'green'}}>Open</Button>
      </CardActions>
    </Card>
    ))}

      
</Page>
      
   </>
  );
}

export default FilesComponent;