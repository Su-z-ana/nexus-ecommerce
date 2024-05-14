import * as Route from '@/constants/routes';
import logo from '@/images/nex.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by
            {' '}
            Team 2
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
          
            <a href="http://192.168.152.1:5175/">ABOUT US</a><br></br>
            <a href="http://192.168.152.1:5174/">CONTACT US</a>
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
