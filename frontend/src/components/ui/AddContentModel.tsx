import { useRef, useState } from "react";
import { ShareModalProps } from "../../lib/types";
import Button from "./Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../utils/getBackendUrl";


const AddContentModel = ({ isOpen, onClose, refetch }: ShareModalProps) => {

  const [formData, setFormData] = useState({ title: "", type: "", link: "", tags: "" });

  const myRef = useRef(null);
  const navigate = useNavigate();

  function closeMethod(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (myRef.current == e.target) {
      onClose();
    }
  }

  async function fetchData() {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
      toast.error("Signin first before adding contents");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token") || ""
        },
        body: JSON.stringify({ title: formData.title, link: formData.link, type: formData.type, tags: formData.tags })
      })

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
        toast.error(data.detailError);
        return;
      }

      toast.success(data.msg);
      setFormData({ link: "", tags: "", title: "", type: "" });
      if (refetch) {
        refetch();
      }
      onClose();
    } catch (err) {
      if (err instanceof TypeError) {
        toast.error(err.message + " network error try again later");
        return;
      }

      if (err instanceof Error) {
        toast.error(err.message || "failed to add the content");
        return;
      }

      toast.error("Something went wrong while adding the brain.");
      return;
    }
  }

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.title.length < 3) {
      toast.error("title should be 3 letter long.")
      return;
    }
    fetchData();
  }

  return (
    <>
      {
        isOpen && <div ref={myRef} onClick={closeMethod} className="fixed z-50 inset-0 backdrop-opacity-80 backdrop-blur-sm flex justify-center items-center">

          <div className="w-2xl flex flex-col">

            <button onClick={onClose} className="place-self-end cursor-pointer py-1 mb-1 bg-black px-2 rounded-xl">{"❌"}</button>

            <div className="flex flex-col items-center border rounded-lg p-3 h-80 bg-white" >

              <h1 className="text-2xl">Brain Dump Zone.</h1>

              <form onSubmit={handleForm}>

                <div className="pt-5 flex flex-col w-sm">

                  <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border px-2 py-1 mb-4 rounded-md">

                    <option value="" disabled>--Choose Type--</option>
                    <option value="tweet">Tweet</option>
                    <option value="youtube">Youtube</option>
                    <option value="document">Document</option>
                    <option value="brainthought">Brain Thought</option>
                  </select>

                  <input required type="text" placeholder="Enter Title" className="border px-3 py-1 rounded-md mb-4" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                  <input required type="text" placeholder="Enter link ex: youtube, twitter or any website link" className="border px-3 py-1 rounded-md mb-3" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />

                  <input type="text" placeholder="Enter Tags ex: #productivityHack #futurePlans etc" className="border px-3 py-1 rounded-md mb-3" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />

                  <div className="flex justify-center">
                    <Button variant="colorFull" className="px-5 hover:bg-green-500 hover:text-white">
                      Submit</Button>
                  </div>

                </div>
              </form>

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default AddContentModel;