
import React from 'react'
import Card from './Card'
 

// import absBeginner from '../assets/beginner/abs.webp';
import chestBeginner from '../assets/beginner/chest.webp';
import armsBeginner from '../assets/beginner/arms.webp';

import sholdbackBeginner from '../assets/beginner/sholdback.webp';

// import absIntermediate from '../assets/intermediate/abs.jpg';
import chestIntermediate from '../assets/intermediate/chest.png';
import armsIntermediate from '../assets/intermediate/arms.jpg';

import sholdbackIntermediate from '../assets/intermediate/sholdback.webp';

// import absAdvanced from '../assets/advanced/abs.jpg';
import chestAdvanced from '../assets/advanced/chest.jpg';
import armsAdvanced from '../assets/advanced/arms.png';

import sholdbackAdvanced from '../assets/advanced/sholdback.webp';

const Beginner = [
  { id: 2, exerciseCount: 12, title: "CHEST BEGINNER", time: 23, Kcal: 150, image: chestBeginner },
  { id: 3, exerciseCount: 15, title: "ARM BEGINNER", time: 22, Kcal: 180, image: armsBeginner },

  { id: 5, exerciseCount: 13, title: "SHOULDER & BACK BEGINNER", time: 17, Kcal: 190, image: sholdbackBeginner },
];

const Intermediate = [

  { id: 7, exerciseCount: 12, title: "CHEST INTERMEDIATE", time: 35, Kcal: 223, image: chestIntermediate },
  { id: 8, exerciseCount: 15, title: "ARM INTERMEDIATE", time: 30, Kcal: 230, image: armsIntermediate },

  { id: 10, exerciseCount: 13, title: "SHOULDER & BACK INTERMEDIATE", time: 32, Kcal: 250, image: sholdbackIntermediate },
];

const Advanced = [

  { id: 12, exerciseCount: 12, title: "CHEST ADVANCED", time: 35, Kcal: 270, image: chestAdvanced },
  { id: 13, exerciseCount: 15, title: "ARM ADVANCED", time: 40, Kcal: 280, image: armsAdvanced },

  { id: 15, exerciseCount: 13, title: "SHOULDER & BACK ADVANCED", time: 40, Kcal: 300, image: sholdbackAdvanced },
];

  
export default function CategoryExercises({ heading }) {

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