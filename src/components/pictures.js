import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'

// see https://react-select.com/
import Select, { components } from 'react-select'

const items = [
    {
        src: require('/assets/Proud.jpg'),
        text: "Rock Dove",
        value: 0, label: "Pigeon"
    },
    {
        src: require('/assets/walking_pigeons.gif'),
        text: "Out for a stroll",
        value: 1, label: "Walking pigeons"
    },
    {
        src: require('/assets/beaver.jpg'),
        text: "Oregon State University",
        value: 2, label: "Beaver"
    },
    {
        src: require('/assets/lewis_and_clark.jpg'),
        text: "In 1804 it was hard to get decent maps of Clatsop County.",
        value: 3, label: "Lewis and Clark, lost again."
    },
];

const Pictures = ({ theme }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, toggleAnimating] = useState(false);

    const slides = items.map( (item) => (
            <CarouselItem key={item.src}>
              <img src={item.src} alt={item.label} />
              <CarouselCaption captionText={item.text} captionHeader={item.label} />
            </CarouselItem>
        )
    )

    const onNext = () => {
       if (animating) return;
       const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
       setActiveIndex( nextIndex );
    }

    const onPrev = () => {
       if (animating) return;
       const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
       setActiveIndex({ activeIndex: nextIndex });
    }

    const select = (options) => {
        setActiveIndex(options.value);
    }

    return (
        <>
            <h2>Pictures</h2>
            <Select
                allowClear
                placeholder="picture name"
                defaultValue="0"
                style={{ width: 200 }}
                animation="slide-up"
                showSearch={ false }
                onChange={ select }
                options={ items }
            >
            </Select>
                <Carousel
                    activeIndex={activeIndex}
                    next={onNext}
                    previous={onPrev}
                >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                    />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={onPrev} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={onNext} />
                </Carousel>
        </>
    );
}
Pictures.propTypes = {
    theme: PropTypes.object
}

const mapStateToProps = (state) => ({
    theme: state.theme
});
export default connect(mapStateToProps)(Pictures);
