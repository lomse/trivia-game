import * as React from 'react'
import { Layout } from '../elements/Layout'
import { Button } from '../elements/Button'
import { useHistory } from 'react-router-dom'
import { SelectElement } from '../elements/SelectElement'

export const Home = () => {
  const history = useHistory()
  const [difficulty, setDifficulty] = React.useState('hard')

  return (
    <Layout>
      <div className="h-full flex justify-between flex-col text-center">
        <h3 className="text-2xl font-bold text-gray-700">
          Welcome to the <br /> Trivia Challenge!
        </h3>

        <div className="">
          <label className="font-semibold text-lg mb-2">Choose difficulty</label>
          <SelectElement
            value={difficulty}
            handleOnChange={setDifficulty}
            options={[
              { label: 'Easy', value: 'easy' },
              { label: 'Medium', value: 'medium' },
              { label: 'Hard', value: 'hard' },
            ]}
          />
        </div>

        <p className="text-lg">
          You will be presented
          <br /> with 10 True or False
          <br /> questions.
        </p>

        <p className="text-lg">Can you score 100%?</p>

        <Button
          type="info"
          handleOnClick={() => history.push(`/quizz?difficulty=${difficulty}`)}
          className="uppercase rounded font-semibold">
          Begin
        </Button>
      </div>
    </Layout>
  )
}
