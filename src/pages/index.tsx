import { error } from 'console';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import Modal from '../components/Modal';
import { fetcher } from '../lib/fetcher';

import SelectFilter from '../utils/SelectFilter';

import * as C from '../styles/pages.Styles';

type Course = {
  id: string;
  value: string;
};
type Semester = {
  id: string;
  value: string;
};

type HomeProps = {
  courses: Course[];
  semesters: Semester[];
};

const Home: NextPage<HomeProps> = ({ courses, semesters }) => {
  const { data, error } = useSWR(`${URL}/students-all`, fetcher);

  const universityImage =
    'http://www.ppghi.uneb.br/wp-content/uploads/2019/03/logo_uneb.svg';
  const universityName = 'Universidade do Estado da Bahia';

  const [selectedFilterCourse, setSelectedFilterCourse] = useState();
  const [selectedFilterSemester, setSelectedFilterSemester] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalStudent, setModalStudent] = useState();

  function parseSelected(event: any) {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    if (itemSelected.nameCourse)
      setSelectedFilterCourse(itemSelected.nameCourse);
    if (itemSelected.numberSemester)
      setSelectedFilterSemester(itemSelected.numberSemester);
    return;
  }
  function openModal(student: any) {
    setShowModal((prev) => !prev);
    setModalStudent(student);
  }

  return (
    <C.Container>
      <Head>
        <title>Carteirinha Estudantil | UNEB</title>
      </Head>
      <Modal
        student={modalStudent}
        universityImage={universityImage}
        universityName={universityName}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <C.Filter>
        <SelectFilter
          label='Filtragem por curso'
          name='course'
          options={courses}
          parseSelected={parseSelected}
        />

        <SelectFilter
          label='Filtragem por semestre'
          name='semester'
          options={semesters}
          parseSelected={parseSelected}
        />
      </C.Filter>

      <C.ListID>
        {!data && !error && <h1>Carregando carteirinhas...</h1>}
        {!data && error && <h2>Erro ao consultar, tente mais tarde!</h2>}
        {data?.map(
          (
            result: any //TODO inserir tipagem
          ) => (
            <div
              key={result?.students.id}
              onClick={() => openModal(result.students)}
              className='id'
            >
              <div className='image'>
                <img
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    border: '0.2rem solid #009774',
                  }}
                  alt={result?.students.name}
                  src={result?.students.photo}
                />
              </div>
              <div className='data'>
                <p>{result?.students.name?.toUpperCase()}</p>
                <p>{result?.students.course}</p>
                <p>{result?.students.status ? 'Inativo' : 'Ativo'}</p>
                <p>{result?.students.semester} semestre</p>
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
            </div>
          )
        )}
      </C.ListID>
    </C.Container>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const coursesResponse = await fetch(`${URL}/course-all`);
  const coursesData = await coursesResponse.json();

  const courses: Course[] = coursesData.map((data: Course) => ({
    id: data.id,
    course: data.value,
  }));

  const semestersResponse = await fetch(`${URL}/semester-all`);
  const semestersData = await semestersResponse.json();

  const semesters: Semester[] = semestersData.map((data: Semester) => ({
    id: data.id,
    semester: data.value,
  }));

  return {
    props: {
      courses,
      semesters,
    },
  };
};

export default Home;
