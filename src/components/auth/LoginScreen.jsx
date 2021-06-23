import React from 'react';
import './login.css';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail:'erick.doev@gmail.com',
        lPassword:'Lidf@LKMDer34rew',

    });
    const {lEmail,lPassword} = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rEmail:'',
        rPassword1:'',
        rPassword2:'',
        rName:''
        
    });
    const {rEmail,rPassword1,rPassword2,rName} = formRegisterValues

    

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if(!validator.isEmail(lEmail)){
            console.log('correo no valido');
        }else{
            dispatch(startLogin(lEmail, lPassword));
        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if(rName.trim().lenght < 3){
            return Swal.fire('Error','El nombre debe ser mayor de 3 caracteres','error');
        }
        if(!validator.isEmail(rEmail)){
            return Swal.fire('Error','Correo no validos','error');
        }
        if(rPassword1 !== rPassword2){
            return Swal.fire('Error','Las contraseñas no coinciden','error');
        }

        dispatch(startRegister(rEmail,rPassword1,rName));
        
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                        <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}