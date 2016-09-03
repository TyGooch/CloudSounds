import React from 'react';
import CommentItem from './comment_item';
class TrackCommentsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.generateCommentsArray = this.generateCommentsArray.bind(this);
    //debugger;
    if (this.props){
      this.id = this.props[Object.keys(this.props)[0]].track_id;
      this.hasComments = true;
      }
  }

  componentDidMount() {
    let el = $(`#track-${this.id}-comments`);
    let change = false;
    el.className().match(/hidden/) ? change = true : change = false;
    let showButton = $(`#track-${this.id}-show-comments`);
    const text = showButton.text();
    debugger;
    showButton.text(text.replace('show', 'hide').replace('▼', '►'));
  }

  generateCommentsArray(){
    const result = [];
    for (const key in this.props){
      let n = parseInt(key);

      let comment = this.props[n];
      result.push(CommentItem({comment}));
    }
    return result;
  }

  render() {
    const commentsList = $(`#track-${this.id}-comments`);
    let showText, carat;
    if (commentsList.hasClass('hidden')){
      showText = 'show';
      carat = '▼';
    } else {
      showText = 'hide';
      carat = '►';
    }
    let that = this;
    if (this.hasComments)
    return (
      <div>
        <p className='show-comments'
          id = {`track-${this.id}-show-comments`}
          onClick={ () => {
            let el = $(`#track-${this.id}-comments`);
            el.toggleClass('hidden');
            let showButton = $(`#track-${this.id}-show-comments`);
            const text = showButton.text();
            if(text.match(/show/))
              showButton.text(text.replace('show', 'hide').replace('▼', '►'));
            else
              showButton.text(text.replace('hide', 'show').replace( '►', '▼'));
            }
          }
          >
          {Object.keys(this.props).length > 1 ? `Click to ${showText} ${Object.keys(this.props).length} comments ${carat}` : `Click to ${showText} 1 comment ${carat}`}
        </p>
        <ul className="commentlist hidden" id={`track-${this.id}-comments`}>
          {this.generateCommentsArray()}
        </ul>
      </div>
    );
    else {
      return (<p className='show-comments'>No comments to show.</p>);
    }
  }

}

export default TrackCommentsIndex;
