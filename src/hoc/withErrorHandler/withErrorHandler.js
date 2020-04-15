import React, {useEffect, useState} from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    const Compt = (props) => {
        const [error, setError] = useState(null);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        useEffect(() => {
            const resInterceptor = axios.interceptors.response.use(req => req, error => {
                setError(error);
            });
            const reqInterceptor = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });

            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor); 
            };
        });

        return (
            <React.Fragment>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                <WrappedComponent {...props}/>
            </React.Fragment>
        );
    }

    return Compt;
};

export default withErrorHandler;