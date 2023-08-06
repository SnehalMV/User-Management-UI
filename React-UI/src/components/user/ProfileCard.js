import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/axiosInstance";
import { login } from "../../utils/store/userSlice";




const ProfileCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null);
    const isLoggedIn = useSelector(store => store.user.success)
    

    const user = useSelector((store) => store.user)
    const { username, email, image } = user

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await instance.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response.data);
        dispatch(login(response.data))
        // navigate('/profile')

    }

    const handleClick = () => {
        window.my_modal_3.showModal()

    }



    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        } 
    }, [isLoggedIn, navigate])
 


    return (
        <div>
            <div className="flex items-center justify-center h-3/4 mt-16" >
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg  bg-gray-400 w-80 ">
                    <img className="h-44  px-1" src={image} alt="profile" />
                    <div className="px-6 py-4">
                        <br />
                        <div className="font-bold text-xl mb-2">{username}</div>
                        <p className="text-gray-700 text-base font-bold">
                            {email}
                        </p>
                        <br />
                        <br />
                        <br />
                        <button onClick={() => {handleClick() }}
                            className="rounded-full border-2 bg-slate-800 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase text-neutral-50 hover:border-neutral-100 hover:bg-black hover:bg-opacity-50 "
                        >update profile picture</button>
                    </div>

                </div>
            </div>
            <dialog id="my_modal_3" className="bg-transparent rounded h-16  overflow-y-hidden">
                <div className="bg-gray-200 rounded-lg border-2  h-14 p-3 flex items-center justify-between">
                    {/* <form method="dialog" className="modal-box "> */}
                    <button onClick={()=>{
                      window.my_modal_3.close()
                    }} htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold">✕</button>
                    <div className="h-14 w-72 rounded-xl">
                        <form onSubmit={handleUploadImage} encType="multipart/form-data" >
                            <input type="file" className="admin__input" id="file" name="file" onChange={handleFileSelect} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                    {/* </form> */}
                </div>
            </dialog>

        </div>
    )
}


export default ProfileCard