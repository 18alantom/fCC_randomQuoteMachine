import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.scss';

// 1debc0d322cb5c1eea7d1bec6cec01f3
const root = document.querySelector('#root');
function style() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.25)`;
}
function changeBackground() {
  root.style.background = style();
}
class QuoteBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotesArray: [
        {
          author: 'Salvor Hardin',
          quote: 'Violence is the last refuge of the incompetent.',
          id: 0,
        },
      ],
      shownQuoteId: [0],
      author: 'Salvor Hardin',
      quote: 'Violence is the last refuge of the incompetent.',
    };
    this.loadQuote = this.loadQuote.bind(this);
    this.newQuoteHandler = this.newQuoteHandler.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  componentWillMount() {
    this.getQuote();
  }
  getQuote() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://favqs.com/api/quotes', true);
    request.setRequestHeader('Authorization', 'Token token="1debc0d322cb5c1eea7d1bec6cec01f3"');
    request.send();
    request.onload = () => {
      const json = JSON.parse(request.responseText);
      // console.log(json);
      let quotesArray = json.quotes;
      quotesArray = quotesArray.map(e => ({ author: e.author, quote: e.body, id: e.id }));
      // console.log(quotesArray);
      this.state.quotesArray.push(...quotesArray);
    };
  }

  newQuoteHandler() {
    let quoteObj = this.loadQuote();
    if (quoteObj == null) {
      this.getQuote();
      quoteObj = {
        author: 'Al',
        quote: 'Please click again. And if this message repeats something went wrong.',
      };
    }
    const { author, quote } = quoteObj;
    this.setState({
      author,
      quote,
    });
    changeBackground();
  }

  loadQuote() {
    const { quotesArray, shownQuoteId } = this.state;
    const randomNumber = Math.floor(Math.random() * quotesArray.length);
    const returnArray = quotesArray[randomNumber];
    // console.log(`sQA${shownQuoteId.length}, qA${quotesArray.length}`);
    const isShown = shownQuoteId.includes(returnArray.id);
    if (isShown) {
      if (shownQuoteId.length !== quotesArray.length) {
        // this.getQuote();
        this.loadQuote();
      } else {
        return null;
      }
    } else if (!isShown) {
      this.state.shownQuoteId.push(returnArray.id);
    }
    return returnArray;
  }

  render() {
    const { author, quote } = this.state;
    return <QuoteBox author={author} quote={quote} newQuoteHandler={this.newQuoteHandler} />;
  }
}

function QuoteBox(props) {
  const tweetLink = `https://twitter.com/intent/tweet?text=${`${props.quote} - ${props.author}`}`;
  return (
    <div id="quote-box">
      <div className="quote-text">
        <p id="text">
          <span className="quotes">“</span>
          {props.quote}
          <span className="quotes">”</span>
        </p>
        <p id="author">- {props.author}</p>
      </div>
      <div className="quote-control">
        <button id="new-quote" onClick={props.newQuoteHandler}>
          New Quote
        </button>
        <a id="tweet-quote" href={tweetLink} target="_blank" rel="noreferrer noopener">
          <button>
            <i className="fab fa-twitter" aria-hidden="true" />
          </button>
        </a>
      </div>
    </div>
  );
}

QuoteBox.propTypes = {
  newQuoteHandler: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

ReactDOM.render(<QuoteBoxContainer />, document.querySelector('#root'));
