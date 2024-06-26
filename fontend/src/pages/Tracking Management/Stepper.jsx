import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { StepperContext } from './StepperContext';



const boldLabelStyle = {
  fontWeight: 'bold',
  fontSize: '1.2rem', // Adjust the font size as needed
};

const steps = [
  {
    label: <span style={boldLabelStyle}>Order Confirmed</span>,
    description: `Your order has been successfully placed and confirmed. We have received your request and are preparing to fulfill it.`,
  },
  {
    label: <span style={boldLabelStyle}>Ready to Deliver</span>,
    description: 'Your order is packed and ready for delivery. It will be dispatched shortly to the designated delivery address.',
  },
  {
    label: <span style={boldLabelStyle}>On the Way to Delivered</span>,
    description: `Your order is currently in transit. Our delivery team is en route to deliver your package to the specified location.`,
  },
  {
    label: <span style={boldLabelStyle}>Delivered</span>,
    description: `Your order has been successfully delivered to the specified address. Thank you for choosing us! If you have any feedback or concerns, please let us know.`,
  },
];



const statuses = ["Order Confirmed", "Ready to Deliver", "On the Way to Delivered", "Delivered"];

const StepperWithDropdown = ({ editable }) => {
  const { statusIndex, setStatusIndex } = useContext(StepperContext);

  const handleChange = (e) => {
    const selectedIndex = statuses.indexOf(e.target.value);
    setStatusIndex(selectedIndex);
  };

  return (
    <div className="my-4">
      {editable && (
        <div>
          <label className="text-xl mr-4 text-gray-500">Order Status</label>
          <select
            value={statuses[statusIndex]}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={statusIndex} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default StepperWithDropdown;
