import { AnnouncementCard, TodosCard } from 'components/dashboard/components/Card';
import HorizontalAvatarList from 'components/dashboard/components/HorizontalAvatarList';
import MapWithBubbles from 'components/dashboard/components/MapWithBubbles';
import Page from 'components/dashboard/components/Page';
import ProductMedia from 'components/dashboard/components/ProductMedia';
import SupportTicket from 'components/dashboard/components/SupportTicket';
import UserProgressTable from 'components/dashboard/components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/dashboard/components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'components/dashboard/demos/chartjs';
import AddFolderModal from '../components/added/AddFolderModal'
import FilesComponent from '../components/added/FilesComponent';

import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'components/dashboard/demos/dashboardPage';
import React,{useEffect,useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'components/dashboard/utils/colors';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

// CARD IMPORT
// import Box from '@mui/material/Box';
// // import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// // import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
//CARD IMPORT CLOSE


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);



const DashboardPage = () => {
  // componentDidMount() {
  //   // this is needed, because InfiniteCalendar forces window scroll
  //   window.scrollTo(0, 0);
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showComponent: false,
  //   };
  //   this._onButtonClick = this._onButtonClick.bind(this);
  // }
  const [state,setState] = useState(false);
  const [userData,setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [folderData,setFolderData] = useState([]);
  // const [btn,setBtn] = useState(false);

  // _onButtonClick() {
  //   this.setState({
  //     showComponent: true,
  //   });
  // }
  const onButtonClick = ()=> {
    setState(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(process.env.REACT_APP_API+"folders/")
    .then((res)=>res.json())
    .then((data) => setUserData(data))
    .catch((error)=>console.log(error));

},[]);
    const buttonClicked = (event,data) =>{
      event.preventDefault();
      console.log(data);
      setFolderData(data);
      if(show){
        setShow(false);
      }else {
        setShow(true);
      }
    }

    const showBtn = (event) => {
      event.preventDefault();
      if(show){
        setShow(false);
      }else {
        setShow(true);
      }
    }


    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <>
      { show === true ? 
      <>
      {/* {window.location.href="/dash/files"} */}
      <Button outline color="dark" style={{ width: '65px', marginLeft: '20px', marginRight: '20px'}}  onClick={showBtn} >
                  BACK
      </Button>
      <FilesComponent data={folderData} />
      </> : <> 
      <Page
        className="DashboardPage"
        title="ShortNt Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
     <Row>
        {userData.map((color,index) => (
          <Col key={index}  className="mb-3">
            <Card
              inverse
              className={`border-0 bg-gradient-theme${
                !!color ? '-' : ''
              }${color}`}
              style={{
                height: 200,
                backgroundColor : 'purple',
              }}
            >
              <CardBody className="d-flex flex-column justify-content-start align-items-start">
                <CardTitle>{userData[index].folder_id}</CardTitle>
                <CardText>{userData[index].folder_title}</CardText>
              </CardBody>

              <CardBody className="d-flex justify-content-between align-items-center">
                <CardText>{userData[index].date_of_folder}</CardText>
                {/* <Button outline color="light"   href={"/dash/files"} >
                  OPEN
                </Button> */}
                <Button outline color="light"  onClick={(event)=> {buttonClicked(event,userData[index])}} >
                  OPEN
                </Button>
                {/* {state ?
          //  <FilesComponent id="This" text="This is text" /> 
          <Home id="myhome" />:
           null
               } */}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      </Page>
      <div style={{ display: "flex" }}>
      
    <button
      style={{ marginLeft: "auto" ,
       backgroundColor:"crimson",
       marginTop:'auto',
       marginRight:'10px', 
       borderRadius:'18px',
       position:'fixed',
         bottom:'1%',
         right:'1%',
         height : '50px',
        }}
    >
           <AddFolderModal ></AddFolderModal>

    </button>
    </div>
    </>}
    </>
    );
  }
export default DashboardPage;
