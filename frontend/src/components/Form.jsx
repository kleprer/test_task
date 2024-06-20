import React, {useState} from 'react';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const Form = () => {

  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

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
 }

 const [status, setStatus] = useState("Не в работе");
    const clients = [{
        account_number: '1245',
        first_name: 'Петр',
        last_name: 'Петров',
        middle_name: 'Петрович',
        birthday: '2001.03.12',
        itn: 1234567,
        user_in_charge: 'Иванов Иван Иванович',
        status: {status}
    }
    ]

  return (
    <div>
      <form className="flex m-auto gap-[10px] items-center" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" className="w-[250px] h-[35px] border-black border-[2px] rounded-lg text-[20px]"/>
          <div className="flex border-black border-[2px] w-[250px] h-[35px] rounded-lg ">
            <input type={type} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full m-[2px] text-[20px] border-0 appearance-none outline-none"/>
            <Icon className="p-[3px]" icon={icon} size={25} onClick={handleToggle}/>
          </div>
          <button type="submit" className="rounded-lg p-[6px] bg-blue-500 hover:bg-blue-700 text-white font-bold">
            Получить список клиентов
          </button>
      </form>
      <table className="table table-striped table-bordered table-hover">
          <thead>
              <tr>
                  <th>Номер счета</th>
                  <th>Фамилия</th>
                  <th>Имя</th>
                  <th>Отчество</th>
                  <th>Дата рождения</th>
                  <th>ИНН</th>
                  <th>Статус</th>
              </tr>
          </thead>
          <tbody>
              {clients.map((client) => {
                  <tr key={client.account_number}>
                      <td>{client.last_name}</td>
                      <td>{client.first_name}</td>
                      <td>{client.middle_name}</td>
                      <td>{client.birthday}</td>
                      <td>{client.itn}</td>
                      <td>{client.status}</td>

                  </tr>
              })}
          </tbody>
      </table>
      </div>
  )
}

export default Form;