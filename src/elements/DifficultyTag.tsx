import * as React from 'react'
import { QuizzDifficulty } from '../types/index'

type DifficultyTagProps = {
  difficulty: QuizzDifficulty
  className?: string
}

export const DifficultyTag: React.FC<DifficultyTagProps> = ({ difficulty, className, ...props }) => {
  let difficultyColor = '#FFFFFF'
  switch (difficulty) {
    case 'easy':
      difficultyColor = 'bg-green-500'
      break

    case 'medium':
      difficultyColor = 'bg-blue-500'
      break

    default:
      difficultyColor = 'bg-red-500'
      break
  }

  return <span className={`${difficultyColor} ${className}`}>{props.children}</span>
}
