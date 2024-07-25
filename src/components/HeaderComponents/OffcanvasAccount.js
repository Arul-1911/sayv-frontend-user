import React, { useState } from 'react'
import { Accordion, Button, Col, Image, Offcanvas, Row } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu'
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import DataSharing from '../../pages/DataSharing/DataSharing';
import FinancialPassport from './FinancialPassport';
import BucketCategory from './Bucket&Category';
import DashboardSettings from './DashboardSettings';

function OffcanvasAccount({show,handleClose}) {

  const [datasharingShow,setDatasharingShow] = useState(false);
  const [dataActiveLink,setDataActiveLink] = useState(1)
  const [financialReportShow,setFinancialReportShow] = useState(false);
  const [financialReportActiveLink,setfinancialReportActiveLink] = useState(1)
  const [bucketCategoryShow,setBucketCategoryShow] = useState(false);
  const [bucketCategoryActiveLink,setBucketCategoryActiveLink] = useState(1)
  const [dashboardSettingsShow,setDashboardSettingsShow] = useState(false);
  const [dashboardSettingsActiveLink,setDashboardSettingsActiveLink] = useState(1)


  const handleShowDataSharing = ()=>{
     setDatasharingShow(true);
     handleClose();
  }

  const handleShowFinancialReport = ()=>{
     setFinancialReportShow(true);
     handleClose();
  }
  const handleShowBucketCategory = ()=>{
     setBucketCategoryShow(true);
     handleClose();
  }
  const handleShowDashboardSettings = ()=>{
     setDashboardSettingsShow(true);
     handleClose();
  }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("bankToken");
        localStorage.removeItem("user");
        navigate("/");
        handleClose();
      };

      

const accordionItems = [
    {
      header: "Account",
      body: [
        { onClick: handleShowDataSharing, label: "Data Sharing" },
        { path: "/user/subscription", label: "Subscription Plans" },
      ],
    },
    {
      header: "Reports",
      body: [
        { onClick: handleShowFinancialReport, label: "Financial Passport" },
      ],
    },
    {
      header: "Help & Legal",
      body: [
        { path: "/help", label: "Help" },
      ],
    },
    {
      header: "App Settings",
      body: [
        { onClick: handleShowDashboardSettings, label: "Dashboard Settings" },
        { onClick: handleShowBucketCategory, label: "Bucket & Category" },
        { path: "/", label: "Security" },
        { path: "/", label: "Notifications" },
        { path: "/", label: "About" },
        { path: "/", label: "Delete Account" },
       
      ],
    },
  ];
  

  return (
    <>
    
    <Offcanvas  placement='end'  show={show} onHide={handleClose}>
        
        <Offcanvas.Body className='main-offcanvas-body p-0' style={{overflowX:'hidden'}}>
            <div className='bg-white' style={{position:'sticky',top:0,zIndex:99,height:'155px'}}>
              <Row>
                <Col className='px-4 pt-2'>
        <IoArrowBackCircleOutline color='rgba(92, 182, 249, 1)' className='text-start' style={{cursor:'pointer'}} size={35} onClick={handleClose}/>
                
                </Col>
              </Row>
               <Row>
                <Col className='text-center'>
                <FaUserCircle
                    size={70}
                    // cursor={"pointer"}
                    color="rgba(92, 182, 249, 1)"
                  />
          <h5 style={{color:'var(--primary-color)'}}>Jane Doe</h5>
                </Col>
           </Row>
            </div>

            <div className='' style={{overflowY:'auto',height:'calc(100vh - 95px - 160px)'}}>
      
          <Accordion alwaysOpen className='border-0 '>
      

 {accordionItems?.map((item,index)=>(
    <Accordion.Item eventKey={index} className='border-0'>
        <Accordion.Header className='border-0' style={{backgroundColor:'#E2F2FF'}}><span style={{color:'#004AAD',fontWeight:'600'}}>{item?.header}</span></Accordion.Header>
        <Accordion.Body className=' border-0 py-0'>
            {item?.body?.map((link,i)=>(

         <p className='my-0 py-1' style={{borderBottom:'1px solid #E2F2FF',fontWeight:'500'}}><Link to={link?.path} onClick={link?.onClick} className='' style={{color:'#374957'}}>{link?.label}</Link></p>
            ))}

        </Accordion.Body>
      </Accordion.Item>
 ))}

      
      </Accordion>
      </div>

<Row style={{position:'sticky',bottom:0,height:'95px'}} className='bg-white mx-1'>
    <Row>
    <Col>
    <Button onClick={handleLogout}  variant='transparent' style={{fontWeight:600,color:'rgba(92, 182, 249, 1)'}} className='p-0'><LuLogOut className='ms-1 me-2 mb-1' />
    Logout</Button>
    </Col>
    </Row>
    <Row>
        <Col className='d-flex align-items-center' sm={8}>
        <Image src='/icons/offcanvas-logo.png' style={{height:'60px',width:'68px'}}/>
        <h6 className='text-center' style={{color:'rgba(74, 86, 226, 1)',fontSize:'0.85rem'}}>Personal Finance Management</h6>
        </Col>
        <Col className='d-flex align-items-end justify-content-end p-0'>
        <Link className=' ' to={'privacy-policy'} style={{color:'rgba(74, 86, 226, 1)'}}><u>Privacy Policy</u></Link>

        </Col>
    </Row>

    
</Row>
    

        </Offcanvas.Body>
        
      </Offcanvas>
      
        <DataSharing show={datasharingShow} hide={setDatasharingShow}  active={dataActiveLink} activeLink={setDataActiveLink}/>
        <FinancialPassport show={financialReportShow} hide={setFinancialReportShow}  active={financialReportActiveLink} activeLink={setfinancialReportActiveLink}/>
        <BucketCategory show={bucketCategoryShow} hide={setBucketCategoryShow}  active={bucketCategoryActiveLink} activeLink={setBucketCategoryActiveLink}/>
        <DashboardSettings show={dashboardSettingsShow} hide={setDashboardSettingsShow}  active={dashboardSettingsActiveLink} activeLink={setDashboardSettingsActiveLink}/>
    </>

  )
}

export default OffcanvasAccount