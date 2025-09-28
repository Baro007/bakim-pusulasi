import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  icon?: React.ReactNode;
}

export default function Card({
  title,
  description,
  children,
  className = '',
  onClick,
  hoverable = false,
  icon,
}: CardProps) {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-200 p-6';
  const hoverClasses = hoverable || onClick ? 'hover:shadow-md cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  const cardContent = (
    <>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
      )}
      
      {children}
    </>
  );

  if (onClick || hoverable) {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={classes}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className={classes}>
      {cardContent}
    </div>
  );
}
