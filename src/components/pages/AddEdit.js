import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css';
import fireDb from '../../firebase';
import { toast } from 'react-toastify';

const AddEdit = () => {

  const initialState = {
    name: '',
    email: '',
    contact: '',
  }

  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("userinfo").on("value", (snapshort) => {
      if (snapshort.val() !== null) {
        setData({ ...snapshort.val() });
      } else {
        setData({});
      }
    })
    return () => {
      setData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    }

  }, [id, data])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Fill All the inputs");
    } else {
      if (!id) {
        fireDb.child("userinfo").push(state, (err) => {
          if (err) {
            toast.error(err)
          } else {
            toast.success("Data has been sucessfully submitted !!")
          }
        });
      } else {
        fireDb.child(`userinfo/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err)
          } else {
            toast.success("Data has been sucessfully Updated !!")
          }
        });
      }

      setTimeout(() => navigate("/"), 500)
    }
  }

  return (
    <div className='formContainer'>
      <div className="card formCard">
        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="form-group">

              <label>Name</label>
              <input
                type="text"
                id='name'
                name='name'
                className="form-control"
                placeholder="Enter Your Name"
                value={name}
                onChange={handleInputChange}
              />

            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id='email'
                name='email'
                className="form-control"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                id='contact'
                name='contact'
                type="number"
                className="form-control"
                placeholder="Enter Your Phone Number"
                value={contact}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <input style={{ padding: '10px 50px', borderRadius: '5px', border: 'none', background: 'blue', color: '#fff', cursor: 'pointer' }} type="submit" value={id ? "Update" : "Save"} />
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default AddEdit
