import React, { useState } from 'react';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import Toast from '../components/Common/Toast';

export default function LandingPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <h1>Welcome to Home Loan Dubai</h1>
      <Button variant="primary" onClick={() => setModalOpen(true)}>Get Started</Button>
      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Welcome">
        <p>Start your home loan journey with us!</p>
        <Button variant="secondary" onClick={() => setShowToast(true)}>Show Notification</Button>
      </Modal>

      {showToast && (
        <Toast 
          message="Thank you for starting your journey!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}
