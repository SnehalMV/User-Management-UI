import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../utils/store/allUsersSlice'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../../../utils/axiosInstance'

const AdminDashContent = () => {
  const userList = useSelector(store => store.allUsers.userList)
  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedUser, setSelectedUser] = useState({})

  const handleDelete = async (id) => {
    const response = await instance.post(`/admin/delete/${id}`)
    dispatch(getUsers(response.data.users))
  }

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setUserName(user.username)
    setEmail(user.email)
    window.my_modal_3.show()
  }

  const handleEdit = async (id) => {
    const data = {
      username: username,
      email: email
    }
    const response = await instance.post(`/admin/edit/${id}`, data)
    dispatch(getUsers(response.data.users))

  }



  useEffect(() => {
    const getUserList = async () => {
      const response = await instance.get('/admin/dash')
      dispatch(getUsers(response.data.users))
    }
    getUserList()
  }, [])


  return (
    <div>
      <div className="flex flex-col overflow-x-auto items-center mt-12">
        <div className="sm:-mx-6 lg:-mx-8 w-5/6">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Username</th>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Delete</th>
                    <th scope="col" className="px-6 py-4">Edit</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    userList.map((user, index) => {
                      return (<tr key={user._id} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                        <td className="whitespace-nowrap px-6 py-4" ><button className="text-xs p-2   bg-red-600 rounded-lg hover:bg-red-700 duration-200 text-white" onClick={() => handleDelete(user._id)}>Delete</button></td>
                        <td className="whitespace-nowrap px-6 py-4" ><button className="text-xs p-2 px-4   bg-blue-600 rounded-lg hover:bg-blue-700 duration-200 text-white" onClick={() => handleEditClick(user)}>Edit</button></td>
                      </tr>)
                    })
                  }


                </tbody>
              </table>
              <dialog id="my_modal_3" className="bg-transparent rounded h-40  ">
                <div className="bg-gray-200 rounded-lg border-2  h-40  p-2 flex items-center justify-between">
                  {/* <form method="dialog" className="modal-box "> */}
                  <button onClick={() => {
                    window.my_modal_3.close()
                  }} htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold">✕</button>
                  <div className="h-14 w-72 rounded-xl">
                    <form onSubmit={handleEdit} className="flex flex-col" encType="multipart/form-data" >
                      <div className='flex justify-center items-center '>
                        <label className='text-sm mr-2'>Username:</label>
                        <input value={username} className='' onChange={(e) => setUserName(e.target.value)} />
                      </div>
                      <div className='flex justify-center items-center mt-2'>
                        <label className='text-sm mr-2 ' >Email:</label>
                        <input value={email} className='' onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <button className="text-xs p-2 mt-2 bg-blue-600 rounded-lg hover:bg-blue-700 duration-200 text-white" onClick={() => handleEdit(selectedUser._id)}>Edit</button>
                    </form>
                  </div>
                  {/* </form> */}
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashContent