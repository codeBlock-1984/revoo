import Vote from '../Vote/Vote';
import './style.scss';

class CompositeVote {
  constructor(reviewId, upVotes, downVotes) {
    this.reviewId = reviewId;
    this.upVotes = upVotes;
    this.downVotes = downVotes;
    this.up = null;
    this.down = null;
  }

  create() {
    let compositeVote = document.createElement('div');
    compositeVote.addEventListener('click', this.handleClick.bind(this));
    compositeVote.classList.add('ur-composite-vote');
    let upVoteObj = new Vote(this.reviewId, this.upVotes, 'up');
    let downVoteObj = new Vote(this.reviewId, this.downVotes, 'down');
    this.up = upVoteObj;
    this.down = downVoteObj;
    let upVote = upVoteObj.create();
    let downVote = downVoteObj.create();
    compositeVote.appendChild(upVote);
    compositeVote.appendChild(downVote);
    return compositeVote;
  }

  handleClick(event) {
    const id = event.target.id;
    if (id) {
      const alias = id.slice(0, 1);
      const postfix = id.slice(1);
      const siblingAlias = this.getSiblingAlias(alias);
      const sibling = document.getElementById(`${siblingAlias}${postfix}`);
      const type = this.getType(alias);
      const siblingType = this.getSiblingType(alias);
      const vote = this[type];
      const siblingVote = this[siblingType];
      siblingVote.resetValue(sibling);
      vote.handleClick(event);
    }
  }

  getType(alias) {
    const types = {
      'u': 'up',
      'd': 'down'
    };
    return types[alias];
  }

  getSiblingType(alias) {
    const types = {
      'u': 'down',
      'd': 'up'
    };
    return types[alias];
  }

  getSiblingAlias(alias) {
    const aliases = {
      'u': 'd',
      'd': 'u'
    };
    return aliases[alias];
  }
}

export default CompositeVote;
