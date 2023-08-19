"use client";
import { Toast, ToastBar, Toaster, toast } from 'react-hot-toast';

const Toast = () => {
    return (
        <Toaster>
            {(t: Toast) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => {
                        return (
                            <>
                                <span onClick={() => (t.type === "error" && toast.dismiss(t.id))} style={t.type === "error" ? { cursor: "pointer" } : undefined} >
                                    {icon}
                                </span>
                                {message}
                            </>
                        )
                    }}
                </ToastBar>
            )}
        </Toaster>
    )

}

export default Toast