import React from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = ({ photo }) => {

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={photo.length}
            className="relative mx-auto"
        >
            <Slider>
                {photo.map((image, index) => (
                    <Slide key={index} index={index}>
                        <div className='flex justify-center w-full h-full items-center bg-gray-200 rounded-2xl overflow-hidden'>
                            <img
                                className='w-full h-full'
                                src={'http://localhost:4000/api/uploads/' + image}
                                alt={`photo-${index}`}
                            />
                        </div>
                    </Slide>
                ))}
            </Slider>
            <ButtonBack className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </ButtonBack>
            <ButtonNext className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </ButtonNext>
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {photo.map((_, index) => (
                    <Dot key={index} slide={index} className="w-3 h-3 bg-gray-500 rounded-full transition-all duration-300 ease-in-out carousel-dot" />
                ))}
            </div>
        </CarouselProvider>
    );
};

Carousel.propTypes = {
    photo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
