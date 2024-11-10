import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getImageByName, getUserById, postUploadAvartar } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userActions";
import { useSelector } from "react-redux";
import "./ModalUpdateUser.scss"
import defaultImage from '../../assets/avatar/default.jpg'

const ModalUpdateUser = (props) => {
    const { show, setShow } = props;
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(false);
    const userState = useSelector(state => state?.userState);
    const dispatch = useDispatch();

    useEffect(() => {
        setPreviewImage(userState?.account?.avatar ? getImageByName(userState?.account?.avatar, 'avatar') : defaultImage)
        setImage(userState?.account?.avatar ? true : false)
    }, [show, userState])

    const handleFileChange = (event) => {
        setImage(event.target.files[0])
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleClose = () => {
        setImage(null);
        setShow(false);
    }

    const handleSubmitChange = async () => {
        const res = await postUploadAvartar(image);
        if (res && res?.statusText === "OK" && res?.data?.status === 'Ok') {
            setShow(false);
            const newData = await getUserById(userState?.account?.id);
            dispatch(doLogin({ account: { avatar: newData?.data?.avatar } }))
        }
        else {
            toast.error("Error upload image");
        }
    }

    return <>
        <Modal show={show} animation={false} className="modal-adds-user" onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Update profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body">
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" >Email</label>
                            <input type="email" className="form-control" disabled value={userState?.account?.email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" >Password</label>
                            <input className="form-control" disabled />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Username</label>
                            <input type="username" className="form-control" disabled value={userState?.account?.username} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={userState?.account?.role} disabled>
                                <option value={"user"}>USER</option>
                                <option value={"admin"}>ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label> Image </label>
                            <div className="input-group mb-3" style={{ margin: "20px 0" }}>
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                                <label className="input-group-text">Upload</label>
                            </div>
                            <div className="img-preview" >
                                <img src={previewImage} hidden={!image} />
                                {image ? <></> : <div className="border-dotted-no-image">No preview image</div>}
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitChange}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ModalUpdateUser;