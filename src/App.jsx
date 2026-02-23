import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, EditableText, InputGroup, Intent, OverlayToaster} from "@blueprintjs/core";


const AppToaster = OverlayToaster.create({
  position: "top",
});

function App() {
	const [users,setUsers]=useState([]);
	const [newName,setNewName]=useState([]);
	const [newEmail,setNewEmail]=useState([]);
	const [newWebsite,setNewWebsite]=useState([]);
	useEffect(()=>{
	fetch('https://jsonplaceholder.typicode.com/users')	
	.then((response)=>response.json())
	.then((json)=> setUsers(json))
	},[])
	
	function addUser(){
		const name = newName.trim();
		const email = newEmail.trim();
		const website = newWebsite.trim(); 
		
		if(name && email && website)
		{
			
			
			fetch('https://jsonplaceholder.typicode.com/users',
			
			  {
				method: "POST",
        body: JSON.stringify({
		name,
        email,
		website
		}),
		
		headers:{
			"content-Type": "application/json; charset=UTF-8"
		}
				
			   }
				
			
			).then((response) => response.json())	
			
             .then((data) => {
				 setUsers([...users, data]);
				 
				 setNewName("");
                 setNewEmail("");
				 setNewWebsite("");
				 
				 
			 });			
			
			
		}
	}
	
function onChangeHandler(id,key,value){
	
	setUsers((users)=>{
		return users.map(user =>{
			return user.id === id?{...user,[key]:value} : user;
			
		})
	})
	
}	
   
function updateUser(id){
	const user = users.find((user) => user.id === id)
	fetch('https://jsonplaceholder.typicode.com/users/${id}',
			
			  {
				method: "PUT",
        body: JSON.stringify(user),
		
		headers:{
			"content-Type": "application/json; charset=UTF-8"
		}
				
			   }
				
			
			).then((response) => response.json())	
			
             .then((data) => {
				 setUsers([...users, data]);
				 
				
				 
				 
			 });
	
}

   return (
    <div className="App">
	<table>
	<thead>
	<th>ID</th>
	<th>Name</th>
	<th>Email</th>
	<th>website</th>
	<th>Action</th>
	</thead>
	<tbody>
	{users.map(users =>
	<tr key={users.id}>
	<td>{users.id}</td>
	<td>{users.name}</td>
	<td><EditableText onChange={value => onChangeHandler(user.id, 'email',value)}value={users.email}/></td>
	<td><EditableText onChange={value => onChangeHandler(user.id, 'website',value)}value={users.website}/></td>
	<td><Button intent='primary' onClick={()=> updateUser(user.id)}>Update</Button></td>
	<td><Button intent='danger'>Delete</Button>
	</td>
	</tr>
	)}
	</tbody>
	<tfoot>
	
	<tr>
	<td></td>
	<td>	
	<InputGroup value={newName}
	onChange={(e) => setNewName(e.target.value)}
	placeholder='Enter name...'
	/>	
	</td>
	
	<td>	
	<InputGroup value={newEmail}
	onChange={(e) => setNewEmail(e.target.value)}
	placeholder='Enter Email...'
	/>	
	</td>
	
	
	<td>	
	<InputGroup value={newWebsite}
	onChange={(e) => setNewWebsite(e.target.value)}
	placeholder='Enter website...'
	/>	
	</td>
	
	<td><Button intent='success' onClick={addUser}>Add user</Button></td>
	</tr>
	</tfoot>
	
	</table>
	</div>
  );
}

export default App

