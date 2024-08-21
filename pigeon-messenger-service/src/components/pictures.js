import React, {useState} from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'react-bootstrap'; // eslint-disable-line no-unused-vars

// see https://react-select.com/
import Select from 'react-select'; // eslint-disable-line no-unused-vars

const items = [
    {
        src: require('/assets/Proud.jpg'),
        text: "Rock Dove",
        value: 0, label: "Pigeon"
    },
    {
        src: require('/assets/beaver.jpg'),
        text: "Oregon State University",
        value: 1, label: "Beaver"
    },
    {
        src: require('/assets/lewis_and_clark.jpg'),
        text: "In 1804 it was hard to get decent maps of Clatsop County.",
        value: 2, label: "Lewis and Clark, lost again."
    },
];

const Pictures = ({ theme }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimation] = useState(false);

    const onExiting = () => { setAnimation(true) }
    const onExited =  () => { setAnimation(false) }

    const goToIndex = (newIndex) => {
        if (animating) return;
        console.log("indicator clicked", newIndex);
        setActiveIndex(newIndex)
    }

    const onNext = () => {
       if (animating) return;
       const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
       setActiveIndex(nextIndex);
    }

    const onPrev = () => {
       if (animating) return;
       const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
       setActiveIndex({activeIndex: nextIndex});
    }

    const select = (options) => {
        console.log("index is ", activeIndex);
        setActiveIndex(options.value);
    }

    const slides = items.map( (item) => (
        <CarouselItem
            onExiting={onExiting}
            onExited={onExited}
            key={item.src}
        >
            <img src={item.src} alt={item.label} />
            <CarouselCaption captionText={item.text} captionHeader={item.label} />
        </CarouselItem>
    ));

    return (
        <>
            <h2>Pictures</h2>
            FIXME theme does not work here, darn.<br />
            FIXME The carousel arrow indicators dont appear either
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
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
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
