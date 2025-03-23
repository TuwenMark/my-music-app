import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onChange: (open: boolean) => void
  children: React.ReactNode
}

const Modal = ({
  title,
  description,
  isOpen,
  onChange,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-10" />
      <Dialog.Content className="bg-neutral-800 fixed drop-shadow-md border border-neutral-700 top-1/2 left-1/2 h-full max-h-full md:h-auto md:max-h-[85vh] w-full max-w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md p-[25px] focus:outline-none z-20">
        <Dialog.Title className="text-xl text-center font-bold mb-4">
          {title}
        </Dialog.Title>
        <Dialog.Description className="text-sm leading-normal text-center mb-4">
          {description}
        </Dialog.Description>
        <div>{children}</div>
        <Dialog.Trigger asChild>
          <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex items-center justify-center h-[25px] w-[25px] rounded-full appearance-none focus:outline-none">
            <IoMdClose />
          </button>
        </Dialog.Trigger>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Modal
