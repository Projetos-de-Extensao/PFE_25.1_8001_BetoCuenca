
import React from 'react';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="mt-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 h-[1px] bg-gray-700 w-full -translate-y-1/2"></div>
        
        {/* Active Line */}
        <div 
          className="absolute top-1/2 left-0 h-[1px] bg-cuencos-purple transition-width duration-500 ease-in-out -translate-y-1/2"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Step Markers */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-4 h-4 rounded-full z-10 transition-colors duration-300 ease-in-out ${
                  index <= currentStep ? 'bg-cuencos-purple' : 'bg-gray-700'
                }`}
              ></div>
              <span 
                className={`mt-2 text-sm ${
                  index <= currentStep ? 'text-cuencos-purple' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
