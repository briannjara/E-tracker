import React from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const TourGuide = ({ isOpen, onClose }) => {
  const steps = [
    {
      target: '.card-info',
      content: 'This section gives you the total amount of money you placed in your budget, total expenditures, and the number of budgets you have created.',
      disableBeacon: true,
    },
    {
      target: '.budget-overview',
      content: 'Here you can see a visual representation of your budgets and spending.',
    },
    {
      target: '.recent-expenses',
      content: 'This table shows your most recent expenses across all budgets.',
    },
    {
      target: '.your-budgets',
      content: 'Here you can see all your current budgets and their status.',
    },
    {
      target: '.quick-actions',
      content: 'Use these buttons to quickly access key features of the app.',
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={isOpen}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      styles={{
        options: {
          arrowColor: '#4B5563',
          backgroundColor: '#1F2937',
          overlayColor: 'rgba(0, 0, 0, 0.75)',
          primaryColor: '#3B82F6',
          textColor: '#F9FAFB',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: '8px',
          fontSize: '14px',
          padding: '16px',
        },
        buttonNext: {
          backgroundColor: '#3B82F6',
          borderRadius: '4px',
          color: '#FFFFFF',
          fontSize: '14px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#9CA3AF',
          fontSize: '14px',
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#9CA3AF',
          fontSize: '14px',
        },
      }}
      callback={(data) => {
        const { action, index, status, type } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
          onClose();
        }
      }}
    />
  );
};

export default TourGuide;