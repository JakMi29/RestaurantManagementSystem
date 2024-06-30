import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function MealModal({ children, open }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        } else {
            modal.close();
        }
        return () => modal.close()
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className='modal-dialog'>
            <div className='modal-backdrop'>
                {children}
            </div>
        </dialog>,
        document.getElementById('modal')
    );
}