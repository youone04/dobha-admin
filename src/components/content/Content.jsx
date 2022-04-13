import axios from 'axios';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Login from './login/Login';
import Main from './main/Main';
import Admin from './manage/Admin';
import Products from './manage/Products';
import Iventaris from './manage/Iventaris';
import NavBar from './Navbar';
import './Content.css';
import Articles from './manage/Articles';
import CreateArticle from './manage/create/CreateArticle';
import CreateProduct from './manage/create/CreateProduct';
import CreateAdmin from './manage/create/CreateAdmin';

function Content(props) {
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      // Jika admin tidak login maka diarahin ke halaman login
      navigate('/');
    } else {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      axios.defaults.headers.post['Accept'] = 'application/json';
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    }
  }, [navigate]);

  return (
    <Container className={location.pathname !== '/' ? classNames('content', { 'is-open': props.isOpen }) : null}>
      {location.pathname !== '/' && <NavBar toggle={props.toggle} />}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Main />} />
        <Route exact path="/manage-admin" element={<Admin />} />
        <Route exact path="/create-admin" element={<CreateAdmin />}>
          <Route path=":username" element={<CreateAdmin />} />
        </Route>
        <Route exact path="/manage-products" element={<Products />} />
        <Route exact path="/create-products" element={<CreateProduct />}>
          <Route path=":slug_produk" element={<CreateProduct />} />
        </Route>
        <Route exact path="/manage-article" element={<Articles />} />
        <Route exact path="/create-article" element={<CreateArticle />}>
          <Route path=":slug" element={<CreateArticle />} />
        </Route>
        <Route exact path="/manage-iventaris" element={<Iventaris />} />
      </Routes>
    </Container>
  );
}

export default Content;