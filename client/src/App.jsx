import { useState } from 'react'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import { RevolvingDot } from 'react-loader-spinner'

const query = gql`
query ExampleQuery {
  getAllUsers {
    email
    name
    address {
      city
    }
  }
}`

function App() {
  const { data, loading } = useQuery(query)
  if (loading) return <RevolvingDot
    radius="45"
    strokeWidth="5" 
    color="#3a34eb" 
    secondaryColor='#CAD0D8' 
    ariaLabel="revolving-dot-loading" 
    wrapperStyle={{}} 
    wrapperClass="" 
    visible={true} />
  return (
    <>
      <table>
        <thead>
          <tr>
            <td> Name</td>
            <td> Email</td>
          </tr>
        </thead>
        <tbody>
        {data.getAllUsers.map((elem, idx) => (
          <tr key={elem.email}>
            <td>{elem.name}</td>
            <td>{elem.email}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default App
