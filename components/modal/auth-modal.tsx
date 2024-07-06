// if you want to use this component, you should use useAuthModal hook
// this is a modal for authentication and is used to show the auth form
"use client"
import useAuthModal from '@/hooks/modal/useAuthModal';
import Modal from '../ui/modal';
import AuthForm from '../AuthForm';


const AuthModal:React.FC = () => {
    const authModal = useAuthModal();
    return (
        <Modal 
        open={authModal.isOpen}
        onClose={authModal.onClose}
        >
            {/* for desktop */}
             <div className='hidden md:block'>
            <div className='w-screen'>
                <AuthForm/>
            </div>

                </div>  
            {/* for mobile */}
            <div className='block md:hidden'>
                <AuthForm/>
                </div>   
        </Modal>
    )
}
export default AuthModal;