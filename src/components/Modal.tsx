/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MdClose } from 'react-icons/md';
import { Background, CardModal } from '../styles/components.Styles';
import Image from 'next/image';

export default function Modal(props: any) {
  console.log(props);
  const { data, universityImage, universityName, showModal, setShowModal } =
    props;
  return (
    <>
      {showModal ? (
        <Background>
          <CardModal>
            <MdClose
              className='close'
              onClick={() => setShowModal((prev: any) => !prev)}
            />
            <div className='image'>
              <img
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '1rem',
                  border: '0.2rem solid #009774',
                }}
                src={data?.students?.photo}
              />
            </div>
            <div className='data'>
              <p>{data.students?.name?.toUpperCase()}</p>
              <p>{data.course?.value}</p>
              <p>{data.students?.status ? 'Inativo' : 'Ativo'}</p>
              <p>{data.semester?.value}</p>
              <p>{data.students?.codeStudent}</p>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <a
                  href={data.students?.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    alt={'Studend ID - Image'}
                    src={'/linkedin.png'}
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  href={data.students?.lattes}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    alt={'Studend ID - Image'}
                    src={'/lattes.png'}
                    width={30}
                    height={30}
                  />
                </a>
              </div>
            </div>
            <div className='university'>
              <img style={{ width: '5rem' }} src={universityImage} />
              <p
                style={{
                  alignItems: 'center',
                  fontSize: '10px',
                  display: 'flex',
                  margin: '0 auto',
                }}
              >
                {universityName}
              </p>
            </div>
          </CardModal>
        </Background>
      ) : null}
    </>
  );
}
