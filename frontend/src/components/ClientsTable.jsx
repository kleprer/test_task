import React, {useState} from 'react'

const ClientsTable = () => {

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
  )
}

export default ClientsTable