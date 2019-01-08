import React, { Component, Fragment } from 'react'
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

export default class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex : 0,
            animating: false
        }
        this.select   = this.select.bind(this);
        this.next     = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.onClick  = this.onClick.bind(this);
    }

    next() {
       if (this.animating) return;
       const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
       this.setState({ activeIndex: nextIndex });
    }

    previous() {
       if (this.animating) return;
       const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
       this.setState({ activeIndex: nextIndex });
    }

    onClick() {
         console.log("clicked");
    }

    select(options) {
        console.log(`Option selected:`, options.value, this.state);
        this.setState({ activeIndex: options.value });
    }

    render() {
        let { activeIndex } = this.state;
        console.log("render() activeIndex =", activeIndex);
        const slides = items.map((item) => {
          return (
            <CarouselItem
              key={item.src}
            >
              <img src={item.src} alt={item.label} />
              <CarouselCaption captionText={item.text} captionHeader={item.label} />
            </CarouselItem>
          );
        });

        return (
            <Fragment>
            <h2>Pictures</h2>
            <Select
                allowClear
                placeholder="picture name"
                defaultValue="0"
                style={{ width: 200 }}
                animation="slide-up"
                showSearch={ false }
                onChange={ this.select }
                options={ items }
            >
            </Select>
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={this.onClick} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </Fragment>
        );
    }
}
