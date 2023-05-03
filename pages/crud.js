import React, { useState } from 'react'
import { api } from './api/api'
export default function Teste() {

  const [createUser, setCreateUser] = useState({ title: "", description: "" })
  const [listaUser, setlistaUsers] = useState([])
  const [isUpdated, setIsUpdated] = useState(null)

  React.useEffect(() => { getUsers() }, [])

  const getUsers = async () => {
    const res = await api.get("/")
    console.log(res)
    setlistaUsers(res.data)
  }

  const updateUser = (editUser) => {
    const updatedListaUser = listaUser.map(user => {
      if (user.id === editUser.id) {
        user.title = editUser.title
        user.description = editUser.description
        return { ...user, ...editUser }
      }
      return user
    })
    setlistaUsers(updatedListaUser)
    setIsUpdated(null)
    api.put(`/${editUser.id}`, editUser)
  }

  const crudUser = () => {
    setlistaUsers([...listaUser, createUser])
    api.post("/", createUser)
  }

  const deleteUser = (editUser) => {
    setlistaUsers(listaUser.filter(e => e.id != editUser.id))
    api.delete(`/${editUser.id}`, editUser)
  }

  return (
    <>
      <h1>CRUD</h1>
      <div>
        <h1>Lista de clientes</h1>
        {
          listaUser.map(e => {
            return (
              <div style={{ display: "flex" }}>
                <h1 style={{ padding: 10 }}>{e.title}</h1>
                <h1 style={{ padding: 10 }}>{e.description}</h1>
                <button style={{ padding: 10 }} onClick={() => deleteUser(e)}>deletar</button>
                <button style={{ padding: 10 }} onClick={() => setIsUpdated(e)}>editar</button>
              </div>
            )
          })
        }

        {!isUpdated ?
          <>
            <h1>criar exemplo</h1>
            <div>
              <input placeholder='title' value={createUser.title} onChange={(e) => setCreateUser({ ...createUser, title: e.target.value })} />
              <input placeholder='description' value={createUser.description} onChange={(e) => setCreateUser({ ...createUser, description: e.target.value })} />
              <button onClick={() => crudUser()}>Create</button>
            </div> </>
          :
          <>
            <h1>editar user</h1>
            <div>
              <input placeholder='title' value={isUpdated.title} onChange={(e) => setIsUpdated({ ...isUpdated, title: e.target.value })} />
              <input placeholder='description' value={isUpdated.description} onChange={(e) => setIsUpdated({ ...isUpdated, description: e.target.value })} />
              <button onClick={() => updateUser(isUpdated)}>Editar</button>
            </div></>

        }

      </div>
    </>
  )
}
