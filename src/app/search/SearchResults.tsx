import Button from '@/components/Button';
import Card from '@/components/Card';
import CardExtended from '@/components/CardExtended';
import React from 'react'

const SearchResults = () => {
  return (
    <div className='mt-12'>
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
    </div>
  )
}

export default SearchResults;