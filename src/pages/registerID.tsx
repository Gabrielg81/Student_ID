import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import moment from 'moment';
import 'moment/locale/pt-br';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as C from '../styles/pages.Styles';
import { useState } from 'react';
import Alert from '../components/Alert';
import LoadingScreen from '../components/LoadingScreen';

interface Form {
  matriculation: string;
  password: string;
}

interface NextForm {
  idStudent: string;
  codeStudent: string;
  name: string;
  course: string;
  semester: string;
  cpf: string;
  rg: string;
  sex: string;
  birthDate: string;
  photo: string;
  lattes: string;
  linkedin: string;
  password: string;
  dateRegister: moment.Moment;
  dateRevalidate: moment.Moment;
}

moment.locale('pt-br');
let nameCheck: string;

const Register: NextPage<{ urlAPI: string }> = ({ urlAPI }) => {
  const { register, handleSubmit, reset } = useForm();
  const [name, setName] = useState(String);
  const [ok, setOk] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(String);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openAlert = (Message: string) => {
    setShowAlert((prev) => !prev);
    setAlertMessage(Message);
  };

  const registration: SubmitHandler<any> = async (data) => {
    //Chamada a API para checar se a matricula está ok
    setLoading(true);

    axios
      .post(`${urlAPI}/verify-student`, data, {
        withCredentials: false,
      })
      .then((response) => {
        const result = response;
        console.log(result);
        nameCheck = result.data.name;
        if (result.data.name != undefined) {
          setLoading(false);
          setOk(true);
          setName(result.data.name);
          reset(result);
        }
      })
      .catch((err) => {
        setLoading(false);
        openAlert('Erro nos dados informados!');
      });
  };

  const onRegister: SubmitHandler<any> = async (data) => {
    setLoading(true);
    data.codeStudent = Math.random().toString(36).substring(4);
    data.dateRegister = moment();
    data.dateRevalidate = moment().add(170, 'days');
    data.name = nameCheck;
    axios
      .post(`${urlAPI}/register`, data, {
        withCredentials: false,
      })
      .then((response) => {
        setTimeout(() => {
          router.push('/');
        }, 2000);
        if (response.status == 200) {
          alert('Carteirinha registrada com sucesso!');
          setLoading(false);
        } else if (response.status == 500) {
          setLoading(false);
          openAlert('Erro nos dados informados');
        } else if (response.status == 404 || response.status === 400) {
          setLoading(false);
          openAlert('Erro no servidor Sagres!');
        } else if (response.status == 503) {
          openAlert('Sagres UNEB indisponível.');
          setLoading(false);
        } else if (response.status == 501) {
          openAlert('Usuário já cadastrado.');
          setLoading(false);
        }
      })
      .catch((err) => {
        openAlert('Erro nos dados informados.');
        setLoading(false);
      });
    reset();
  };
  if (loading) {
    return (
      <C.Container>
        <LoadingScreen />
      </C.Container>
    );
  }

  if (ok) {
    return (
      <C.Container>
        <Head>
          <title>Cadastrar | Carteirinha Estudantil | UNEB</title>
        </Head>
        <C.TextCard>
          <p>
            SEJA BEM VINDO(A) {name.toUpperCase()} SUA CONTA ESTARÁ ATIVA APÓS O
            PREENCHIMENTO DAS INFORMAÇÕES;
          </p>
        </C.TextCard>
        <C.GridFormRegister onSubmit={handleSubmit(onRegister)}>
          <div>
            <p>&nbsp;&nbsp;&nbsp;CURSO:</p>
            <C.Input
              required
              {...register('course')}
              type='text'
              id='course'
              name='course'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;SEMESTRE:</p>
            <C.Input
              required
              {...register('semester')}
              type='text'
              id='semester'
              name='semester'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;CPF:</p>
            <C.Input
              required
              {...register('cpf')}
              type='text'
              id='cpf'
              name='cpf'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;RG:</p>
            <C.Input
              required
              {...register('rg')}
              type='text'
              id='rg'
              name='rg'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;DATA DE NASCIMENTO:</p>
            <C.Input
              required
              {...register('birthDate')}
              type='text'
              id='birthDate'
              name='birthDate'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;SEXO:</p>
            <C.Input
              {...register('sex')}
              type='text'
              id='sex'
              name='sex'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;C.LATTES:</p>
            <C.Input
              {...register('lattes')}
              type='text'
              id='lattes'
              name='lattes'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;LINKEDIN:</p>
            <C.Input
              {...register('linkedin')}
              type='text'
              id='linkedin'
              name='linkedin'
              resource='14px 90px'
            />
          </div>
          <div>
            <p>&nbsp;&nbsp;&nbsp;FOTO:</p>
            <C.Input
              {...register('photo')}
              type='text'
              id='photo'
              name='photo'
              resource='14px 90px'
              placeholder='Insira o link da foto'
            />
          </div>

          <div>
            <p>&nbsp;&nbsp;&nbsp;SENHA:</p>
            <C.Input
              required
              {...register('password')}
              type='password'
              id='password'
              name='password'
              resource='14px 90px'
            />
          </div>
          <C.Button
            color='secondary'
            type='button'
            onClick={() => {
              setOk(false);
              setName('');
            }}
          >
            CANCELAR
          </C.Button>
          <C.Button type='submit' color='primary'>
            CADASTRAR
          </C.Button>
        </C.GridFormRegister>
      </C.Container>
    );
  }
  return (
    <C.Container>
      <Alert
        showAlert={showAlert}
        text={alertMessage}
        type='error'
        setShowAlert={setShowAlert}
      />
      <Head>
        <title>Cadastrar | Carteirinha Estudantil | UNEB</title>
      </Head>
      <C.TextCard>
        <p>
          OLÁ ESTUDANTE, INFORME SUA MATRÍCULA E SENHA DO SAGRES PARA VALIDAR
          SEUS DADOS E PROSSEGUIRMOS COM O CADASTRO!
        </p>
      </C.TextCard>

      <C.FormRegister onSubmit={handleSubmit(registration)}>
        <h2 className='txt'>INSIRA OS DADOS DE ACESSO AO SAGRES</h2>
        <div>
          <p>&nbsp;&nbsp;&nbsp;MATRÍCULA:</p>
          <C.Input
            {...register('matriculation')}
            placeholder='Sua Matrícula'
            type='text'
            name='matriculation'
            required
          />
        </div>
        <div>
          <p>&nbsp;&nbsp;&nbsp;SENHA:</p>
          <C.Input
            {...register('password')}
            placeholder='Os 6 primeiros dígitos do CPF'
            type='password'
            name='password'
            required
          />
        </div>
        <C.Button color='primary' type='submit'>
          VALIDAR
        </C.Button>
      </C.FormRegister>
    </C.Container>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const urlAPI = process.env.URL;
  return {
    props: { urlAPI },
  };
};

export default Register;
