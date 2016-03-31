import React, { PropTypes } from 'react';

import NavBar from './../../components/navbar/navbar.jsx';
import CardGrid from './../../components/CardGrid/CardGrid.jsx';
import ButtonModal from './../../components/ButtonModal/ButtonModal.jsx';
import PinForm from './../../components/pinForm/pinForm.jsx';

require('./explore.scss');

export class Explore extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  get pinFormForModal() {
    return <PinForm />;
  }

  render() {
    return (
      <div className="card-grid-container">
        <NavBar location={this.props.location} />
        <CardGrid arrOfCards={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <ButtonModal className="pin-button"
          buttonName="PIN"
          modalTitle="Create a Pin"
          saveButtonName="Save Pin"
          modalBody={ this.pinFormForModal }
        />
      </div>
    );
  }
}

export default Explore;