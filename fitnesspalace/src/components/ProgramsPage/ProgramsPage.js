import React, { useEffect } from 'react';
import ProgramsHeader from '../ProgramsHeader/ProgramsHeader'
import Coaches from '../Coaches/Coaches'
import Classes from '../Classes/Classes'
import ClassTimetable from '../ClassTimetable/ClassTimetable';
import NutritionPlans from '../NutritionPlans/NutritionPlans';
import Footer from '../Footer/Footer';

const ProgramsPage = () => {
  useEffect(() => {
    if (window.location.pathname === '/services/classes') {
      const classesSection = document.getElementById('our-classes');
      if (classesSection) {
        classesSection.scrollIntoView();
      }
    }
  }, []);
  return (
    <div className='programsPage'>
        <ProgramsHeader/>
        <Coaches/>
        <Classes/>
        <ClassTimetable/>
        <NutritionPlans/>
        <Footer/>
    </div>
  )
}

export default ProgramsPage