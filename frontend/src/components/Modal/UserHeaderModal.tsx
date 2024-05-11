interface UserModalProps {
  isOpen: boolean,
  user: {
    name: string,
    email: string,
    balance: number
  }
}

export default function UserModal({isOpen, user}: UserModalProps) {
  if(isOpen) {
    return (
      <div className="w-fit h-64 absolute rounded-lg bg-white border border-gray-500 top-full p-4 mt-1">
        <div className="flex justify-between">
          <p>Nome:</p>  
          <p>{user?.name}</p>  
        </div>
        <div className="flex justify-between">
          <p>Email:</p>  
          <p>{user?.email}</p>  
        </div>
        <div className="flex justify-between">
          <p>AMZ:</p>  
          <p>{user?.balance || `connect your wallet`}</p>  
        </div>
      </div>
    )
  }
} 