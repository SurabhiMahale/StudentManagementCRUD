import axios from "axios";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { GrAdd } from "react-icons/gr";

function App() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStudent, setEditStudent] = useState(null); //index for student being edited
  const [createPost, setCreatePost] = useState(false);  // to control the visibility of a form for creating a new student.
  const [searchResults,setSearchResults] = useState([])

  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const age = useRef(null);
  const address= useRef(null);

  const user = useLoaderData();

  useEffect(() => {
    const dt = students.filter((d) => {
      if (d.name.toLowerCase().includes(searchQuery) || d.email.toLowerCase().includes(searchQuery) || d.phone.toString().includes(searchQuery) || d.age.toString().includes(searchQuery) || d.address.toString().includes(searchQuery)){
        return true;
      }

      return false
    })

    setSearchResults([...dt])
  }, [searchQuery])
  

  const getStudents = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/student`
    );
    setStudents(res.data);
    console.log(res);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/student/?id=${editMode}`,
        {
          ...students[editStudent],
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // ensuring that only authorized users can edit student data.
          },
        }
      );

      setEditMode(false);
    } catch (error) {
      toast(error.response.data.msg);
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/student`,
        {
          params: {
            id,
          },
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast(res.data.msg);
      setStudents((student) => {
        return student.filter((e) => e._id != id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center p-5 bg-yellow-400">
          <div
            className="font-bold "
            style={{
              fontFamily: "'ADLaM Display', cursive",
            }}
          >
            Student Management
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            className="cursor-pointer"
          >
            Logout {user.name}
          </div>
        </div>

        <div
          style={{
            maxHeight: "90vh",
            overflow: "auto",
            
          }}
          // className="flex"
        >
          {/* <div className="flex justify-center items-center m-5">
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(() => e.target.value);
              }}
              placeholder="Search.........."
              className="border-2 border-slate-700 py-4 font-mono  px-5 w-full rounded-full"
            />
          </div> */}


          

          {createPost && (
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const obj = {
                      name: name.current.value,
                      email: email.current.value,
                      phone: phone.current.value,
                      age: age.current.value,
                      address: address.current.value,

                    };
                    await axios.post(
                      `${import.meta.env.VITE_BACKEND_URI}/api/student/`,
                      obj,
                      {
                        headers: {
                          "auth-token": localStorage.getItem("token"),
                        },
                      }
                    );

                    toast("Student successfull added!");
                    setStudents((d) => [...d, obj]);
                    setCreatePost(false);
                  } catch (error) {
                    toast(error.response.data.msg);
                    console.log(error);
                  }
                }}
                className="text-center flex flex-col items-center justify-center p-5 gap-3"
              >
                <input
                  className="outline-none border-4 border-black rounded-full py-1 px-5 text-center"
                  type="text"
                  placeholder="Name"
                  required
                  ref={name}
                />
                <input
                  className="outline-none border-4 border-black rounded-full py-1 px-5 text-center"
                  type="email"
                  placeholder="email"
                  required
                  ref={email}
                />
                <input
                  className="outline-none border-4 border-black rounded-full py-1 px-5 text-center"
                  type="number"
                  // minLength={10}
                  // maxLength={10}
                  placeholder="Phone Number"
                  required
                  ref={phone}
                />
                <input
                  className="outline-none border-4 border-black rounded-full py-1 px-5 text-center"
                  type="number"
                  placeholder="Age"
                  required
                  min={18}
                  ref={age}
                />
                <input
                  className="outline-none border-4 border-black rounded-full py-1 px-5 text-center"
                  type="text"
                  placeholder="Address"
                  required
                  
                  ref={address}
                />


                <button
                  type="submit"
                  className="rounded-full bg-green-300 border-4 border-green-600 px-5 py-1 "
                > Save
                </button>
              </form>
            </div>
          )}

{/* Search */}

          {searchQuery == "" &&
            students.map((data, index) => {
              return (
                <div
                  className="flex justify-between p-5 m-5 shadow-lg rounded-lg bg-slate-100"
                  key={data._id}
                >
                  {editMode == data._id ? (
                    <div>
                      <form onSubmit={handleEdit}>
                        <div className="flex gap-2 items-center my-1">
                          Name:
                          <div>
                            <input
                              type="text"
                              name={`${data._id}_name`}
                              id={`${data._id}_name`}
                              required
                              placeholder={data.name}
                              value={data.name}
                              onChange={(e) => {
                                const dt = [...students];
                                dt[index].name = e.target.value;
                                setStudents(() => dt);
                              }}
                              className="rounded-full bg-gray-100 px-2 w-full outline-none font-mono "
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 items-center my-1">
                          Email:{" "}
                          <div>
                            <input
                              type="email"
                              name={`${data._id}_email`}
                              id={`${data._id}_email`}
                              // required
                              placeholder={data.email}
                              value={data.email}
                              onChange={(e) => {
                                const dt = [...students];
                                dt[index].email = e.target.value;
                                setStudents(() => dt);
                              }}
                              className="rounded-full bg-gray-100 px-2 w-full outline-none font-mono "
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 items-center my-1">
                          Phone:
                          <div>
                            <input
                              type="number"
                              name={`${data._id}_phone`}
                              id={`${data._id}_phone`}
                              required
                              placeholder={data.phone}
                              value={data.phone}
                              minLength={10}
                              maxLength={10}
                              onChange={(e) => {
                                const dt = [...students];
                                dt[index].phone = e.target.value;
                                setStudents(() => dt);
                              }}
                              className="rounded-full bg-gray-100 px-2 w-full outline-none font-mono "
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 items-center my-1">
                          Age:
                          <div>
                            <input
                              type="number"
                              name={`${data._id}_age`}
                              id={`${data._id}_age`}
                              required
                              placeholder={data.age}
                              value={data.age}
                              onChange={(e) => {
                                const dt = [...students];
                                dt[index].age = e.target.value;
                                setStudents(() => dt);
                              }}
                              className="rounded-full bg-gray-100 px-2 w-full outline-none font-mono "
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 items-center my-1">
                          Address:
                          <div>
                            <input
                              type="text"
                              name={`${data._id}_address`}
                              id={`${data._id}_address`}
                              required
                              placeholder={data.address}
                              value={data.address}
                              onChange={(e) => {
                                const dt = [...students];
                                dt[index].address= e.target.value;
                                setStudents(() => dt);
                              }}
                              className="rounded-full bg-gray-100 px-2 w-full outline-none font-mono "
                            />
                          </div>
                        </div>

                        <button type="submit">Save</button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2 items-center my-1">
                        Name:
                        <div>
                          <div>{data.name}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center my-1">
                        Email:{" "}
                        <div className="rounded-full bg-gray-400 px-2 font-mono ">
                          {data.email}
                        </div>
                        <div
                          onClick={() => {
                            copy(
                              `${import.meta.env.VITE_FRONTEND_URL}/s/${
                                data.short_url_code
                              }`
                            );
                            toast("Copied to clipboard!");
                          }}
                          className="cursor-pointer"
                        >
                          {/* <FaCopy size={12} /> */}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center my-1">
                        Phone:
                        <div>
                          <div>{data.phone}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center my-1">
                        Age:
                        <div>
                          <div>{data.age}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center my-1">
                        Address:
                        <div>
                          <div>{data.address}</div>
                        </div>
                      </div>
                    </div>
                    
                  )}

                  <div className="flex flex-col gap-1 items-center">
                    <div
                      onClick={() => {
                        setEditMode(data._id);
                        setEditStudent(index);
                      }}
                      className="cursor-pointer"
                    >
                      <FiEdit size={15} />
                    </div>
                    <div
                      onClick={() => handleDelete(data._id)}
                      className="cursor-pointer "
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        style={{
          bottom: 0,
          right: 0,
        }}
        onClick={() => {
          setCreatePost((prev) => !prev);
        }}
        className="bg-green-500 absolute p-5  rounded-full m-5 cursor-pointer"
      >
        <GrAdd
          style={{
            color: "white",
          }}
          color="white"
        />
      </div>
    </div>
  );
}

export default App;
