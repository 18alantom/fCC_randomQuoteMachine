import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import './style.scss';

// 1debc0d322cb5c1eea7d1bec6cec01f3

function getQuote() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://favqs.com/api/quotes', true);
  request.setRequestHeader('Authorization', 'Token token="1debc0d322cb5c1eea7d1bec6cec01f3"');
  request.send();
  request.onload = () => {
    console.log(request.HEADERS_RECEIVED);
    const json = JSON.parse(request.responseText);
    console.log(json);
  };
}
class QuoteBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    getQuote();
  }

  render() {
    return <QuoteBox />;
  }
}

function QuoteBox() {
  return (
    <div id="quote-box">
      <div className="quote-text">
        <p id="text">
          Violence is the last refuge of the incompetent.
        </p>
        <p id="author">Salvor Hardin</p>
      </div>
      <div className="quote-control">
        <button id="new-quote">New Quote</button>
        <button id="tweet-quote">Tweet Quote</button>
      </div>
    </div>
  );
}

ReactDOM.render(<QuoteBoxContainer />, document.querySelector('#root'));
