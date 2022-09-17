import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Header from '../components/header';
import Carousel from '../components/carousel';

const IndexPage = () => {
  return (
    <main>
      <div className='section'>
        <Header />
      </div>
      <div className='section'>
        <Carousel />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
