import { useState } from "react"
const Modal = () => {
    var [ShowModal, setShowModal] = useState(false)
    //when u press yes btn 
    const BtnYes = () => {
        alert('Item Delelted Succcessfully')
        setShowModal(false)
    }
    //when u press no btn 
    const BtnNo = () => {
        alert('Item Did Not Delelted ')
        setShowModal(false)
    }
    const btnshowmodalform = () => {
        setShowModal(true)
    }
    return (
        <div>
            <h1>modal</h1>
            <button className="btn btn-light" onClick={() => btnshowmodalform()}> click me</button>
            {ShowModal &&
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050, overflow: 'hidden', backdropFilter: 'blur(5px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog  modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-info" style={{ color: 'navy' }}>
                                <h1 className="modal-title">Warning!!!</h1>
                            </div>
                            <div className="modal-body">
                                <label>Are You Sure You Want Delete This Item?</label>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-info" onClick={() => BtnYes()}>Yes</button>
                                <button className="btn btn-default" onClick={() => BtnNo()}>No</button>
                            </div>

                        </div>

                    </div>
                </div>
            }

        </div>

    )



}
export default Modal