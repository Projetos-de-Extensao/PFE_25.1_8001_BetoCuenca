import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ children, value, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
    </div>
  )
})
Select.displayName = "Select"

const SelectGroup = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <optgroup ref={ref} {...props}>
      {children}
    </optgroup>
  )
})
SelectGroup.displayName = "SelectGroup"

const SelectItem = React.forwardRef(({ children, value, ...props }, ref) => {
  return (
    <option ref={ref} value={value} {...props}>
      {children}
    </option>
  )
})
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <label ref={ref} className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </label>
  )
})
SelectLabel.displayName = "SelectLabel"

// Dummy components to maintain API compatibility
const SelectValue = React.forwardRef(({ children, ...props }, ref) => children)
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef(({ children, ...props }, ref) => children)
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef(({ children, ...props }, ref) => children)
SelectContent.displayName = "SelectContent"

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

const SelectScrollUpButton = React.forwardRef((props, ref) => null)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef((props, ref) => null)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
