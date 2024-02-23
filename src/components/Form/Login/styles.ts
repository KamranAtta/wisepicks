import { createStyles } from '../../../utils';

export const styles = createStyles({
  centeredImage: {
    display: 'block',
    paddingTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  input: {
    color: 'black',
  },
  loginContainer: {
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 #00000033, 0 6px 20px 0 #00000033',
    maxWidth: '30%',
    margin: 'auto',
    marginTop: '15vh',
    marginBottom: '15vh',
    borderRadius: '8px',
  },
  loginTextfield: {
    paddingLeft: '8%',
    paddingRight: '8%',
  },
  loginButton: {
    marginTop: '25%',
  },
  forgotPasswordWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginRight: '8px',
  },
  changePasswordInputsPrefix: {
    marginRight: '8px',
    color: 'black',
  },
  changePasswordButton: {
    display: 'flex',
    justifyContent: 'center',
  },
});
