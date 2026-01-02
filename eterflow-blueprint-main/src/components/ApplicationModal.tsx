
import React from 'react';
import { useApplicationModal } from '../contexts/ApplicationModalContext';
import ApplicationFormHandler from './modal/ApplicationFormHandler';
import ApplicationModalCore from './modal/ApplicationModalCore';

const ApplicationModal = () => {
  const { isOpen, closeModal } = useApplicationModal();

  return (
    <ApplicationFormHandler isOpen={isOpen} onClose={closeModal}>
      {(formProps) => (
        <ApplicationModalCore
          isOpen={isOpen}
          onClose={closeModal}
          onInputChange={formProps.handleInputChange}
          {...formProps}
        />
      )}
    </ApplicationFormHandler>
  );
};

export default ApplicationModal;
