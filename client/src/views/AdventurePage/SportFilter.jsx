import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { updateFilters } from '../../actions/filterBySportActions';
import Badge from "components/Badge/Badge.jsx";
import FilterCheckbox from './FilterCheckbox';
import GridItem from "components/Grid/GridItem.jsx";

const availableSports = [
  'Alpinisme',
  'Canyoning',
  'Cyclisme',
  'Equitation',
  'Escalade',
  'Canoë-kayak',
  'Kitesurf',
  'Paddle',
  'Parachute',
  'Parapente',
  'Planche à voile',
  'Plongée',
  'Randonnée',
  'Ski',
  'Ski de fond',
  'Ski de randonnée',
  'Snowboard',
  'Surf',
  'Trail',
  'Trek',
  'Voile',
  'Voyage à cheval',
  'Voyage à pied',
  'Voyage à vélo',
  'VTT',
  'Wakeboard'
];

class SportFilter extends Component {

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
  } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  }

  createCheckbox = (label) => (
    <GridItem style={{display: 'inline-block'}} xs={6} sm={12} md={6}>
      <FilterCheckbox
          label={label}
          handleCheckboxChange={this.toggleCheckbox}
          key={label}
      />
    </GridItem>

    // <Checkbox
    //     classes="filters-available-size text-center"
    //     label={label}
    //     handleCheckboxChange={this.toggleCheckbox}
    //     key={label}
    // />

  )

  createCheckboxes = () => (
    availableSports.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="filters">
        {this.createCheckboxes()}
      </div>
    );
  }
}

SportFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, { updateFilters })(SportFilter);