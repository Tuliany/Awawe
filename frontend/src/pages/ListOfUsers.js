import React, {useState, useEffect} from 'react'


const url = 'https://reqres.in/api/users?page=2'

export const ListOfUsers = () =>{
  const [listOfUsers, setListOfUsers] = useState([])

  useEffect (()=> {
    fetch('https://reqres.in/api/users?page=2')
    .then((res)=> res.json())
    .then((json)=>{
      setListOfUsers(json.data)
    })
  }, [])



  return (
    <div> 
      {listOfUsers.map((listOfUser)=>(
        <div key={listOfUser.id}class="card">
            <div class="card-body">
              <img src ={listOfUser.avatar}/>
            <h5 class="card-title">{listOfUser.first_name} {listOfUser.last_name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>
      ))}
    </div>
  )
}
