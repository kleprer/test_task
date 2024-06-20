import React, {useState, useEffect} from 'react';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { Dropdown } from "flowbite-react";

import api from './api';


function App() {
  const [clients, setClients] = useState([]);
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [status, setStatus] = useState("Не в работе");
  const [cId, setCId] = useState(0);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

 const handleSubmit = (e) => {
  e.preventDefault();
  fetchClients(login, password);
  
 }


const fetchClients = async (user, user_password) => {
  if (clients != [] && login !== '' && password !== '') {
    const response = await api.get(`/${user}/clients/`, {params: {
      password: user_password
    }})
    setClients(response.data);
  } else {
    setClients([]);
  }
  
  }

 
 
 const fetchUpdateClient = async (clientId, clientNewStatus) => {
  if (clientId !== 0 && clientNewStatus !== '' && clients != []) {
  const response = await api.get(`/clients/${clientId}`, {params: {
    status: clientNewStatus
  }
  })
  setCId(clientId);
  setStatus(clientNewStatus);
  const updatedClient = response.data;
  const index = clients.indexOf(updatedClient);
  if (index > -1) {
    clients.splice(index, 0, updatedClient);
  }
  setClients(clients);
}}
 
 const handleSelect =  (newStatus, id) => {
  fetchUpdateClient(id, newStatus);
  fetchClients(login, password);
 }
 useEffect(() => {
  fetchUpdateClient(cId, status);
  
 },[]) // eslint-disable-line react-hooks/exhaustive-deps

 useEffect(() => {
  fetchClients(login, password);
 }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="flex flex-col items-center gap-[20px] ">
    <div className="flex items-center mt-[50px]">
      <form className="flex m-auto gap-[10px] items-center" onSubmit={(e) => handleSubmit(e)}>
          <input value={login} onChange={(e) => setLogin(e.target.value)}
          type="text" className="text-start p-[6px] w-[300px] h-[35px] border-black border-[2px] rounded-lg text-[20px]"/>
          <div className="flex border-black border-[2px] w-[300px] h-[35px] rounded-lg ">
            <input type={type} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full m-[2px] text-[20px] border-0 appearance-none outline-none display-none"/>
            <Icon className="p-[3px]" icon={icon} size={25} onClick={handleToggle}/>
          </div>
          <button type="submit" className="rounded-lg p-[6px] bg-blue-500 hover:bg-blue-700 text-white font-bold w-[230px]">
            Получить список клиентов
          </button>
      </form>
      </div>
      <table className="table-fixed text-left w-[850px]">
          <thead className="w-full">
              <tr className="w-full">
                <th className="w-[94px] p-[5px] border-[2px] border-black">Номер счета</th>
                <th className="w-[100px] p-[5px] border-[2px] border-black">Фамилия</th>
                <th className="w-[84px] p-[5px] border-[2px] border-black">Имя</th>
                <th className="w-[106px] p-[5px] border-[2px] border-black">Отчество</th>
                <th className="w-[115px] p-[5px] border-[2px] border-black">Дата рождения</th>
                <th className="w-[70px] p-[5px] border-[2px] border-black">ИНН</th>
                <th className="w-[125px] p-[5px] border-[2px] border-black">Статус</th>
              </tr>
          </thead>
          <tbody>
             
              {clients.map((client) => {
                return <tr key={client.id}>
                  <td className="p-[5px] border-[2px] border-black">{client.account_number}</td>
                  <td className="p-[5px] border-[2px] border-black">{client.last_name}</td>
                  <td className="p-[5px] border-[2px] border-black">{client.first_name}</td>
                  <td className="p-[5px] border-[2px] border-black">{client.middle_name}</td>
                  <td className="p-[5px] border-[2px] border-black">{client.birthday}</td>
                  <td className="p-[5px] border-[2px] border-black">{client.itn}</td>
                  <td className="p-[5px] border-[2px] border-black">
                      <Dropdown className="bg-white fixed w-[125px] flex border-black border-[2px] items-end" label={client.status} dismissOnClick={true} inline>
                        <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => handleSelect("Не в работе", client.id)}>Не в работе</Dropdown.Item>
                        <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => handleSelect("В работе", client.id)}>В работе</Dropdown.Item>
                        <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => handleSelect("Отказ", client.id)}>Отказ</Dropdown.Item>
                        <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => handleSelect("Сделка закрыта", client.id)}>Сделка закрыта</Dropdown.Item>
                      </Dropdown>
                  </td>
                </tr>
              })}
             
          </tbody>
      </table>
      </div>
  );
}

export default App;
