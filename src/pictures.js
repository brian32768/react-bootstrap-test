// picture.js
//
import React from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: require('/assets/Proud.jpg'),
        header: 'Pigeon', text: ""
    },
    {
        src: require('/assets/walking_pigeons.gif'),
        header: 'Pigeons, walking', text: ""
    },
    {
        src: require('/assets/beaver.jpg'),
        header: 'Beaver', text: ""
    },
    {
        src: require('/assets/lewis_and_clark.jpg'),
        header: 'Lewis and Clark', text: ""
    },
];

class Pictures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex : 0,
            animating: false,
        }
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

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
          return (
            <CarouselItem
              key={item.src}
            >
              <img src={item.src} alt={item.header} />
              <CarouselCaption captionText={item.text} captionHeader={item.header} />
            </CarouselItem>
          );
        });

        return (
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
        );
    }
}

export default Pictures;
