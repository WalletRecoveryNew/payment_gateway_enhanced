import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'glass'
}

export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
  rounded = 'md',
  variant = 'default',
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  }
  
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  }
  
  const roundedStyles = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
  }
  
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    glass: 'glass-card bg-white/10 backdrop-blur-lg border border-white/20',
  }
  
  const combinedClassName = `
    ${paddingStyles[padding]} 
    ${shadowStyles[shadow]} 
    ${roundedStyles[rounded]} 
    ${variantStyles[variant]} 
    ${className}
  `.trim()
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  )
}

// Card subcomponents
export function CardHeader({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={`text-lg font-medium text-crypto-white ${className}`}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={`text-sm text-crypto-gray-light ${className}`}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-white/10 ${className}`}>
      {children}
    </div>
  )
} 