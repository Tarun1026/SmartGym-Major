
import React from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

import absBeginner from '../assets/beginner/abs.webp';
import chestBeginner from '../assets/beginner/chest.webp';
import armsBeginner from '../assets/beginner/arms.webp';
import legsBeginner from '../assets/beginner/legs.jpeg';
import sholdbackBeginner from '../assets/beginner/sholdback.webp';

import absIntermediate from '../assets/intermediate/abs.jpg';
import chestIntermediate from '../assets/intermediate/chest.png';
import armsIntermediate from '../assets/intermediate/arms.jpg';
import legsIntermediate from '../assets/intermediate/legs.jpg';
import sholdbackIntermediate from '../assets/intermediate/sholdback.webp';

import absAdvanced from '../assets/advanced/abs.jpg';
import chestAdvanced from '../assets/advanced/chest.jpg';
import armsAdvanced from '../assets/advanced/arms.png';
import legsAdvanced from '../assets/advanced/legs.jpg';
import sholdbackAdvanced from '../assets/advanced/sholdback.webp';

const Beginner = [
  { id: 1, exerciseCount: 14, title: "ABS BEGINNER", time: 20, Kcal: 200, image: absBeginner },
  { id: 2, exerciseCount: 12, title: "CHEST BEGINNER", time: 23, Kcal: 150, image: chestBeginner },
  { id: 3, exerciseCount: 15, title: "ARM BEGINNER", time: 22, Kcal: 180, image: armsBeginner },
  { id: 4, exerciseCount: 12, title: "LEG BEGINNER", time: 26, Kcal: 250, image: legsBeginner },
  { id: 5, exerciseCount: 13, title: "SHOULDER & BACK BEGINNER", time: 17, Kcal: 190, image: sholdbackBeginner },
];

const Intermediate = [
  { id: 6, exerciseCount: 14, title: "ABS INTERMEDIATE", time: 30, Kcal: 218, image: absIntermediate },
  { id: 7, exerciseCount: 12, title: "CHEST INTERMEDIATE", time: 35, Kcal: 223, image: chestIntermediate },
  { id: 8, exerciseCount: 15, title: "ARM INTERMEDIATE", time: 30, Kcal: 230, image: armsIntermediate },
  { id: 9, exerciseCount: 12, title: "LEG INTERMEDIATE", time: 30, Kcal: 300, image: legsIntermediate },
  { id: 10, exerciseCount: 13, title: "SHOULDER & BACK INTERMEDIATE", time: 32, Kcal: 250, image: sholdbackIntermediate },
];

const Advanced = [
  { id: 11, exerciseCount: 14, title: "ABS ADVANCED", time: 40, Kcal: 320, image: absAdvanced },
  { id: 12, exerciseCount: 12, title: "CHEST ADVANCED", time: 35, Kcal: 270, image: chestAdvanced },
  { id: 13, exerciseCount: 15, title: "ARM ADVANCED", time: 40, Kcal: 280, image: armsAdvanced },
  { id: 14, exerciseCount: 12, title: "LEG ADVANCED", time: 40, Kcal: 350, image: legsAdvanced },
  { id: 15, exerciseCount: 13, title: "SHOULDER & BACK ADVANCED", time: 40, Kcal: 300, image: sholdbackAdvanced },
];

  
export default function CategoryExercises({ heading }) {
  const navigate = useNavigate();
  let exercises;

  // Choose exercises based on heading
  switch (heading) {
    case 'Beginner':
      exercises = Beginner;
      break;
    case 'Intermediate':
      exercises = Intermediate;
      break;
    case 'Advanced':
      exercises = Advanced;
      break;
    default:
      exercises = [];
  }
  return (
    <div style={{margin:"30px"}}>
      <h2 style={{ fontWeight: '900', fontSize: '30px', marginBottom: '10px' }}>{heading}</h2>
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          title={exercise.title}
          exerciseCount={exercise.exerciseCount}
          time={exercise.time}
          image={exercise.image}
        />
      ))}
    </div>
  )
}