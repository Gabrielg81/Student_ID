/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Profile from "../components/listStudentIDs";

import * as C from "../styles/pages.Styles";

type Data = {
  result: string;
};

const courses = [
  { nameCourse: "Todos", key: 0 },
  { nameCourse: "Sistemas de Informação", key: 2 },
  { nameCourse: "Engenharia Sanitária Ambiental", key: 3 },
  { nameCourse: "Matemática", key: 4 },
];

const semester = [
  { numberSemester: "Todos", key: 0 },
  { numberSemester: "1", key: 1 },
  { numberSemester: "2", key: 2 },
  { numberSemester: "3", key: 3 },
  { numberSemester: "4", key: 4 },
  { numberSemester: "5", key: 5 },
  { numberSemester: "6", key: 6 },
  { numberSemester: "7", key: 7 },
  { numberSemester: "8", key: 8 },
  { numberSemester: "9", key: 9 },
  { numberSemester: "10", key: 10 },
  { numberSemester: "11", key: 11 },
  { numberSemester: "12", key: 12 },
];

// const Home: NextPage = () => {
const Home: NextPage = (urlAPI: any) => {
  console.log("url", urlAPI.urlAPI);
  const [selectedFilterCourse, setSelectedFilterCourse] = useState("");
  const [selectedFilterSemester, setSelectedFilterSemester] = useState("");

  function parseSelected(event: any) {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    if (itemSelected.nameCourse)
      setSelectedFilterCourse(itemSelected.nameCourse);
    if (itemSelected.numberSemester)
      setSelectedFilterSemester(itemSelected.numberSemester);
    return;
  }

  return (
    <C.Container>
      <Head>
        <title>Carteirinha Estudantil | UNEB</title>
      </Head>

      <C.Filter>
        <p style={{ color: "#fff" }}>Filtragem por curso</p>
        <select name="any" id="any" onChange={parseSelected}>
          {courses.map((course) => (
            <option key={course.key} value={JSON.stringify(course)}>
              {course.nameCourse}
            </option>
          ))}
        </select>

        <p style={{ color: "#fff" }}>Filtragem por semestre</p>
        <select name="any" id="any" onChange={parseSelected}>
          {semester.map((semester) => (
            <option key={semester.key} value={JSON.stringify(semester)}>
              {semester.numberSemester}
            </option>
          ))}
        </select>
      </C.Filter>
      <C.ListID>{Profile(urlAPI)}</C.ListID>
    </C.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const urlAPI = `${process.env.URL}/list`;
  return {
    props: { urlAPI },
  };
};
export default Home;
