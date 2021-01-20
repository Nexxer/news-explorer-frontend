import React from 'react';
import './About.css';
import picture from '../../images/ava.png';

function About() {
  return (
    <section>
      <div className="about">
        <img className="about__img" src={picture} alt="аватарка" />
        <div className="about__block-text">
          <h3 className="about__title">Об авторе</h3>
          <p className="about__paragraph"> Меня зовут Игорь Якунин, а это дипломная работа по курсу веб-разработки  в "Яндекс.Практикум".</p>
          <p className="about__paragraph">С нуля были изучены HTML, CSS, JavaScript, Git, ReactJS, NodeJS, MongoDB и ExpressJS.</p>
        </div>
      </div>
    </section>
  );
}

export default About;