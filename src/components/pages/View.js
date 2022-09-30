import React,{useState, useEffect} from 'react';
import fireDb from '../../firebase';
import { Link, useParams } from 'react-router-dom';

const View = () => {

  const [user, setUser] = useState({});

  const {id} = useParams();

  useEffect(() =>{
    fireDb.child(`userinfo/${id}`).get().then((snapshort) =>{
      if(snapshort.exists()){
      setUser({...snapshort.val()})
      }else{
        setUser({})
      }
    })
  },[id]);

  console.log(user,"viewpagedata")

  return (
    <div className='viewContainer'>
      <div style={{ width: '800px' }} class="card">
        <div class="card-header">
          User Information
        </div>
        <div class="card-body">
          <strong>ID</strong><span>{id}</span> <br /> <br />
          <strong>Name</strong><span>{user.name}</span> <br /> <br />
          <strong>Email</strong><span>{user.email}</span> <br /> <br />
          <strong>Contact</strong><span>{user.contact}</span> <br /> <br />
          <Link to="/"><button>Back</button></Link>
        </div>
      </div>
    </div>
  )
}

export default View