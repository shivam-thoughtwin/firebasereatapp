import React, { useState, useEffect } from 'react';
import fireDb from '../../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const Home = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    getAllData();
  }, [])

  const getAllData = () => {
    fireDb.child('userinfo').on("value", (snapshort) => {
      if (snapshort.val() !== null) {
        setData({ ...snapshort.val() });
      } else {
        setData({});
      }
    })
    return () => {
      setData({})
    }
  }


  const onDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        fireDb.child(`userinfo/${id}`).remove((err) => {
          if (err) {
            toast.error(err)
          } else {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })

      }
    })

  }

  console.log(data, "liveData")

  return (
    <div style={{ padding: '110px' }}>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <tr>
                    <td>
                      <Link to={`/update/${id}`}>
                        <p style={{ background: 'cadetblue', padding: '6px 25px', color: '#fff', cursor: 'pointer' }}>Edit</p>
                      </Link>
                    </td>
                    <td><p onClick={() => onDelete(id)} style={{ background: 'red', padding: '6px 25px', color: '#fff', cursor: 'pointer' }}>Delete</p></td>
                    <td>
                      <Link to={`/view/${id}`}>
                        <p style={{ background: '#5fa06d', padding: '6px 25px', color: '#fff', cursor: 'pointer' }}>View</p>
                      </Link>
                    </td>
                  </tr>
                </td>
              </tr>
            )
          })}
        </tbody>



      </table>
    </div>
  )
}

export default Home