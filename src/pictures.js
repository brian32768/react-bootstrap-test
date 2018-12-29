// picture.js react-bootstrap-test
//
import React, { Component } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'
import Select, { components } from 'react-select'
//import 'react-select/dist/default.css'

const items = [
    {
        src: require('/assets/Proud.jpg'),
        header: 'Pigeon',
        text: ""
    },
    {
        src: require('/assets/walking_pigeons.gif'),
        header: 'Pigeons, walking',
        text: ""
    },
    {
        src: require('/assets/beaver.jpg'),
        header: 'Beaver',
        text: ""
    },
    {
        src: require('/assets/lewis_and_clark.jpg'),
        header: 'Lewis and Clark',
        text: ""
    },
];

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

/*
const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {children}
    </components.SingleValue>
);

type State = {};

class CustomControl extends Component<*, State> {
  state = {};
  render() {
    return (
      <Select
        defaultValue={items[0]}
        isClearable
        components={{ SingleValue }}
        isSearchable
        name="header"
        options={items}
      />
    );
  }
}
*/

export default class Pictures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex : 0,
            animating: false,
            selectedOption: null,
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

    handleChange(selectedOption) {
       this.setState({ selectedOption });
       console.log(`Option selected:`, selectedOption);
    }

    render() {
        const { selectedOption } = this.state;
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
            <div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
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
            </div>
        );
    }
}
