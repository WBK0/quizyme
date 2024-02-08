"use client";
import Panel from './panel/Panel';
import CardChangeAnimation from './CardChangeAnimation';
import Card from './Card';

const Playground = () => {  
  return (
    <>
      <CardChangeAnimation />
      <Card />
      <Panel />
    </>
  )
}

export default Playground;