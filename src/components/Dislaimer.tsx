import React, {useState} from 'react'
import Modal from 'react-modal'
import '../css/components/Disclaimer.scss'

export default function Disclaimer() {
  const [modalIsOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      className='modal-container'
      contentLabel="onRequestClose Example"
      onRequestClose={closeModal}
      overlayClassName='modal-overlay'
      shouldCloseOnOverlayClick={true}
    >
      <h4 className="modal-header">Disclaimer</h4>
      <p className="modal-body">The FDA encourages veterinarians and animal owners to report adverse drug experiences and product defects
        associated with animal drugs or animal devices. These adverse event reports (AERs) can include minor or major
        health events, but also complaints about product quality issues, lack of effectiveness, defective packaging,
        and other non-health-related issues. It’s also important to recognize the information in the database is as
        reported to the FDA’s CVM, and the agency has not necessarily determined if the product(s) in question was/were
        the actual cause of the events reported.</p>
      <p className="modal-body">This database should not be the sole source of information for clinical decision-making or other assumptions
        about the safety or effectiveness of a product. The adverse event may have been related to an underlying
        disease, other drugs used at the same time or other non-drug related sources. In addition, it is important
        to remember that AERs represent a small percentage of total usage numbers of a product. Commonly used products
        may have a higher number of reported adverse events due to the higher total number of animals being given the
        product. In recent years, the FDA has undertaken efforts to increase collection of AERs. Increases in the
        total number of AERs is likely a result of improved reporting; however, the FDA believes that AERs are still
        underreported.</p>
      <p className="modal-body">CVM supplies AER data to openFDA.gov so that the public can access information about clinical signs that have
        been reported for these drugs and devices used in animals. The AER data received by CVM and uploaded to
        openFDA.gov includes reports associated with approved animal drugs, unapproved/compounded drugs and devices
        used in animals. Reports are not posted in real time. Updates to openFDA are made quarterly, but there may be
        a 3-6 month delay from the time FDA receives reports until they are posted.</p>
      <button className='modal-button bg-primary clr-white' onClick={closeModal}>Accept</button>
    </Modal>
  )
}