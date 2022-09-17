import { graphql, StaticQuery } from 'gatsby';
import { StaticImage, GatsbyImage, getImage, IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import Button from './button';
import ArrowDown from './icons/ArrowDown';

const spinAngle = 36;
const slidesLength = 10;
const dishesLength = 3;

const dishes = [
  {
    id: 1,
    name: 'Green Goddess Chicken Salad',
    image: '../images/dishes/dish-1.png',
    price: 32,
    description: 'It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.',
  },
  {
    id: 2,
    name: 'Asian Cucumber Salad',
    image: '../images/dishes/dish-2.png',
    price: 35,
    description: 'Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!',
  },
  {
    id: 3,
    name: 'Green Goddess Chicken Salad',
    image: '../images/dishes/dish-3.png',
    price: 35,
    description: 'It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.',
  },
];

const slidesPositions = [
  {
    top: '0%',
    left: '50%',
  },
  {
    top: '10%',
    left: '20%',
  },
  {
    top: '35%',
    left: '2%',
  },
  {
    top: '65%',
    left: '2%',
  },
  {
    top: '90%',
    left: '20%',
  },
  {
    top: '100%',
    left: '50%',
  },
  {
    top: '90%',
    left: '80%',
  },
  {
    top: '65%',
    left: '98%',
  },
  {
    top: '35%',
    left: '98%',
  },
  {
    top: '10%',
    left: '80%',
  },
];

const Carousel = () => {
  const [slidesIndexes, setSlidesIndexes] = React.useState<number[]>([]);
  const [foodSpinAngle, setFoodSpinAngle] = React.useState(0);

  const getSlidesIndexes = () => {
    let index = 0;
    let slidesIndexes = [];
    for (let i = 0; i < slidesLength; i++) {
      if (index + 1 > dishes.length) {
        index = 0;
      }
      slidesIndexes.push(index);
      index++;
    }
    return slidesIndexes;
  };

  const [foodSpinActiveDish, setFoodSpinActiveDish] = React.useState(() => {
    const slidesIndexes = getSlidesIndexes();
    setSlidesIndexes(slidesIndexes);
    return 0;
  });

  const rotateLeft = () => {
    if (foodSpinActiveDish === 0) {
      setFoodSpinActiveDish(9);
    } else {
      setFoodSpinActiveDish(foodSpinActiveDish - 1);
    }
    setFoodSpinAngle(foodSpinAngle - spinAngle);
  };

  const rotateRight = () => {
    if (foodSpinActiveDish === 9) {
      setFoodSpinActiveDish(0);
    } else {
      setFoodSpinActiveDish(foodSpinActiveDish + 1);
    }
    setFoodSpinAngle(foodSpinAngle + spinAngle);
  };

  const getDishImage = (dishId: number, data: any): any => {
    const imageEdge: any = data.allImageSharp.edges.find((edge: any) => edge.node.gatsbyImageData.images.fallback.src.includes(`dish-${dishId}`));
    return getImage(imageEdge.node.gatsbyImageData);
  };

  return (
    <StaticQuery
      query={graphql`
        query dishImages {
          allImageSharp(filter: { original: { src: { regex: "/.*dish.*/" } } }) {
            edges {
              node {
                gatsbyImageData(width: 600)
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className='mt-12 xl:mt-0 relative w-full flex flex-col xl:flex-row items-center' style={{ height: 'calc(100vh - 75px)' }}>
          <div className='w-full xl:w-[30vw]'>
            <div
              className='flex flex-col gap-[15px] justify-center items-center xl:items-start'
            >
              <span key={Math.random()} className='dish-info text-3xl text-primary font-bold'>&#36;{dishes[slidesIndexes[foodSpinActiveDish]].price}</span>
              <h1 key={Math.random()} className='dish-info text-3xl text-body font-bold'>{dishes[slidesIndexes[foodSpinActiveDish]].name}</h1>
              <p key={Math.random()} className='dish-info text-body text-sm'>{dishes[slidesIndexes[foodSpinActiveDish]].description}</p>
              <Button key={Math.random()} className='dish-button' title='Order Now' />
            </div>
          </div>
          <div className='w-full xl:w-[70vw]'>
            <div
              style={{ maxHeight: 'calc(85vh + 50vh)' }}
              className='absolute w-[130vw] h-[120vh] -top-[50vh] left-1/2 -translate-x-1/2 xl:translate-x-0 xl:w-[80vw] xl:h-[80vw] xl:-top-[80vh] xl:left-[283px] bg-[#FFEEDE] rounded-[50%] z-[-1] overflow-hidden'
            >
              <div
                style={{ transform: `translate(-50%, -50%) rotate(${foodSpinAngle}deg)` }}
                className='absolute transition-transform ease-in-out duration-400 mt-12 xl:mt-0 top-[125vh] md:top-[145vh] w-[500px] h-[500px] md:w-[950px] md:h-[950px] xl:w-[44vw] xl:h-[44vw] xl:top-full left-1/2 rounded-[50%] border-[#E87F1E] border-2 border-dashed'
              >
                {slidesIndexes.map((number, index) => {
                  const imageEdge: any = data.allImageSharp.edges.find((edge: any) =>
                    edge.node.gatsbyImageData.images.fallback.src.includes(`dish-${number + 1}`)
                  );
                  const image: any = getImage(imageEdge.node.gatsbyImageData);
                  return (
                    <GatsbyImage
                      image={image}
                      key={index}
                      alt={dishes[number].name}
                      style={{ top: `${slidesPositions[index].top}`, left: `${slidesPositions[index].left}` }}
                      className={`-translate-x-[50%] -translate-y-[50%] w-[100px] absolute`}
                    />
                  );
                })}
              </div>
            </div>
            <div
              style={{ maxHeight: 'calc(85vh + 50vh)' }}
              className='absolute w-full h-[20vh] bottom-[50px] xl:bottom-0 left-1/2 -translate-x-1/2 xl:translate-x-0 xl:w-[80vw] xl:h-[80vw] xl:-top-[85vh] xl:left-[283px]'
            >
              <Button onClick={rotateLeft} className='px-3 absolute left-[20px] md:left-[20%] xl:-bottom-[10%]' icon={ArrowDown} />
              <div id='crossFade'>
                {dishes.map((dish: any, index) => (
                  <React.Fragment>
                    <GatsbyImage
                      key={index}
                      image={getDishImage(dish.id, data)}
                      alt='current dish'
                      style={{
                        opacity: dish.id !== dishes[slidesIndexes[foodSpinActiveDish]].id ? '0' : '1',
                        transform: `translateX(-50%) ${
                          dish.id !== dishes[slidesIndexes[foodSpinActiveDish]].id ? 'rotate(0deg) scale(0.6)' : 'rotate(45deg) scale(1)'
                        }`,
                      }}
                      className={`bottom-image left-1/2 bottom-[45px] md:bottom-[20%] w-[175px] md:w-[250px] xl:bottom-[50px] xl:w-[300px] absolute`}
                    />
                  </React.Fragment>
                ))}
              </div>
              <Button onClick={rotateRight} className='px-3 absolute right-[20px] md:right-[20%] xl:-bottom-[10%]' icon={ArrowDown} />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Carousel;

{
  /* <StaticImage
              src='../images/dishes/dish-1.png'
              alt='Carousel dish small thumbnail'
              className='top-[90%] left-[20%] -translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-2.png'
              alt='Carousel dish small thumbnail'
              className='top-[65%] left-[2%] -translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-3.png'
              alt='Carousel dish small thumbnail'
              className='top-[35%] left-[2%] -translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-1.png'
              alt='Carousel dish small thumbnail'
              className='top-[10%] left-[20%] -translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-2.png'
              alt='Carousel dish small thumbnail'
              className='w-[100px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50px]'
            />
            <StaticImage
              src='../images/dishes/dish-3.png'
              alt='Carousel dish small thumbnail'
              className='top-[10%] right-[20%] translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-1.png'
              alt='Carousel dish small thumbnail'
              className='top-[35%] right-[2%] translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-2.png'
              alt='Carousel dish small thumbnail'
              className='top-[65%] right-[2%] translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            />
            <StaticImage
              src='../images/dishes/dish-3.png'
              alt='Carousel dish small thumbnail'
              className='top-[90%] right-[20%] translate-x-[50%] -translate-y-[50%] w-[100px] absolute'
            /> */
}
