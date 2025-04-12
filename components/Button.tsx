import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

// forwardRef期望有两个泛型<ref 指向的类型,组件接收的 props 类型>
const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      className,
      children,
      disabled,
      type = 'button',
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref
  ) => {
    return (
      <button
        className={twMerge(
          `w-full rounded-full bg-green-500 border border-transparent p-3 text-black font-bold disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 transition`,
          className
        )}
        disabled={disabled}
        type={type}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
// 可选属性，用于调试时更容易识别组件。当在 React DevTools 中查看组件树时，displayName 会显示为 'Button'，而不是默认的函数名（尤其是在经过压缩或混淆的情况下）
Button.displayName = 'Button'

export default Button
