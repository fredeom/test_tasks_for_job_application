import { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import CreateIcon from '@material-ui/icons/Create';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import cx from 'classnames';

import {Rectangle1, Image3, Line3, /*Vector, */Frame19Image3, Line11, Frame29NameIcon} from './Drawings'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePhone(phone) {
  const m = phone.match(/\d/g);
  return m && m.length === 10;
}

export default function Home() {
  const [isEditingOpen, setEditingOpen] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [open, setOpen] = useState(0);
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setName(localStorage.getItem("name"));
      setEmail(window && window.localStorage ? localStorage.getItem("email") : null);
      setPhone(window && window.localStorage ? localStorage.getItem("phone") : null);
    }
  });

  const handleInput = (textFieldName) => (e) => {
    const value = e.target.value;
    switch (textFieldName) {
      case "name": {setName(value); setNameError(!value || value.length < 2 ? "Вы не верно указали имя" : null); break;};
      case "email": {setEmail(value); setEmailError(!validateEmail(value) ? "Вы не верно указали email" : null); break;};
      case "phone": {setPhone(value); setPhoneError(!validatePhone(value) ? "Вы не верно указали телефон" : null); break;};
    }
  };

  const saveToStorage = (e) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    const url = encodeURI('http://' + location.host + '/api/user/save' + "?name=" + name + "&email=" + email + "&phone=" + phone);
    fetch(url).then(res => {
      if (res.status === 200) {
        setOpen(2);
        res.json().then(data => console.log(data));
      }
    }).catch(error => alert(error));
  }

  const isMobileAndAffirmation = open == 2 && window.screen.width < 600;

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Test Task</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Rectangle1 />
      <div className="container">
        <div className="headerDiv">
          <NotificationsNoneIcon style={{color: "white", fontSize: "40px", marginRight: "20px"}}/><Line3/><Image3/>
          <div className="headerDivNameInline">
            <div className="headerDivNameTable">
              <div className="headerName">Иванова А.</div>
            </div>
          </div>
        </div>
        <div className="mainDiv">
          <p className="personProfile"><h3>ЛИЧНЫЙ ПРОФИЛЬ</h3></p>
          <p><span className="personProfileTitle">Главная/Личный профиль</span></p>
          <div className="personCard">
            <div>
              <Frame19Image3 />
              <div className="personCardNameInline">
                <div className="personCardNameTable">
                  <h1 className="personCardName">Иванова Анна Михайловна</h1>
                </div>
              </div>
            </div>
            <div>
              <h2 className="personCardEdit" onClick={() => setEditingOpen(!isEditingOpen)}>
                {isEditingOpen ?
                  <><span className="personCardEditButton">Закрыть</span>{" "}<CloseIcon style={{verticalAlign: "sub"}}/></> :
                  <><span className="personCardEditButton">Редактировать</span>{" "}<CreateIcon style={{verticalAlign: "sub"}}/></>}
              </h2>
            </div>
          </div>
          <div className="personAttributeList">
            {isEditingOpen ?
              <div className="personEditingView">
                <form className="personEditingViewForm">
                  <span>
                    <Frame29NameIcon />
                    <TextField
                      error={nameError}
                      label="Фамилия и Имя"
                      placeholder="Укажите ваши фамилию и имя"
                      value={name}
                      onChange={handleInput("name")}
                      helperText={nameError ? nameError : undefined}
                      variant="outlined"
                    />
                  </span>
                  <Line11 />
                  <span>
                    <span className="hideForMobile"><AlternateEmailIcon style={{marginRight: "10px", marginTop: "20px", color: "#00BFA5"}} /></span>
                    <TextField
                      error={emailError}
                      label="E-mail"
                      placeholder="Укажите ваш email"
                      value={email}
                      onChange={handleInput("email")}
                      helperText={emailError ? emailError : undefined}
                      variant="outlined"
                    />
                  </span>
                  <Line11 />
                  <span>
                    <span className="hideForMobile"><PhoneIcon style={{marginRight: "10px", marginTop: "20px", color: "#00BFA5"}} /></span>
                    <TextField
                      error={phoneError}
                      label="Номер телефона"
                      placeholder="Укажите номер телефона"
                      value={phone}
                      onChange={handleInput("phone")}
                      helperText={phoneError ? phoneError : undefined}
                      variant="outlined"
                    />
                  </span>
                </form>
                <div className="personEditingViewButton" onClick={() => setOpen(1)}><span className="personEditingViewButtonText">Сохранить изменения</span></div>
              </div> :
              <>
                <Accordion expanded={false}><AccordionSummary><AlternateEmailIcon style={{marginRight: "20px", color: "#00BFA5"}} />ivanova@mail.ru</AccordionSummary></Accordion>
                <Accordion expanded={false}><AccordionSummary><PhoneIcon style={{marginRight: "20px", color: "#00BFA5"}} />Укажите номер телефона</AccordionSummary></Accordion>
              </>}
          </div>
          <Modal open={open > 0} onClose={() => setOpen(0)}>
            <div className={cx("modalBody", {"modalBodyAffirmation" : isMobileAndAffirmation})}>
              {open == 1 && <CloseIcon onClick={() => setOpen(0)} style={{alignSelf: "flex-end", marginTop: "28px", marginRight: "29px", color: "#828282", cursor: "pointer"}}/>}
              {open == 1 && <div className="modalBodyQuestionText">Сохранить изменения?</div>}
              {open == 2 && <div className="modalBodyAffirmationText">Данные успешно сохранены</div>}
              {open == 1 && <div className="modalBodySave" onClick={saveToStorage}>Сохранить</div>}
              {open == 1 && <div className="modalBodyNotSave" onClick={() => setOpen(0)}>Не сохранять</div>}
              {open == 2 && <div className="modalBodySaveGood" onClick={() => setOpen(0)}>Хорошо</div>}
            </div>
          </Modal>
        </div>
        <style jsx>
        {`
          .container {
            min-height: 100vh;
            padding: 0 ;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          
          .headerDiv {
            position: absolute;
            margin-right: 50px;
            top: 20px;
            align-self: flex-end;
          }
          
          .headerDivNameInline {
            display: inline-block;
          }
          
          .headerDivNameTable {
            display: table;
            height: 40px;
            overflow: hidden;
          }

          .headerName {
            display: table-cell;
            white-space: nowrap;
            color: white;
            font-weight: 400;
            vertical-align: middle;
          }

          .mainDiv {
            width: calc(100% - 60px);
          }

          .personProfile {
            color: white;
            margin-top: 77px;            
          }

          .personProfileTitle {
            color: white;
          }

          .personCard {
            display: flex;
            justify-content: space-between;

            height: 128px;
            left: 0%;
            right: -0.08%;
            
            background: linear-gradient(270deg, #1A78C2 0%, #1A78C2 101.06%);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
            border-radius: 10px;
          }

          .personCardNameInline {
            display: inline-block;
          }

          .personCardNameTable {
            display: table;
            height: 80px;
            overflow: hidden;
          }
          
          .personCardName {
            display: table-cell;
            white-space; nowrap;
            color: white;
            font-weight: 800;
            vertical-align: middle;
          }

          .personCardEdit {
            color: white;
            margin: 54px 54px 55px 0px;
            cursor: pointer;
          }

          .personAttributeList {
            margin-top: 24px;
            left: 0%;
            right: -0.08%;
            
            background: #FFFFFF;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
            border-radius: 10px;
          }

          .personEditingView {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          
          .personEditingViewForm {
            margin: 20px 20px;
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
          }

          .personEditingViewButton {
            margin-bottom: 20px;
            background: #01BDA7;
            border-radius: 36px;
            width: 212px;
            height: 49px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .personEditingViewButtonText {
            color: white;
            cursor: pointer;
          }

          .modalBody {
            position: absolute;
            width: 600px;
            height: 318px;
            left: 383px;
            top: 220px;

            background: #FFFFFF;
            border-radius: 10px;
            
            display: flex;
            flex-flow: column wrap;
            justify-content: space-between;
            align-items: center;
          }

          .modalBodyQuestionText {
            font-family: Open Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 33px;
            color: rgba(49, 49, 49, 0.7);
          }

          .modalBodyAffirmationText {
            margin-top: 100px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 33px;
            color: rgba(49, 49, 49, 0.7);
          }

          .modalBodySave {
            color: white;
            width: 202px;
            height: 50px;
            background: #01BDA7;
            border-radius: 41px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          
          .modalBodySaveGood {
            margin-bottom: 100px;
            color: white;
            width: 202px;
            height: 50px;
            background: #01BDA7;
            border-radius: 41px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .modalBodyNotSave {
            margin-bottom: 56px;
            color: #00BFA5;
            width: 202px;
            height: 50px;
            background: #FFFFFF;
            border: 1px solid #00BFA5;
            border-radius: 41px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          @media (max-width: 600px) {
            .headerDivNameInline {
              display: none;
            }
            .headerDiv {
              margin-right: 0px;
            }
            .personCard {
              height: 60px;
            }
            .personCardEdit {
              margin: 15px 10px 10px 0px;
            }
            .personCardEditButton {
              display: none;
            }
            .personCardNameTable {
              height: 40px;
            }
            .personCardName {
              font-size: 14px;
              font-weight: 400;
            }
            .personEditingViewForm {
              flex-flow: column wrap;
              height: 220px;
            }
            .hideForMobile {
              display: none;
            }
            .modalBody {
              width: 100%;
              height: 70%;
              left: 0;
              bottom: 1%;
            }
            .modalBodyAffirmation {
              height: 20%;
              top: 80%;
            }
            .modalBodyAffirmation .modalBodyAffirmationText {
              margin-top: 10%;
            }
            .modalBodyNotSave {
              margin-bottom: 50%;
            }
            .modalBodySaveGood {
              display: none;
            }
          }
        `}
        </style>
      </div>
    </>
  )
}
