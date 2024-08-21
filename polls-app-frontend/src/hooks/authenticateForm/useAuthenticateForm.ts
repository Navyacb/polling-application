import { useNavigate } from 'react-router-dom';
import { useLoginApi, useRegistrationApi } from '../../api/pollingAppApiMock';
import { useToggle} from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useErrorMessage } from '../errorMessage/useErrorMessage';

interface IFormValues {
    email: string;
    username?: string;
    password: string;
}

export const useAuthenticateForm = ()=>{
    const {errorsDispatch} = useErrorMessage()
    const { mutate: loginMutate } = useLoginApi()
    const { mutate: registerMutate } = useRegistrationApi()
    const navigate = useNavigate()
    const [type, toggle] = useToggle(['login', 'register'])

    const form = useForm<IFormValues>({
        initialValues: {
          email: '',
          username: '',
          password: '',
        },
    })

    const handleFormSubmit = async (values:IFormValues) => {
        if (type === 'login') {
          loginMutate(
            { email: values.email, password: values.password },
            {
              onSuccess: (data) => {
                navigate('/', { state: { msg: data.message } });
              },
            }
          );
        }  else {
          if (values.username) {
            registerMutate(
              { username: values.username, email: values.email, password: values.password },
              {
                onSuccess: (data) => {
                  toggle()
                  form.setFieldValue('password', '')
                  navigate('/authenticate', { state: { msg: data.message, email: values.email } });
                },
              }
            );
          } else {
            errorsDispatch({ type: 'add', payload: [{ type:'',value:'',msg: 'Username is required for registration' }] });
          }
        }
      }
  
      const handleToggle = ()=>{
        toggle()
        form.reset()
        errorsDispatch({type:'clear',payload:[]})
      }

      return ({
        form,
        handleFormSubmit,
        type,
        handleToggle
      })
}