import React, {useEffect,Fragment,memo} from 'react'
import { Navbar,Container,Nav} from 'react-bootstrap'
import { Button} from "@mui/material";
import { Link } from 'react-router-dom'
import CustomToggle from '../../../dropdowns'
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../components/logo'
import { useSelector } from 'react-redux';
import * as SettingSelector from '../../../../store/setting/selectors'



import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'



const Header = memo((props) => {


    const navigate=useNavigate()
    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const headerNavbar = useSelector(SettingSelector.header_navbar)



    const handleLogout = () => {

        Cookies.remove("userEmail");
        navigate('/');
        window.location.reload(true);
      };



    useEffect(() => {
        // navbarstylemode
        if (headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass') {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add('menu-sticky')
                } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                }
            }
        }

 })




   const minisidebar =() =>{
       document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
   }

   
    return (
        <Fragment>
            <Navbar expand="lg" variant="light" className={`nav iq-navbar ${headerNavbar} ${navbarHide.join(" ")}`} style={{backgroundColor:'#0E2954'}}>
                <Container fluid className="navbar-inner">
                    <Link to="/dashboard" className="navbar-brand">
                        <Logo color={true} />
                        <h4 className="logo-title">BT Billing32323</h4>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon">
                            <svg width="20px" height="30px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>
                   
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="mt-2 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse  id="navbarSupportedContent">
                        <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0 align-items-center">
                      

                          <Button
                  variant="link"
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  style={{color:'white'}}
                >
                  Logout
                </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
})

export default Header
  