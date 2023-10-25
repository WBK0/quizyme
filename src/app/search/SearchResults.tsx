import CardExtended from '@/components/CardExtended';
import React from 'react'

const SearchResults = () => {
  return (
    <div className='mt-24'>
      <CardExtended
        image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
        to="/"
        color="purple"
        type="quiz"
        topic="Cosmos"
        authorId="1"
      />
      <CardExtended
        image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
        to="/"
        color="yellow"
        type="quiz"
        topic="Cosmos"
        authorId="1"
      />
      <CardExtended
        image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
        to="/"
        color="green"
        type="quiz"
        topic="Cosmos"
        authorId="1"
      />
      <CardExtended
        image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
        to="/"
        color="lightblue"
        type="quiz"
        topic="Cosmos"
        authorId="1"
      />
      <h3 className='font-black text-xl text-center mt-24'>
        Sorry, we couldn't find any more quizzes matching your search results 
      </h3>
    </div>
  )
}

export default SearchResults;